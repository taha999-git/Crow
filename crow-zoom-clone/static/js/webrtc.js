// webrtc.js - Signaling client and RTCPeerConnection management
// Assumptions about server messages:
// - On WebSocket open the client sends: { type: 'join', room: ROOM_ID, name: NAME }
// - Server responds with: { type: 'id', id: CLIENT_ID }
// - Server may send: { type: 'peers', peers: [peerId, ...] }
// - Offer/Answer exchange: { type: 'offer'|'answer', from: ID, to: ID, sdp: SDP }
// - ICE candidate: { type: 'candidate', from: ID, to: ID, candidate: ICE }

(function() {
  // Read room id from URL - expects Django to render the room page at /rooms/<id>/
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const ROOM_ID = pathParts[pathParts.length - 1];
  const NAME = document.querySelector('meta[name="username"]')?.getAttribute('content') || 'guest';

  const localVideo = document.getElementById('localVideo');
  const remoteVideo = document.getElementById('remoteVideo');
  const startBtn = document.getElementById('startCallBtn');
  const hangupBtn = document.getElementById('hangupBtn');

  // STUN/TURN servers - include public Google STUN and leave TURN for deployment
  const ICE_CONFIG = { iceServers: [ { urls: 'stun:stun.l.google.com:19302' } ] };

  let localStream = null;
  let ws = null;
  let clientId = null;
  const pcs = {}; // peerId -> RTCPeerConnection

  function wsUrlForRoom(roomId) {
    const protocol = (location.protocol === 'https:') ? 'wss' : 'ws';
    // Signaling server assumed on same host, port 8000. Change if different.
    return `${protocol}://${location.hostname}:8000/ws/${roomId}`;
  }

  async function startLocalStream() {
    if (localStream) return localStream;
    try {
      localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localVideo.srcObject = localStream;
      return localStream;
    } catch (err) {
      alert('Could not get camera/microphone: ' + err.message);
      throw err;
    }
  }

  function sendWS(msg) {
    if (ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(msg));
  }

  function createPeerConnection(peerId) {
    const pc = new RTCPeerConnection(ICE_CONFIG);
    pcs[peerId] = pc;

    // Add local tracks
    if (localStream) {
      for (const track of localStream.getTracks()) pc.addTrack(track, localStream);
    }

    pc.onicecandidate = (ev) => {
      if (ev.candidate) {
        sendWS({ type: 'candidate', from: clientId, to: peerId, candidate: ev.candidate });
      }
    };

    pc.ontrack = (ev) => {
      // For one-to-one, attach to remoteVideo
      remoteVideo.srcObject = ev.streams[0];
    };

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === 'disconnected' || pc.connectionState === 'failed' || pc.connectionState === 'closed') {
        // cleanup
        try { pc.close(); } catch(e){}
        delete pcs[peerId];
        remoteVideo.srcObject = null;
      }
    };

    return pc;
  }

  async function handleOffer(msg) {
    const { from, sdp } = msg;
    const pc = createPeerConnection(from);
    await pc.setRemoteDescription(new RTCSessionDescription(sdp));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    sendWS({ type: 'answer', from: clientId, to: from, sdp: pc.localDescription });
  }

  async function handleAnswer(msg) {
    const { from, sdp } = msg;
    const pc = pcs[from];
    if (!pc) return console.warn('No PC for answer from', from);
    await pc.setRemoteDescription(new RTCSessionDescription(sdp));
  }

  async function handleCandidate(msg) {
    const { from, candidate } = msg;
    const pc = pcs[from];
    if (!pc) return console.warn('No PC for candidate from', from);
    try {
      await pc.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (e) {
      console.warn('Failed to add ICE candidate', e);
    }
  }

  function handlePeersList(peers) {
    // Create offers to each existing peer (one-to-one will just be one)
    peers.forEach(async (peerId) => {
      if (peerId === clientId) return;
      const pc = createPeerConnection(peerId);
      try {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        sendWS({ type: 'offer', from: clientId, to: peerId, sdp: pc.localDescription });
      } catch (e) {
        console.error('Failed to create/send offer', e);
      }
    });
  }

  function connectSignaling() {
    ws = new WebSocket(wsUrlForRoom(ROOM_ID));

    ws.onopen = () => {
      sendWS({ type: 'join', room: ROOM_ID, name: NAME });
    };

    ws.onmessage = async (ev) => {
      let msg = null;
      try { msg = JSON.parse(ev.data); } catch (e) { console.warn('Non-json ws message', ev.data); return; }
      switch (msg.type) {
        case 'id':
          clientId = msg.id;
          break;
        case 'peers':
          handlePeersList(msg.peers || []);
          break;
        case 'offer':
          await handleOffer(msg);
          break;
        case 'answer':
          await handleAnswer(msg);
          break;
        case 'candidate':
          await handleCandidate(msg);
          break;
        case 'leave':
          // peer left
          const pid = msg.id;
          if (pcs[pid]) { try { pcs[pid].close(); } catch(e){} delete pcs[pid]; }
          remoteVideo.srcObject = null;
          break;
        default:
          console.warn('Unknown ws message', msg);
      }
    };

    ws.onclose = () => {
      // cleanup
      for (const k in pcs) try { pcs[k].close(); } catch(e){}
      Object.keys(pcs).forEach(k=>delete pcs[k]);
      clientId = null;
    };
  }

  async function startCall() {
    startBtn.disabled = true;
    await startLocalStream();
    connectSignaling();
    hangupBtn.disabled = false;
  }

  function hangUp() {
    // Tell server we're leaving
    if (ws && ws.readyState === WebSocket.OPEN) sendWS({ type: 'leave', id: clientId, room: ROOM_ID });
    if (ws) ws.close();
    if (localStream) {
      for (const t of localStream.getTracks()) t.stop();
      localStream = null;
      localVideo.srcObject = null;
    }
    for (const k in pcs) try { pcs[k].close(); } catch(e){}
    Object.keys(pcs).forEach(k=>delete pcs[k]);
    hangupBtn.disabled = true;
    startBtn.disabled = false;
  }

  startBtn.addEventListener('click', () => startCall());
  hangupBtn.addEventListener('click', () => hangUp());

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    if (ws && ws.readyState === WebSocket.OPEN) sendWS({ type: 'leave', id: clientId, room: ROOM_ID });
  });

})();
