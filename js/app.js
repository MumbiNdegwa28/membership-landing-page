document.addEventListener('DOMContentLoaded', () => {

  /* Utility: close all membership collapses */
  function closeAll(collapsesExceptId = null) {
    document.querySelectorAll('.membership-desc').forEach(desc => {
      if (desc.id === collapsesExceptId) return;
      const bs = bootstrap.Collapse.getInstance(desc);
      if (bs && desc.classList.contains('show')) {
        bs.hide();
      }
      // update parent card state/icon
      const card = desc.closest('.membership-card');
      if (card) {
        card.setAttribute('aria-expanded', 'false');
        const icon = card.querySelector('.toggle-icon');
        if (icon) icon.classList.remove('rotated');
        card.classList.remove('active');
      }
    });
  }

  /* Initialize each membership card */
  function initMembership(cardId, descId, iconId) {
    const card = document.getElementById(cardId);
    const desc = document.getElementById(descId);
    const icon = document.getElementById(iconId);
    if (!card || !desc || !icon) return;

    // ensure bootstrap collapse instance (do not auto-toggle)
    const bsCollapse = new bootstrap.Collapse(desc, { toggle: false });

    function open() {
      closeAll(descId);
      bsCollapse.show();
      card.setAttribute('aria-expanded', 'true');
      icon.classList.add('rotated');
      card.classList.add('active');
    }
    function close() {
      bsCollapse.hide();
      card.setAttribute('aria-expanded', 'false');
      icon.classList.remove('rotated');
      card.classList.remove('active');
    }
    function toggle() {
      const expanded = card.getAttribute('aria-expanded') === 'true';
      if (expanded) close();
      else open();
    }

    // click toggles
    card.addEventListener('click', (e) => {
      // ignore clicks inside links or button elements inside card if any
      const tag = e.target.tagName.toLowerCase();
      if (tag === 'a' || tag === 'button') return;
      toggle();
    });

    // keyboard accessibility: Enter or Space toggles
    card.addEventListener('keydown', (e) => {
      if (e.code === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        toggle();
      }
    });

    // when collapse hidden/shown via other APIs update state (keeps icon in sync)
    desc.addEventListener('hidden.bs.collapse', () => {
      card.setAttribute('aria-expanded', 'false');
      icon.classList.remove('rotated');
      card.classList.remove('active');
    });
    desc.addEventListener('shown.bs.collapse', () => {
      card.setAttribute('aria-expanded', 'true');
      icon.classList.add('rotated');
      card.classList.add('active');
    });
  }

  // Initialize both cards
  initMembership('foundationCard', 'foundationDesc', 'foundationIcon');
  initMembership('economyCard', 'economyDesc', 'economyIcon');

  /* CONTACT FORM validation (bootstrap pattern) */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      if (!contactForm.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
        contactForm.classList.add('was-validated');
        return;
      }
      // Demo: hide modal and show success toast (or alert)
      e.preventDefault();
      // hide modal
      const contactModalEl = document.getElementById('contactModal');
      const contactModal = bootstrap.Modal.getInstance(contactModalEl) || new bootstrap.Modal(contactModalEl);
      contactModal.hide();
      // simple feedback - you can replace with a toast or UI element
      // Use setTimeout to allow modal to finish hiding animation
      setTimeout(() => alert('Thanks! Your message was sent.'), 200);
    });
  }

  /* close open collapse when resizing to desktop so layout remains consistent */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // close all on large desktop widths if desired:
      if (window.innerWidth >= 992) closeAll();
    }, 150);
  });
});