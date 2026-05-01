// Navbar scroll effect
window.addEventListener('scroll', function() {
  document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 30);
});

// Booking Form + Thank You Popup
document.addEventListener('DOMContentLoaded', function() {
  const bookingForm  = document.getElementById('bookingForm');
  const overlay      = document.getElementById('thankyouOverlay');
  const closeBtn     = document.getElementById('thankyouClose');

  /* ── Open popup ── */
  function showPopup() {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }

  /* ── Close popup ── */
  function hidePopup() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      bookingForm.reset();
      showPopup();
    });
  }

  // Close on button click
  if (closeBtn) closeBtn.addEventListener('click', hidePopup);

  // Close on backdrop click (outside the modal card)
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) hidePopup();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') hidePopup();
  });

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── 3D TESTIMONIALS CAROUSEL ──
  const carouselTrack = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const dots = document.querySelectorAll('.carousel-dot');
  const currentEl = document.querySelector('.carousel-counter .current');
  const totalEl = document.querySelector('.carousel-counter .total');

  if (carouselTrack && slides.length > 0) {
    let currentIndex = 0;
    const totalSlides = slides.length;
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let dragDistance = 0;

    // Update counter
    if (totalEl) totalEl.textContent = String(totalSlides).padStart(2, '0');

    function updateCarousel() {
      // Slide the track
      const translateX = -currentIndex * 100;
      carouselTrack.style.transform = `translateX(${translateX}%)`;

      // Update active classes for fade effect
      slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentIndex);
      });

      // Update dots
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });

      // Update counter
      if (currentEl) {
        currentEl.textContent = String(currentIndex + 1).padStart(2, '0');
      }
    }

    function goToSlide(index) {
      currentIndex = index;
      if (currentIndex < 0) currentIndex = totalSlides - 1;
      if (currentIndex >= totalSlides) currentIndex = 0;
      updateCarousel();
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    // Button navigation
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
      });
    });

    // Touch / Drag functionality
    function handleDragStart(e) {
      isDragging = true;
      startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
      carouselTrack.classList.add('dragging');
    }

    function handleDragMove(e) {
      if (!isDragging) return;
      currentX = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
      dragDistance = currentX - startX;
    }

    function handleDragEnd() {
      if (!isDragging) return;
      isDragging = false;
      carouselTrack.classList.remove('dragging');

      // Threshold for swipe (60px)
      if (dragDistance > 60) {
        prevSlide();
      } else if (dragDistance < -60) {
        nextSlide();
      }

      dragDistance = 0;
    }

    // Mouse events
    carouselTrack.addEventListener('mousedown', handleDragStart);
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);

    // Touch events
    carouselTrack.addEventListener('touchstart', handleDragStart, { passive: true });
    document.addEventListener('touchmove', handleDragMove, { passive: true });
    document.addEventListener('touchend', handleDragEnd);

    // Video play/pause functionality
    const videoWrappers = document.querySelectorAll('.video-wrapper');
    videoWrappers.forEach(wrapper => {
      const video = wrapper.querySelector('video');
      if (video) {
        wrapper.addEventListener('click', () => {
          if (video.paused) {
            // Pause all other videos first
            document.querySelectorAll('.media-video').forEach(v => {
              if (v !== video) {
                v.pause();
                v.closest('.video-wrapper')?.classList.remove('playing');
              }
            });
            video.play();
            wrapper.classList.add('playing');
          } else {
            video.pause();
            wrapper.classList.remove('playing');
          }
        });

        // Pause video when slide changes
        const observer = new MutationObserver(() => {
          const slide = wrapper.closest('.carousel-slide');
          if (!slide || !slide.classList.contains('active')) {
            video.pause();
            wrapper.classList.remove('playing');
          }
        });

        observer.observe(wrapper.closest('.carousel-slide'), { attributes: true, attributeFilter: ['class'] });
      }
    });

    // Initialize
    updateCarousel();
  }
});
