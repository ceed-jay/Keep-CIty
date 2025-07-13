document.addEventListener('DOMContentLoaded', () => {

    const music = document.getElementById('background-music');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const songTitleElement = document.getElementById('song-title');
    const statusTextElement = document.querySelector('.profile-status');

    const playlist = [
        { title: "Play the City's Music", src: "music/keepcity.mp3" },
        { title: "Play the City's Music", src: "music/keepcity2.mp3" },
    ];
    let currentSongIndex = 0;

    function loadSong(song) {
        songTitleElement.textContent = song.title;
        music.src = song.src;
    }

    function playMusic() {
        music.play();
        playPauseBtn.classList.remove('fa-play');
        playPauseBtn.classList.add('fa-pause');
    }

    function pauseMusic() {
        music.pause();
        playPauseBtn.classList.remove('fa-pause');
        playPauseBtn.classList.add('fa-play');
    }

    function playNextSong() {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(playlist[currentSongIndex]);
        playMusic();
    }

    function playPrevSong() {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(playlist[currentSongIndex]);
        playMusic();
    }

    playPauseBtn.addEventListener('click', () => {
        const isPlaying = !music.paused;
        isPlaying ? pauseMusic() : playMusic();
    });
    nextBtn.addEventListener('click', playNextSong);
    prevBtn.addEventListener('click', playPrevSong);
    music.addEventListener('ended', playNextSong);
    loadSong(playlist[currentSongIndex]);

    const fullText = "Where Stories Come to Life";
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseDuration = 2000;
    let charIndex = 0;

    function typeCharacter() {
        if (charIndex < fullText.length) {
            statusTextElement.textContent += fullText.charAt(charIndex);
            charIndex++;
            setTimeout(typeCharacter, typingSpeed);
        } else {
            setTimeout(eraseCharacter, pauseDuration);
        }
    }

    function eraseCharacter() {
        if (charIndex > 0) {
            statusTextElement.textContent = fullText.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseCharacter, deletingSpeed);
        } else {
            setTimeout(typeCharacter, pauseDuration);
        }
    }

    statusTextElement.classList.add('typing');
    setTimeout(typeCharacter, 1500);
    
    function updateVolumeSliderBackground() {
        const progress = (volumeSlider.value / volumeSlider.max) * 100;
        const colorGradient = 'linear-gradient(to right, #ffb86c 0%, #ff5555 100%)';
        volumeSlider.style.background = `linear-gradient(to right, ${colorGradient} ${progress}%, #444 ${progress}%)`;
    }
    music.volume = volumeSlider.value;
    updateVolumeSliderBackground();
    volumeSlider.addEventListener('input', (e) => {
        music.volume = e.target.value;
        updateVolumeSliderBackground();
    });

});