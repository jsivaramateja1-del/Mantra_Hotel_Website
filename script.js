// =============================================
// ROYAL HAVEN HOTEL — Main JavaScript
// Deep Purple & Silver Theme — Redesigned
// MANTRA 2026 Summer School Assignment
// =============================================

// ---- Mobile Navigation ----
const menuBtn  = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', function () {
    navLinks.classList.toggle('open');
    menuBtn.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
  });
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      menuBtn.textContent = '☰';
    });
  });
}

// ---- Active Nav Link ----
(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
})();

// ---- Scroll Reveal Animations ----
function revealOnScroll() {
  const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  elements.forEach(function (el) {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ---- Hero Particles ----
function createParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.width = p.style.height = (Math.random() * 3 + 1) + 'px';
    p.style.animationDuration = (Math.random() * 10 + 8) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.opacity = Math.random() * 0.5 + 0.1;
    container.appendChild(p);
  }
}
createParticles();

// ---- Image Slider ----
(function () {
  const track = document.querySelector('.slider-track');
  if (!track) return;
  const slides = document.querySelectorAll('.slide');
  const dots   = document.querySelectorAll('.slider-dot');
  let current  = 0;
  let autoPlay;

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach(function (d, i) { d.classList.toggle('active', i === current); });
  }

  document.getElementById('sliderPrev') && document.getElementById('sliderPrev').addEventListener('click', function () { goTo(current - 1); resetAuto(); });
  document.getElementById('sliderNext') && document.getElementById('sliderNext').addEventListener('click', function () { goTo(current + 1); resetAuto(); });
  dots.forEach(function (d, i) { d.addEventListener('click', function () { goTo(i); resetAuto(); }); });

  function resetAuto() { clearInterval(autoPlay); autoPlay = setInterval(function () { goTo(current + 1); }, 4500); }
  resetAuto();
  goTo(0);
})();

// ---- Booking Form Validation ----
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name     = document.getElementById('bName').value.trim();
    const email    = document.getElementById('bEmail').value.trim();
    const phone    = document.getElementById('bPhone').value.trim();
    const checkin  = document.getElementById('bCheckin').value;
    const checkout = document.getElementById('bCheckout').value;
    const room     = document.getElementById('bRoom').value;
    const result   = document.getElementById('bookingResult');
    result.className = 'form-result';

    if (!name || !email || !phone || !checkin || !checkout || !room) {
      result.textContent = '⚠ Please fill in all required fields.';
      result.classList.add('error'); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      result.textContent = '⚠ Please enter a valid email address.';
      result.classList.add('error'); return;
    }
    if (!/^\d{10}$/.test(phone)) {
      result.textContent = '⚠ Please enter a valid 10-digit mobile number.';
      result.classList.add('error'); return;
    }
    if (new Date(checkout) <= new Date(checkin)) {
      result.textContent = '⚠ Check-out date must be after check-in date.';
      result.classList.add('error'); return;
    }
    result.textContent = '✓ Booking request received! We will confirm your reservation within 24 hours.';
    result.classList.add('success');
    bookingForm.reset();
  });
}

// ---- Contact Form Validation ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name    = document.getElementById('cName').value.trim();
    const email   = document.getElementById('cEmail').value.trim();
    const subject = document.getElementById('cSubject').value.trim();
    const message = document.getElementById('cMessage').value.trim();
    const result  = document.getElementById('contactResult');
    result.className = 'form-result';

    if (!name || !email || !subject || !message) {
      result.textContent = '⚠ Please fill in all required fields.';
      result.classList.add('error'); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      result.textContent = '⚠ Please enter a valid email address.';
      result.classList.add('error'); return;
    }
    result.textContent = '✓ Thank you for contacting us! We will respond within 24 hours.';
    result.classList.add('success');
    contactForm.reset();
  });
}

// ---- Gallery Filter ----
function filterGallery(category) {
  const items = document.querySelectorAll('.gallery-item');
  const btns  = document.querySelectorAll('.filter-btn');
  btns.forEach(function (btn) { btn.classList.toggle('active', btn.dataset.cat === category); });
  items.forEach(function (item) {
    item.style.display = (category === 'all' || item.dataset.cat === category) ? 'block' : 'none';
  });
}

// ---- Room Cost Calculator ----
function calculateRoomCost() {
  const roomSelect = document.getElementById('calcRoom');
  const nights     = parseInt(document.getElementById('calcNights').value, 10);
  const guests     = parseInt(document.getElementById('calcGuests').value, 10);
  const result     = document.getElementById('calcResult');
  if (!roomSelect || !result) return;
  const price = parseInt(roomSelect.value, 10);
  if (!nights || nights < 1) {
    result.textContent = '⚠ Please enter a valid number of nights.';
    result.className = 'form-result error'; return;
  }
  const subtotal = price * nights;
  const tax      = Math.round(subtotal * 0.12);
  const total    = subtotal + tax;
  result.innerHTML =
    `<strong>Room:</strong> ${roomSelect.options[roomSelect.selectedIndex].text.split('–')[0].trim()}<br>` +
    `<strong>Nights:</strong> ${nights} &nbsp; <strong>Guests:</strong> ${guests}<br>` +
    `<strong>Subtotal:</strong> ₹${subtotal.toLocaleString('en-IN')}<br>` +
    `<strong>GST (12%):</strong> ₹${tax.toLocaleString('en-IN')}<br>` +
    `<strong style="color:var(--purple);font-size:1.1rem">Total: ₹${total.toLocaleString('en-IN')}</strong>`;
  result.className = 'form-result success';
}

// ---- FAQ Toggle ----
document.querySelectorAll('.faq-question').forEach(function (btn) {
  btn.addEventListener('click', function () {
    const item   = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
    if (!isOpen) item.classList.add('open');
  });
});

// ---- Smooth Scroll ----
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
    }
  });
});
