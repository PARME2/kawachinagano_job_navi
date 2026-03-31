/* ============================================
   かわちながのジョブナビ - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Mobile Navigation ----------
  const hamburger = document.querySelector('.hamburger');
  const navList = document.querySelector('.nav-list');
  const navOverlay = document.querySelector('.nav-overlay');

  function closeNav() {
    hamburger.classList.remove('active');
    navList.classList.remove('open');
    navOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('open');
      hamburger.classList.toggle('active');
      navOverlay.classList.toggle('open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeNav);
  }

  document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) closeNav();
    });
  });

  // ---------- Header shadow on scroll ----------
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.style.boxShadow = '0 4px 20px rgba(108, 92, 231, 0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  });

  // ---------- Page Top Button ----------
  const pageTopBtn = document.querySelector('.page-top');

  if (pageTopBtn) {
    window.addEventListener('scroll', () => {
      pageTopBtn.classList.toggle('visible', window.scrollY > 400);
    });

    pageTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- Scroll Animations ----------
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // Stagger children
  document.querySelectorAll('.category-card, .charm-card, .company-card, .data-card, .support-card, .industry-tag, .startup-item, .news-item, .company-detail-card, .event-card, .rec-job-card, .rec-company-card').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 8) * 0.06}s`;
  });

  // ---------- Company Filter ----------
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.company-detail-card').forEach(card => {
          if (filter === 'all' || card.dataset.industry === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ---------- Active nav ----------
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-list a:not(.nav-cta)').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---------- Smooth anchor scroll ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const offset = header ? header.offsetHeight + 20 : 20;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset,
          behavior: 'smooth'
        });
      }
    });
  });

});
