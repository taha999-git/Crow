// Real-time meeting updates (simulated)
setInterval(() => {
    const badges = document.querySelectorAll('.stat-badge span');
    if (badges[0]) {
        const current = parseInt(badges[0].textContent);
        badges[0].innerHTML = `🎯 ${current + (Math.random() > 0.7 ? 1 : 0)}`;
    }
}, 30000);

// Auto-refresh meetings every 5 minutes
setInterval(refreshMeetings, 300000);