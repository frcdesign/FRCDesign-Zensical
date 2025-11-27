(function () {
  function initYoutubeEmbed(container) {
    if (container.dataset.ytEmbedInitialized === 'true') return;
    container.dataset.ytEmbedInitialized = 'true';

    const videoId = container.getAttribute('data-yt-embed-id');
    if (!videoId) return;

    const captionText = container.getAttribute('data-caption') || '';

    // Build inner structure
    const inner = document.createElement('div');
    inner.className = 'yt-embed-inner';

    const player = document.createElement('div');
    player.className = 'yt-embed-player';

    const iframe = document.createElement('iframe');
    iframe.src =
      'https://www.youtube.com/embed/' +
      videoId +
      '?rel=0&controls=1&showinfo=0&vq=hd1080';
    iframe.title =
      container.getAttribute('data-title') || 'YouTube video player';
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute(
      'allow',
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
    );

    player.appendChild(iframe);
    inner.appendChild(player);

    if (captionText) {
      const caption = document.createElement('div');
      caption.className = 'yt-embed-caption';
      caption.textContent = captionText;
      inner.appendChild(caption);
    }

    // Replace original content
    while (container.firstChild) container.removeChild(container.firstChild);
    container.appendChild(inner);
  }

  function initAllYoutubeEmbeds() {
    document
      .querySelectorAll('[data-yt-embed-id]')
      .forEach(initYoutubeEmbed);
  }

  // Support Material for MkDocs instant navigation if available
  if (window.document$ && typeof document$.subscribe === 'function') {
    document$.subscribe(() => {
      initAllYoutubeEmbeds();
    });
  } else {
    document.addEventListener('DOMContentLoaded', initAllYoutubeEmbeds);
    window.addEventListener('pageshow', initAllYoutubeEmbeds);
  }
})();
