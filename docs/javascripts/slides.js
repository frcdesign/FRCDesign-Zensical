(function () {
  function initSlideshow(slideshow) {
    // 1) Grab the images the user wrote in Markdown
    const imgs = Array.from(slideshow.querySelectorAll('img'));
    if (imgs.length === 0) return;

    // 2) Create the inner container
    const inner = document.createElement('div');
    inner.className = 'slideshow-inner';

    // Optional per-slideshow height: data-height="320"
    const height = slideshow.getAttribute('data-height');
    if (height) {
      slideshow.style.setProperty('--slideshow-height', height + 'px');
    }

    // 3) Turn each <img> into a slide
    imgs.forEach((img) => {
      const figure = document.createElement('figure');
      figure.className = 'slide';

      const wrapper = document.createElement('div');
      wrapper.className = 'slide-image';

      // move the image into the wrapper
      wrapper.appendChild(img);
      figure.appendChild(wrapper);

      const captionText = img.getAttribute('data-caption');
      if (captionText) {
        const caption = document.createElement('figcaption');
        caption.textContent = captionText;
        figure.appendChild(caption);
      }

      inner.appendChild(figure);
    });

    // 4) Clear original content and insert our new structure
    while (slideshow.firstChild) {
      slideshow.removeChild(slideshow.firstChild);
    }
    slideshow.appendChild(inner);

    // 5) Add navigation buttons
    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'slideshow-nav-btn slideshow-nav-btn--prev';
    prevBtn.setAttribute('data-slideshow-prev', '');
    prevBtn.innerHTML = '&#10094;';

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'slideshow-nav-btn slideshow-nav-btn--next';
    nextBtn.setAttribute('data-slideshow-next', '');
    nextBtn.innerHTML = '&#10095;';

    slideshow.appendChild(prevBtn);
    slideshow.appendChild(nextBtn);

    // 6) Slides & dots
    const slides = Array.from(slideshow.querySelectorAll('.slide'));
    if (!slides.length) return;

    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slideshow-dots';

    const dots = slides.map((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'slideshow-dot';
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dotsContainer.appendChild(dot);

      dot.addEventListener('click', () => showSlide(i));
      return dot;
    });

    slideshow.appendChild(dotsContainer);

    let index = 0;

    function showSlide(newIndex) {
      slides[index].classList.remove('active');
      index = (newIndex + slides.length) % slides.length;
      slides[index].classList.add('active');

      dots.forEach((d) => d.classList.remove('active'));
      dots[index].classList.add('active');
    }

    // 7) Wire arrows
    prevBtn.addEventListener('click', () => showSlide(index - 1));
    nextBtn.addEventListener('click', () => showSlide(index + 1));

    // 8) Initialize first slide & dot
    showSlide(0);
  }

  function initAllSlideshows() {
    document.querySelectorAll('.slideshow').forEach(initSlideshow);
  }

  document.addEventListener('DOMContentLoaded', initAllSlideshows);
})();
