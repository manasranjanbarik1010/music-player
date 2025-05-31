// === Select elements ===
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressBar = document.getElementById('progress-bar');
const volumeSlider = document.getElementById('volume');
const playlistEl = document.getElementById('playlist');
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist-name');

// === Playlist Array ===
const songs = [
  {
    title: "Rangabati",
    artist: "Jitendra Haripal",
    file: "assets/audio/Rangabati.mp3"
   
  },
  {
    title: "MaelaJada",
    artist: "Satrughna Luhar",
    file: "assets/audio/Maelajada.mp3"
  },
  {
    title: "PANCHRASI",
    artist: "Aseema Panda, Tarun Patel",
    file: "assets/audio/PANCHRASI.mp3"
  }
];

let currentSongIndex = 0;

// === Load Initial Song ===
function loadSong(index) {
  const song = songs[index];
  audio.src = song.file;
  songTitle.textContent = song.title;
  artistName.textContent = song.artist;
  highlightCurrentSong();
}
loadSong(currentSongIndex);

// === Play/Pause ===
playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = '⏸️';
  } else {
    audio.pause();
    playBtn.textContent = '▶️';
  }
});

// === Next / Previous ===
nextBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
  playBtn.textContent = '⏸️';
});

prevBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
  playBtn.textContent = '⏸️';
});

// === Update Progress Bar ===
audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.value = percent || 0;
});

// === Seek in Song ===
progressBar.addEventListener('input', () => {
  const seekTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

// === Volume Control ===
volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

// === Playlist Rendering ===
function renderPlaylist() {
  playlistEl.innerHTML = '';
  songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = `${song.title} - ${song.artist}`;
    li.classList.add('list-group-item', 'bg-dark', 'text-white');
    li.addEventListener('click', () => {
      currentSongIndex = index;
      loadSong(currentSongIndex);
      audio.play();
      playBtn.textContent = '⏸️';
    });
    playlistEl.appendChild(li);
  });
}
renderPlaylist();

// === Highlight Current Playing Song ===
function highlightCurrentSong() {
  const items = playlistEl.querySelectorAll('li');
  items.forEach((item, index) => {
    if (index === currentSongIndex) {
      item.style.backgroundColor = 'darkorange';
    } else {
      item.style.backgroundColor = 'darkslategray';
    }
  });
}

// === Auto Play Next ===
audio.addEventListener('ended', () => {
  nextBtn.click();
});
