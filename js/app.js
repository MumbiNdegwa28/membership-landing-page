document.addEventListener('DOMContentLoaded', () => {

  function initMembershipToggle(card, collapseId, iconId) {
    const collapseEl = document.getElementById(collapseId);
    const icon       = document.getElementById(iconId);
    if (!card || !collapseEl || !icon) return;

    const bsCollapse = new bootstrap.Collapse(collapseEl, { toggle: false });

    function toggle() {
      const isExpanded = card.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        bsCollapse.hide();
        card.setAttribute('aria-expanded', 'false');
        icon.classList.remove('rotated');
        card.classList.remove('active');
      } else {
        bsCollapse.show();
        card.setAttribute('aria-expanded', 'true');
        icon.classList.add('rotated');
        card.classList.add('active');
      }
    }

    card.addEventListener('click', toggle);
  }

  initMembershipToggle(
    document.getElementById('foundationCard'), 'foundationDesc', 'foundationIcon'
  );
  initMembershipToggle(
    document.getElementById('economyCard'), 'economyDesc', 'economyIcon'
  );

});