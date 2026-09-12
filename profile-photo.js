(() => {
  const photo = document.querySelector('.profile-photo');
  const caption = document.querySelector('.profile-caption p');
  if (!photo || !caption) return;

  // Add filenames here when adding images to data/images/tomori/.
  const tomoriImages = ['data/images/tomori/1.jpg'];
  const originalSrc = photo.getAttribute('src');
  const originalAlt = photo.alt;
  const originalCaption = caption.textContent;
  let hoverId = 0;

  photo.addEventListener('mouseenter', () => {
    const currentHover = ++hoverId;
    if (Math.random() >= 0.1) return;

    const replacement = new Image();
    replacement.onload = () => {
      if (currentHover !== hoverId) return;
      photo.src = replacement.src;
      photo.alt = 'Takamatsu Tomori';
      caption.textContent = 'Takamatsu Tomori desu...';
    };
    replacement.src = tomoriImages[Math.floor(Math.random() * tomoriImages.length)];
  });

  photo.addEventListener('mouseleave', () => {
    ++hoverId;
    photo.src = originalSrc;
    photo.alt = originalAlt;
    caption.textContent = originalCaption;
  });
})();
