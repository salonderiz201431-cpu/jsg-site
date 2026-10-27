// JSG-English speaking hair Salon — Kouhei Yamaguchi
(function () {
  'use strict';

  // Booking button is enabled only after the policy checkbox is ticked.
  var agree = document.getElementById('agree-policy');
  var bookBtn = document.getElementById('book-button');
  var hint = document.getElementById('book-hint');

  function syncBooking() {
    var ok = agree.checked;
    bookBtn.classList.toggle('is-disabled', !ok);
    bookBtn.setAttribute('aria-disabled', ok ? 'false' : 'true');
    if (ok) { bookBtn.removeAttribute('tabindex'); } else { bookBtn.setAttribute('tabindex', '-1'); }
    hint.textContent = ok
      ? 'LINE opens in a new tab.'
      : 'Tick the box above to open our LINE and book.';
  }

  if (agree && bookBtn) {
    agree.checked = false; // never pre-ticked, even after back/forward navigation
    agree.addEventListener('change', syncBooking);
    bookBtn.addEventListener('click', function (e) {
      if (!agree.checked) { e.preventDefault(); agree.focus(); }
    });
    syncBooking();
  }

  // Hide the mobile sticky "Book now" bar while the booking box is on screen.
  var sticky = document.querySelector('.sticky-book');
  var bookBox = document.getElementById('book');
  if (sticky && bookBox && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      sticky.classList.toggle('is-hidden', entries[0].isIntersecting);
    }, { threshold: 0.2 }).observe(bookBox);
  }

  var year = document.getElementById('year');
  if (year) { year.textContent = String(new Date().getFullYear()); }
})();
