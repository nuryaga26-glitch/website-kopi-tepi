// ===========================
// Kopi Tepi — Main JavaScript
// ===========================

document.addEventListener('DOMContentLoaded', () => {

  // ——— Page Loader ———
  const loader = document.getElementById('page-loader');
  window.addEventListener('load', () => {
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 500);
  });

  // ——— Navbar Scroll Effect ———
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.navbar__link');
  const sections = document.querySelectorAll('section[id], .hero');

  function handleNavbarScroll() {
    if (window.scrollY > 80) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  }

  // ——— Active Nav Link on Scroll ———
  function highlightActiveLink() {
    const scrollPos = window.scrollY + 120;

    const sectionMap = {
      'hero': 'home',
      'our-menu': 'our-menu',
      'about-us': 'about-us',
      'location': 'location'
    };

    let currentSection = '';

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.classList.contains('hero') ? 'hero' : section.id;

      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = sectionMap[id] || id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('navbar__link--active');
      const href = link.getAttribute('href').replace('#', '');
      if (href === currentSection || (href === 'home' && currentSection === 'home')) {
        link.classList.add('navbar__link--active');
      }
    });
  }

  window.addEventListener('scroll', () => {
    handleNavbarScroll();
    highlightActiveLink();
  });

  // Initial call
  handleNavbarScroll();
  highlightActiveLink();

  // ——— Smooth Scroll for Nav Links ———
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').replace('#', '');
      let target;

      if (targetId === 'home') {
        target = document.querySelector('.hero');
      } else {
        target = document.getElementById(targetId);
      }

      if (target) {
        const offset = navbar.offsetHeight;
        const targetPos = target.offsetTop - offset;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  // ——— Scroll Reveal Animation ———
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.revealDelay || 0;
        setTimeout(() => {
          el.classList.add('revealed');
        }, delay);
        revealObserver.unobserve(el);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ——— Hero Parallax Effect ———
  const heroBg = document.querySelector('.hero__bg');
  window.addEventListener('scroll', () => {
    if (heroBg) {
      const scrolled = window.scrollY;
      const heroHeight = document.querySelector('.hero').offsetHeight;
      if (scrolled < heroHeight) {
        heroBg.style.transform = `rotate(180deg) scaleY(-1) translateY(${scrolled * 0.3}px)`;
      }
    }
  });

  // ——— Counter Animation (for stats if added) ———
  function animateCounter(el, target, duration) {
    let start = 0;
    const step = target / (duration / 16);
    const counter = setInterval(() => {
      start += step;
      if (start >= target) {
        el.textContent = target;
        clearInterval(counter);
      } else {
        el.textContent = Math.floor(start);
      }
    }, 16);
  }

  // ——— Back to Top Button ———
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ——— Menu Item Tilt Effect ———
  const menuItems = document.querySelectorAll('.menu__item');
  menuItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      item.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
    });
  });

  // ——— Typing Effect for Hero Title ———
  const heroTitle = document.querySelector('.hero__title');
  if (heroTitle) {
    heroTitle.style.opacity = '0';
    setTimeout(() => {
      heroTitle.style.opacity = '1';
      heroTitle.classList.add('reveal-text');
    }, 300);
  }

  // ——— Modal functions (global) ———
  window.openModal = function(id) {
    const modal = document.getElementById('modal-' + id);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function(id) {
    const modal = document.getElementById('modal-' + id);
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  window.closeModalOnOverlay = function(event) {
    if (event.target === event.currentTarget) {
      event.target.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(modal => {
        modal.classList.remove('active');
      });
      document.body.style.overflow = '';
    }
  });

  // ——— Navbar Mobile Toggle ———
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

});
