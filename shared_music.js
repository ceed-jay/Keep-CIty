document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('global-audio');
    const muteBtn = document.getElementById('global-mute-button');
    const muteIcon = muteBtn.querySelector('i');

    const playlist = [
        { title: "Play the City's Music", src: "music/keepcity.mp3" },
        { title: "Play the City's Music", src: "music/keepcity2.mp3" },
    ];
    let currentSongIndex = 0;

    function loadAndPlaySong(songIndex, playTime = 0) {
        currentSongIndex = songIndex;
        music.src = playlist[songIndex].src;
        music.currentTime = playTime;
        music.play().catch(e => console.error("Autoplay was blocked:", e));
    }

    function playRandomSong() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * playlist.length);
        } while (playlist.length > 1 && newIndex === currentSongIndex);
        
        loadAndPlaySong(newIndex);
    }

    function updateMuteIcon() {
        if (music.muted) {
            muteIcon.classList.remove('fa-volume-high');
            muteIcon.classList.add('fa-volume-xmark');
        } else {
            muteIcon.classList.remove('fa-volume-xmark');
            muteIcon.classList.add('fa-volume-high');
        }
    }

    let savedSongIndex = sessionStorage.getItem('musicPlayer_songIndex');
    let savedTime = sessionStorage.getItem('musicPlayer_time');
    let savedMuteState = sessionStorage.getItem('musicPlayer_isMuted');

    if (savedSongIndex !== null && savedTime !== null) {
        music.muted = (savedMuteState === 'true');
        loadAndPlaySong(parseInt(savedSongIndex, 10), parseFloat(savedTime));
    } else {
        music.muted = true;
        playRandomSong();
    }
    updateMuteIcon();

    muteBtn.addEventListener('click', () => {
        music.muted = !music.muted;
        updateMuteIcon();
        sessionStorage.setItem('musicPlayer_isMuted', music.muted);
    });

    music.addEventListener('ended', playRandomSong);

    music.addEventListener('timeupdate', () => {
        sessionStorage.setItem('musicPlayer_songIndex', currentSongIndex);
        sessionStorage.setItem('musicPlayer_time', music.currentTime);
    });
});