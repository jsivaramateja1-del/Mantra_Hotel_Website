// =============================================
// ROYAL HAVEN HOTEL — Main JavaScript
// MANTRA 2026 Summer School Assignment
// =============================================

// ---- Mobile Navigation Menu ----
const menuBtn  = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', function () {
    navLinks.classList.toggle('open');
    menuBtn.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
  });
  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      menuBtn.textContent = '☰';
    });
  });
}

// ---- Highlight active nav link ----
(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
})();

// ---- Booking Form Validation ----
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name      = document.getElementById('bName').value.trim();
    const email     = document.getElementById('bEmail').value.trim();
    const phone     = document.getElementById('bPhone').value.trim();
    const checkin   = document.getElementById('bCheckin').value;
    const checkout  = document.getElementById('bCheckout').value;
    const room      = document.getElementById('bRoom').value;
    const result    = document.getElementById('bookingResult');

    // Clear previous
    result.className = 'form-result';
    result.textContent = '';

    if (!name || !email || !phone || !checkin || !checkout || !room) {
      result.textContent = '⚠ Please fill in all required fields.';
      result.classList.add('error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      result.textContent = '⚠ Please enter a valid email address.';
      result.classList.add('error');
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      result.textContent = '⚠ Please enter a valid 10-digit mobile number.';
      result.classList.add('error');
      return;
    }
    if (new Date(checkout) <= new Date(checkin)) {
      result.textContent = '⚠ Check-out date must be after check-in date.';
      result.classList.add('error');
      return;
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
    result.textContent = '';

    if (!name || !email || !subject || !message) {
      result.textContent = '⚠ Please fill in all required fields.';
      result.classList.add('error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      result.textContent = '⚠ Please enter a valid email address.';
      result.classList.add('error');
      return;
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

  btns.forEach(function (btn) {
    btn.classList.toggle('active', btn.dataset.cat === category);
  });

  items.forEach(function (item) {
    if (category === 'all' || item.dataset.cat === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// ---- Room Cost Calculator ----
function calculateRoomCost() {
  const roomSelect  = document.getElementById('calcRoom');
  const nights      = parseInt(document.getElementById('calcNights').value, 10);
  const guests      = parseInt(document.getElementById('calcGuests').value, 10);
  const result      = document.getElementById('calcResult');

  if (!roomSelect || !result) return;

  const price = parseInt(roomSelect.value, 10);

  if (!nights || nights < 1) {
    result.textContent = '⚠ Please enter a valid number of nights.';
    result.className   = 'form-result error';
    return;
  }

  const subtotal = price * nights;
  const tax      = Math.round(subtotal * 0.12);
  const total    = subtotal + tax;

  result.innerHTML =
    `<strong>Room:</strong> ${roomSelect.options[roomSelect.selectedIndex].text.split('–')[0].trim()}<br>` +
    `<strong>Nights:</strong> ${nights} &nbsp; <strong>Guests:</strong> ${guests}<br>` +
    `<strong>Subtotal:</strong> ₹${subtotal.toLocaleString('en-IN')}<br>` +
    `<strong>GST (12%):</strong> ₹${tax.toLocaleString('en-IN')}<br>` +
    `<strong style="color:#1A7A4C;font-size:1.1rem">Total: ₹${total.toLocaleString('en-IN')}</strong>`;
  result.className = 'form-result success';
}

// ---- FAQ Toggle ----
document.querySelectorAll('.faq-question').forEach(function (btn) {
  btn.addEventListener('click', function () {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
    if (!isOpen) item.classList.add('open');
  });
});

// ---- Smooth scroll offset for sticky header ----
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
    }
  });
});