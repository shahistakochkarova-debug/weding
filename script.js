const envelope = document.getElementById('envelope');
const envelopeScreen = document.getElementById('envelopeScreen');
const invitation = document.getElementById('invitation');
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');

let opened = false;

function startMusic() {
  music.volume = 0.5;
  music.currentTime = 0;

  const playPromise = music.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        musicBtn.classList.add('playing');
        console.log('🎵 Музыка играет');
      })
      .catch(err => {
        console.warn('⚠️ Музыка не запустилась:', err.name, err.message);
        setTimeout(() => {
          music.play().then(() => {
            musicBtn.classList.add('playing');
          }).catch(e => console.warn('Повтор не удался:', e));
        }, 300);
      });
  }
}

envelope.addEventListener('click', () => {
  if (opened) return;
  opened = true;

  envelope.classList.add('open');

  startMusic();
  musicBtn.classList.add('show');

  setTimeout(() => {
    envelopeScreen.classList.add('hidden');
    invitation.classList.add('show');
    window.scrollTo(0, 0);
  }, 1000);
});

musicBtn.addEventListener('click', () => {
  if (music.paused) {
    music.play()
      .then(() => musicBtn.classList.add('playing'))
      .catch(e => console.warn('Не удалось:', e));
  } else {
    music.pause();
    musicBtn.classList.remove('playing');
  }
});

music.addEventListener('error', () => {
  console.error('❌ Ошибка загрузки music.mp3. Проверь:');
  console.error('   1. Файл называется ровно "music.mp3"');
  console.error('   2. Файл лежит рядом с index.html');
  console.error('   3. Размер файла больше 0 КБ');
});

document.addEventListener('touchstart', function initMusic() {
  if (opened && music.paused) {
    music.play().then(() => musicBtn.classList.add('playing')).catch(() => {});
  }
  document.removeEventListener('touchstart', initMusic);
}, { passive: true });