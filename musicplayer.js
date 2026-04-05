(function() {
    const style = document.createElement('style');
    style.innerHTML = `
        .music-player-widget {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 320px;
            background: var(--glass);
            backdrop-filter: blur(20px);
            border: 1px solid var(--border);
            border-radius: 20px;
            padding: 15px;
            display: flex;
            align-items: center;
            gap: 15px;
            z-index: 9999;
            transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .music-player-widget:hover {
            border-color: var(--accent);
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(255, 182, 193, 0.1);
        }

        .album-art-container {
            width: 65px;
            height: 65px;
            border-radius: 12px;
            overflow: hidden;
            flex-shrink: 0;
            border: 1px solid var(--border);
            background: #111;
        }

        .album-art-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .player-info {
            flex-grow: 1;
            min-width: 0;
        }

        .now-playing-label {
            font-size: 0.6rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: var(--accent);
            font-weight: 800;
            margin-bottom: 4px;
            opacity: 0.8;
        }

        .song-name {
            font-size: 0.85rem;
            font-weight: 700;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #fff;
            margin-bottom: 1px;
        }

        .artist-name {
            font-size: 0.75rem;
            color: #aaa;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .progress-container {
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            margin-top: 10px;
            cursor: pointer;
            position: relative;
        }

        .progress-bar {
            height: 100%;
            background: var(--accent);
            border-radius: 10px;
            width: 0%;
            box-shadow: 0 0 10px var(--accent);
            position: relative;
        }

        .progress-bar::after {
            content: '';
            position: absolute;
            right: -4px;
            top: 50%;
            transform: translateY(-50%);
            width: 8px;
            height: 8px;
            background: #fff;
            border-radius: 50%;
            box-shadow: 0 0 5px rgba(255,255,255,0.8);
        }

        .time-info {
            display: flex;
            justify-content: space-between;
            font-size: 9px;
            color: #666;
            margin-top: 6px;
            font-family: monospace;
        }

        .controls {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-top: 8px;
        }

        .control-btn {
            background: none;
            border: none;
            color: #fff;
            cursor: pointer !important;
            opacity: 0.6;
            transition: 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .control-btn:hover {
            opacity: 1;
            color: var(--accent);
        }

        .control-btn svg { width: 18px; height: 18px; }

        @media (max-width: 600px) {
            .music-player-widget {
                width: calc(100% - 40px);
                right: 20px;
                bottom: 20px;
            }
        }
    `;
    document.head.appendChild(style);

    const fullPlaylist = [
        { title: "Open Arms", artist: "SZA", slug: "openarms" },
        { title: "Saturn", artist: "SZA", slug: "saturn" },
    ];

    let currentIndex = Math.floor(Math.random() * fullPlaylist.length);
    const audio = document.getElementById('bg-music');

    const playerDiv = document.createElement('div');
    playerDiv.className = 'music-player-widget';
    playerDiv.innerHTML = `
        <div class="album-art-container">
            <img id="player-art" src="" alt="">
        </div>
        <div class="player-info">
            <div class="now-playing-label">Now Playing</div>
            <div id="player-song" class="song-name"></div>
            <div id="player-artist" class="artist-name"></div>
            
            <div class="progress-container" id="progress-wrapper">
                <div class="progress-bar" id="player-progress"></div>
            </div>
            <div class="time-info">
                <span id="time-current">0:00</span>
                <span id="time-duration">0:00</span>
            </div>

            <div class="controls">
                <button class="control-btn" onclick="prevTrack()"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg></button>
                <button class="control-btn" onclick="toggleMusicPlay()" id="play-pause-btn"><svg viewBox="0 0 24 24" fill="currentColor" id="play-icon"><path d="M8 5v14l11-7z"/></svg></button>
                <button class="control-btn" onclick="nextTrack()"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg></button>
            </div>
        </div>
    `;
    document.body.appendChild(playerDiv);

    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    window.loadTrack = function(index) {
        const track = fullPlaylist[index];
        audio.src = `assets/${track.slug}.mp3`;
        document.getElementById('player-song').innerText = track.title;
        document.getElementById('player-artist').innerText = track.artist;
        document.getElementById('player-art').src = `assets/${track.slug}.png`;
        document.getElementById('time-current').innerText = "0:00";
        document.getElementById('time-duration').innerText = "0:00";
    };

    window.toggleMusicPlay = function() {
        const btn = document.getElementById('play-pause-btn');
        if (audio.paused) {
            audio.play().catch(() => {});
            btn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
        } else {
            audio.pause();
            btn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
        }
    };

    window.nextTrack = function() {
        currentIndex = (currentIndex + 1) % fullPlaylist.length;
        loadTrack(currentIndex);
        audio.play().catch(() => {});
    };

    window.prevTrack = function() {
        currentIndex = (currentIndex - 1 + fullPlaylist.length) % fullPlaylist.length;
        loadTrack(currentIndex);
        audio.play().catch(() => {});
    };

    window.startApp = function() {
        document.getElementById('enter-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('enter-screen').style.visibility = 'hidden';
            document.getElementById('main-content').classList.add('visible');
            document.body.style.overflowY = 'auto';
        }, 1000);
        
        loadTrack(currentIndex);
        audio.play().catch(() => {});
        document.getElementById('play-pause-btn').innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
    };

    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        document.getElementById('player-progress').style.width = `${progress}%`;
        document.getElementById('time-current').innerText = formatTime(audio.currentTime);
    });

    audio.addEventListener('loadedmetadata', () => {
        document.getElementById('time-duration').innerText = formatTime(audio.duration);
    });

    audio.addEventListener('ended', nextTrack);

    document.getElementById('progress-wrapper').addEventListener('click', (e) => {
        const width = e.currentTarget.clientWidth;
        const clickX = e.offsetX;
        audio.currentTime = (clickX / width) * audio.duration;
    });

    loadTrack(currentIndex);
})();
