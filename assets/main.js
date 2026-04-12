// ================================================
// HUGS LIFE HOLISTIC – Main JavaScript
// ================================================

// ---- NAVBAR: scroll shadow + hamburger ----
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
}

// ---- FADE IN ANIMATION ----
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => observer.observe(el));

// ---- GALLERY FILTER ----
const filters = document.querySelectorAll('.gal-filter');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filters.length > 0) {
  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      filters.forEach(f => f.classList.remove('active'));
      filter.classList.add('active');

      const cat = filter.dataset.filter;

      galleryItems.forEach(item => {
        if (cat === 'all' || item.dataset.category === cat) {
          item.style.display = '';
          item.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// ---- LIGHTBOX ----
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxPlaceholder = document.getElementById('lightboxPlaceholder');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentIndex = 0;
let visibleItems = [];

function openLightbox(index) {
  visibleItems = Array.from(galleryItems).filter(el => el.style.display !== 'none');
  currentIndex = index;
  showLightboxItem(currentIndex);
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function showLightboxItem(idx) {
  const item = visibleItems[idx];
  if (!item) return;

  const img = item.querySelector('img');
  const caption = item.querySelector('.gallery-caption');

  if (img) {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxImg.style.display = 'block';
    if (lightboxPlaceholder) lightboxPlaceholder.style.display = 'none';
  } else {
    if (lightboxImg) lightboxImg.style.display = 'none';
    if (lightboxPlaceholder) {
      lightboxPlaceholder.textContent = caption ? caption.textContent : 'Photo placeholder';
      lightboxPlaceholder.style.display = 'flex';
    }
  }

  if (lightboxCaption && caption) {
    lightboxCaption.textContent = caption.textContent;
  }
}

if (lightbox) {
  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  lightboxClose && lightboxClose.addEventListener('click', closeLightbox);

  lightboxPrev && lightboxPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    showLightboxItem(currentIndex);
  });

  lightboxNext && lightboxNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % visibleItems.length;
    showLightboxItem(currentIndex);
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') { currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length; showLightboxItem(currentIndex); }
    if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % visibleItems.length; showLightboxItem(currentIndex); }
  });
}

// ---- SMOOTH ANCHOR SCROLL (for # links on same page) ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});
