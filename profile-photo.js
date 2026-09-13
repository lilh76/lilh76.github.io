(() => {
  const photo = document.querySelector('.profile-photo');
  const caption = document.querySelector('.profile-caption p');
  if (!photo || !caption) return;

  // Add filenames here when adding images to data/images/tomori-cropped-wide/.
  const tomoriImages = [
    'data/images/tomori-cropped-wide/1.jpg.jpg',
    'data/images/tomori-cropped-wide/2.png.jpg',
    'data/images/tomori-cropped-wide/IMG_1100.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_1105.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_1107.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_1155.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_1218.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_1276.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_1277.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_1364.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_1506.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_1619.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_1734.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_1882.JPG.jpg',
    'data/images/tomori-cropped-wide/IMG_1942.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_1969.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_2787.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_3090.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_3905.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_4111.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_5079.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_5084.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_5109.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_5249.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_5304.heic.jpg',
    'data/images/tomori-cropped-wide/IMG_5384.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_5518.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_5611.heic.jpg',
    'data/images/tomori-cropped-wide/IMG_6116.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_6247.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_6257.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_6301.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_6336.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_6380.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_6388.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_6399.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_6913.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_6914.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_6916.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_7159.HEIC.jpg',
    'data/images/tomori-cropped-wide/IMG_7168.HEIC.jpg',
  ];
  const originalSrc = photo.getAttribute('src');
  const originalAlt = photo.alt;
  const originalCaption = caption.textContent;
  const originalCursor = photo.style.cursor;
  const tomoriAudio = new Audio('data/images/tomori-cropped-wide/hitoshizuku-mygo-op.mp3');
  tomoriAudio.preload = 'none';
  const musicToggle = document.querySelector('.profile-music-toggle');
  const playMusic = () => {
    tomoriAudio.play().catch((error) => {
      console.warn('Unable to play Tomori audio:', error);
    });
  };
  if (musicToggle) {
    const updateMusicToggle = () => {
      const playing = !tomoriAudio.paused && !tomoriAudio.ended;
      musicToggle.textContent = playing ? 'Ⅱ' : '▶';
      const label = playing ? 'Pause music' : 'Play music';
      musicToggle.setAttribute('aria-label', label);
      musicToggle.title = label;
    };
    tomoriAudio.addEventListener('playing', () => {
      musicToggle.hidden = false;
      updateMusicToggle();
    });
    tomoriAudio.addEventListener('pause', updateMusicToggle);
    tomoriAudio.addEventListener('ended', updateMusicToggle);
    musicToggle.addEventListener('click', () => {
      if (tomoriAudio.paused || tomoriAudio.ended) {
        playMusic();
      } else {
        tomoriAudio.pause();
      }
    });
  }
  let showingTomori = false;
  let hoverId = 0;
  let hoverCount = 0;

  photo.addEventListener('mouseenter', () => {
    const currentHover = ++hoverId;
    hoverCount = (hoverCount + 1) % 5;
    if (hoverCount !== 0) return;

    const replacement = new Image();
    replacement.onload = () => {
      if (currentHover !== hoverId) return;
      photo.src = replacement.src;
      photo.alt = 'Takamatsu Tomori';
      caption.textContent = 'Takamatsu Tomori desu...';
      showingTomori = true;
      photo.style.cursor = 'pointer';
    };
    replacement.src = tomoriImages[Math.floor(Math.random() * tomoriImages.length)];
  });

  photo.addEventListener('click', (event) => {
    if (event.button !== 0 || !showingTomori) return;
    tomoriAudio.currentTime = 0;
    playMusic();
  });

  photo.addEventListener('mouseleave', () => {
    ++hoverId;
    showingTomori = false;
    photo.style.cursor = originalCursor;
    photo.src = originalSrc;
    photo.alt = originalAlt;
    caption.textContent = originalCaption;
  });
})();
