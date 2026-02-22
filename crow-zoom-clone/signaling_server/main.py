from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
import uuid
import asyncio
import json

app = FastAPI()

# rooms: room_id -> { client_id: websocket }
rooms = {}

def get_peers(room_id):
    return list(rooms.get(room_id, {}).keys())

async def send_json_safe(ws: WebSocket, data):
    try:
        await ws.send_text(json.dumps(data))
    except Exception:
        # ignore send errors for now
        pass

@app.websocket('/ws/{room_id}')
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    await websocket.accept()
    client_id = str(uuid.uuid4())
    # store
    room = rooms.setdefault(room_id, {})
    room[client_id] = websocket

    # send assigned id
    await send_json_safe(websocket, { 'type': 'id', 'id': client_id })
    # inform the new client of existing peers
    await send_json_safe(websocket, { 'type': 'peers', 'peers': get_peers(room_id) })

    # notify existing peers about the newcomer (optional)
    for pid, pws in list(room.items()):
        if pid == client_id: continue
        await send_json_safe(pws, { 'type': 'peers', 'peers': get_peers(room_id) })

    try:
        while True:
            data = await websocket.receive_text()
            try:
                msg = json.loads(data)
            except Exception:
                continue

            mtype = msg.get('type')
            # Forward messages to target peer where applicable
            if mtype in ('offer', 'answer', 'candidate'):
                target = msg.get('to')
                if not target: continue
                target_ws = room.get(target)
                if target_ws:
                    # attach sender id if not present
                    msg.setdefault('from', client_id)
                    await send_json_safe(target_ws, msg)
            elif mtype == 'join':
                # client already added; ignore
                pass
            elif mtype == 'leave':
                # client intends to leave
                break
            else:
                # Unknown type: ignore or broadcast
                pass

    except WebSocketDisconnect:
        pass
    finally:
        # cleanup client
        room = rooms.get(room_id, {})
        if client_id in room:
            del room[client_id]
        # notify remaining peers
        for pid, pws in list(room.items()):
            await send_json_safe(pws, { 'type': 'leave', 'id': client_id })
