const audio      = document.getElementById('audio');
const player     = document.getElementById('player');
const playerTitle = document.getElementById('player-title');
const btnPlay    = document.getElementById('btn-play');
const btnPrev    = document.getElementById('btn-prev');
const btnNext    = document.getElementById('btn-next');
const progress   = document.getElementById('progress');
const timeCurrent = document.getElementById('time-current');
const timeTotal  = document.getElementById('time-total');
const volume     = document.getElementById('volume');
const tracks     = Array.from(document.querySelectorAll('.track'));

let currentIndex = -1;

function fmt(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

function setTrack(index, autoplay = true) {
  if (index < 0 || index >= tracks.length) return;

  tracks.forEach(t => t.classList.remove('is-playing'));

  currentIndex = index;
  const el = tracks[index];
  const src = el.dataset.src;
  const title = el.dataset.title;

  playerTitle.textContent = title;
  player.classList.add('visible');
  player.removeAttribute('aria-hidden');

  audio.src = src;
  if (autoplay) {
    audio.play().catch(() => {});
    el.classList.add('is-playing');
    player.classList.add('is-playing');
  }
}

function togglePlay() {
  if (currentIndex === -1) { setTrack(0); return; }

  if (audio.paused) {
    audio.play().catch(() => {});
    tracks[currentIndex]?.classList.add('is-playing');
    player.classList.add('is-playing');
  } else {
    audio.pause();
    tracks[currentIndex]?.classList.remove('is-playing');
    player.classList.remove('is-playing');
  }
}

// Track row clicks
tracks.forEach((el, i) => {
  el.addEventListener('click', () => {
    if (i === currentIndex) {
      togglePlay();
    } else {
      setTrack(i);
    }
  });
});

btnPlay.addEventListener('click', togglePlay);
btnPrev.addEventListener('click', () => setTrack(currentIndex - 1));
btnNext.addEventListener('click', () => setTrack(currentIndex + 1));

// Progress bar
audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  progress.value = pct;
  progress.style.setProperty('--pct', pct + '%');
  timeCurrent.textContent = fmt(audio.currentTime);
});

audio.addEventListener('loadedmetadata', () => {
  timeTotal.textContent = fmt(audio.duration);
});

audio.addEventListener('ended', () => {
  tracks[currentIndex]?.classList.remove('is-playing');
  player.classList.remove('is-playing');
  if (currentIndex < tracks.length - 1) {
    setTrack(currentIndex + 1);
  }
});

progress.addEventListener('input', () => {
  if (!audio.duration) return;
  audio.currentTime = (progress.value / 100) * audio.duration;
  progress.style.setProperty('--pct', progress.value + '%');
});

volume.addEventListener('input', () => {
  audio.volume = volume.value / 100;
});

audio.volume = volume.value / 100;

// Keyboard shortcuts
document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT') return;
  if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
  if (e.code === 'ArrowRight') audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
  if (e.code === 'ArrowLeft')  audio.currentTime = Math.max(0, audio.currentTime - 10);
});
