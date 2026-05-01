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

  // ── TABS FOR MEDIA SECTION ──
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;

      // Update active button
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update active panel
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `${tab}-tab`) {
          panel.classList.add('active');
        }
      });
    });
  });

  // Video play/pause functionality for tabs
  const videoItems = document.querySelectorAll('.video-item');
  videoItems.forEach(item => {
    const video = item.querySelector('video');
    if (video) {
      item.addEventListener('click', () => {
        if (video.paused) {
          // Pause all other videos first
          document.querySelectorAll('.media-video').forEach(v => {
            if (v !== video) {
              v.pause();
              v.closest('.video-item')?.classList.remove('playing');
            }
          });
          video.play();
          item.classList.add('playing');
        } else {
          video.pause();
          item.classList.remove('playing');
        }
      });
    }
  });
});
