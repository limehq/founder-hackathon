// ===== Caterists landing — minimal demo interactivity =====
(function () {
  if (window.lucide) lucide.createIcons();

  var modal = document.getElementById('waitlist-modal');

  function openModal() {
    if (!modal) return;
    modal.hidden = false;
    document.body.classList.add('modal-open');
  }
  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
  }

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

  // Hero "Send request" -> open the waitlist modal
  document.querySelectorAll('.js-request').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      openModal();
    });
  });

  // Modal close: button, backdrop click, Escape
  document.querySelectorAll('.js-modal-close').forEach(function (b) {
    b.addEventListener('click', closeModal);
  });
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && !modal.hidden) closeModal();
  });

  // Waitlist forms (modal + newsletter) -> fake "joined"
  document.querySelectorAll('.js-waitlist').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input');
      form.replaceWith(confirmation('✓ Thanks! We’ll reach out for the Hamburg launch' + (input && input.value ? ' at ' + input.value : '') + '.'));
    });
  });

  // CTA / modal chips -> toggle selection
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
