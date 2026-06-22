/* ─── NAVBAR SCROLL ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

/* ─── MOBILE MENU ─── */
const burgerBtn = document.getElementById('burgerBtn');
const navLinks  = document.getElementById('navLinks');
burgerBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ─── BACK TO TOP ─── */
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── REVEAL ON SCROLL ─── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── ANIMATED COUNTERS ─── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
const statsSection = document.querySelector('.stats');
if (statsSection) statsObserver.observe(statsSection);

/* ─── TESTIMONIOS SLIDER ─── */
const track     = document.getElementById('testimoniosTrack');
const tPrev     = document.getElementById('tPrev');
const tNext     = document.getElementById('tNext');
const dotsEl    = document.getElementById('tDots');
const cards     = track ? track.querySelectorAll('.testimonio-card') : [];
let perSlide    = window.innerWidth < 768 ? 1 : 3;
let current     = 0;
const total     = Math.ceil(cards.length / perSlide);

function buildDots() {
  if (!dotsEl) return;
  dotsEl.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.className = 't-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  }
}

function goTo(idx) {
  current = (idx + total) % total;
  const offset = current * (100 / perSlide);
  track.style.transform = `translateX(-${offset * perSlide / (cards.length / perSlide)}%)`;
  const widthPer = 100 / cards.length;
  const cardPlusgap = cards[0] ? (cards[0].offsetWidth + 32) : 0;
  track.style.transform = `translateX(-${current * perSlide * cardPlusgap}px)`;
  dotsEl.querySelectorAll('.t-dot').forEach((d, i) => d.classList.toggle('active', i === current));
}

if (track && cards.length) {
  buildDots();
  tPrev.addEventListener('click', () => goTo(current - 1));
  tNext.addEventListener('click', () => goTo(current + 1));

  let autoSlide = setInterval(() => goTo(current + 1), 4500);
  track.parentElement.addEventListener('mouseenter', () => clearInterval(autoSlide));
  track.parentElement.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => goTo(current + 1), 4500);
  });

  window.addEventListener('resize', () => {
    const newPer = window.innerWidth < 768 ? 1 : 3;
    if (newPer !== perSlide) {
      perSlide = newPer;
      current = 0;
      buildDots();
      goTo(0);
    }
  });
}

/* ─── FAQ ACCORDION ─── */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ─── CONTACT FORM ─── */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn');
    const btnText   = btn.querySelector('.btn-text');
    const btnLoader = btn.querySelector('.btn-loader');
    btn.disabled = true;
    btnText.hidden = true;
    btnLoader.hidden = false;

    setTimeout(() => {
      btn.disabled = false;
      btnText.hidden = false;
      btnLoader.hidden = true;
      formSuccess.hidden = false;
      contactForm.reset();
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 1600);
  });
}

/* ─── NEWSLETTER FORM ─── */
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    const btn   = newsletterForm.querySelector('button');
    btn.textContent = '¡Listo!';
    btn.style.background = '#2d7a4f';
    input.value = '';
    setTimeout(() => {
      btn.textContent = 'Suscribir';
      btn.style.background = '';
    }, 3000);
  });
}

/* ─── SMOOTH SCROLL OFFSET (fixed header) ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
