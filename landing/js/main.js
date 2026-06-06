// ===== Caterists landing — minimal demo interactivity =====
(function () {
  if (window.lucide) lucide.createIcons();

  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length > 1) {
        var el = document.querySelector(id);
        if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      }
    });
  });

  function confirmation(text) {
    var msg = document.createElement('div');
    msg.textContent = text;
    msg.style.cssText = 'font-family:var(--body);font-weight:700;color:var(--ink);background:var(--lime);' +
      'border:2px solid var(--ink);border-radius:16px;padding:16px 22px;box-shadow:var(--sh-sm);text-align:center';
    return msg;
  }

  // Hero request card -> fake "request sent"
  document.querySelectorAll('.js-request').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.replaceWith(confirmation('✓ Request sent — a Kitchen Partner will confirm shortly.'));
    });
  });

  // Waitlist form -> fake "joined"
  document.querySelectorAll('.js-waitlist').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input');
      form.replaceWith(confirmation('✓ Thanks! We’ll reach out for the Hamburg launch' + (input && input.value ? ' at ' + input.value : '') + '.'));
    });
  });

  // CTA chips -> toggle selection
  document.querySelectorAll('.js-chip').forEach(function (chip) {
    chip.addEventListener('click', function () { chip.classList.toggle('selected'); });
  });

  // "Learn more / Show more" -> jump to waitlist
  document.querySelectorAll('.js-more').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var el = document.querySelector('#waitlist');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
