/* ============================================
   A.M.D. DESHAN — Portfolio JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // ───────────────────────────────────────
  // 1. Scroll Reveal Animation
  // ───────────────────────────────────────
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ───────────────────────────────────────
  // 2. Sticky Navigation (index page only)
  // ───────────────────────────────────────
  const nav = document.getElementById('nav');
  if (nav && !nav.classList.contains('scrolled')) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ───────────────────────────────────────
  // 3. Smooth Scroll for Anchor Links
  // ───────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ───────────────────────────────────────
  // 4. Animated Progress Bars (Skills Page)
  // ───────────────────────────────────────
  const progressBars = document.querySelectorAll('.progress-bar');

  if (progressBars.length > 0) {
    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const percent = bar.getAttribute('data-percent');
          // Small delay for dramatic effect
          setTimeout(() => {
            bar.style.width = percent + '%';
          }, 200);
          progressObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => progressObserver.observe(bar));
  }

  // ───────────────────────────────────────
  // 5. Gallery Filter (Work Page)
  // ───────────────────────────────────────
  const filterButtons = document.querySelectorAll('.gallery-filter');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      // Update active button
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px) scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 400);
        }
      });
    });
  });

  // ───────────────────────────────────────
  // 6. Signature Hero Parallax
  // ───────────────────────────────────────
  const signatureHero = document.querySelector('.signature-hero');
  if (signatureHero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const maxScroll = window.innerHeight * 0.6;
      const progress = Math.min(scrolled / maxScroll, 1);

      const text = signatureHero.querySelector('.signature-text');
      if (text) {
        text.style.opacity = 1 - (progress * 0.8);
        text.style.transform = 'translateY(' + (progress * 40) + 'px)';
      }
    }, { passive: true });
  }

  // ───────────────────────────────────────
  // 7. Gallery Item Hover Sound/Effect (Optional)
  // ───────────────────────────────────────
  galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
    });
    item.addEventListener('mouseleave', function() {
      this.style.zIndex = '1';
    });
  });

  // ───────────────────────────────────────
  // 8. Nav Link Active State on Scroll
  // ───────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  if (sections.length > 0) {
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });

      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    }, { passive: true });
  }

});
