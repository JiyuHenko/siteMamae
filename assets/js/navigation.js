export function initNavigation() {
  const button = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.mobile-nav');
  const header = document.querySelector('.site-header');
  const mobile = matchMedia('(max-width: 760px)');
  const close = (restoreFocus = false) => {
    if (!button || !nav) return;
    nav.hidden = true;
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Abrir menu');
    if (restoreFocus) button.focus();
  };
  button?.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    nav.hidden = !open;
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => close()));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav && !nav.hidden) close(true);
  });
  document.addEventListener('click', event => {
    if (nav && !nav.hidden && !header.contains(event.target)) close();
  });
  header?.addEventListener('focusout', event => {
    if (event.relatedTarget && !header.contains(event.relatedTarget)) close();
  });
  mobile.addEventListener('change', () => { if (!mobile.matches) close(); });
  let pending = false;
  const updateHeader = () => { header?.classList.toggle('is-scrolled', scrollY > 12); pending = false; };
  addEventListener('scroll', () => {
    if (!pending) { pending = true; requestAnimationFrame(updateHeader); }
  }, { passive: true });
  updateHeader();
  // Real anchors retain native URL, keyboard and no-JavaScript behavior.
  if ('IntersectionObserver' in window) {
    const links = [...document.querySelectorAll('.desktop-nav a')].filter(link => link.hash && link.pathname === location.pathname);
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        links.forEach(link => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    }, { rootMargin: '-20% 0px -55% 0px', threshold: 0 });
    links.forEach(link => { const section = document.getElementById(decodeURIComponent(link.hash.slice(1))); if (section) observer.observe(section); });
  }
}
