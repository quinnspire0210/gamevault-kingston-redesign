/* Game Vault Kingston — shared interactions */
(function () {
  'use strict';

  /* ---- Mobile menu (accessible) ---- */
  var btn = document.getElementById('menu-btn');
  var nav = document.getElementById('nav-menu');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    // Close menu when a link is tapped
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Open menu');
      }
    });
  }

  /* ---- Smart header: hide on scroll down, show on scroll up ---- */
  var header = document.querySelector('.site-header');
  if (header) {
    var lastY = window.scrollY || 0;
    var ticking = false;
    var DELTA = 6;     // ignore tiny scrolls (jitter)
    var TOP_ZONE = 120; // always show near the top
    function updateHeader() {
      var y = window.scrollY || 0;
      var menuOpen = nav && nav.classList.contains('is-open');
      if (Math.abs(y - lastY) > DELTA && !menuOpen) {
        if (y > lastY && y > TOP_ZONE) {
          header.classList.add('is-hidden');   // scrolling down
        } else {
          header.classList.remove('is-hidden'); // scrolling up
        }
        lastY = y;
      } else if (y <= TOP_ZONE) {
        header.classList.remove('is-hidden');
      }
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(updateHeader); ticking = true; }
    }, { passive: true });
  }

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Shop filter chips (visual demo) ---- */
  var chips = document.querySelectorAll('.chip');
  if (chips.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
        chip.setAttribute('aria-pressed', 'true');
        var filter = chip.dataset.filter;
        document.querySelectorAll('.cat-row').forEach(function (row) {
          var show = filter === 'all' || row.dataset.cat === filter;
          row.style.display = show ? '' : 'none';
        });
      });
    });
  }
})();
