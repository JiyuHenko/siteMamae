export function initMotion() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 761px)');
  const reveals = [...document.querySelectorAll('[data-reveal]')];
  let revealObserver;
  if (!reduce.matches && 'IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
      });
    }, { threshold: .09 });
    reveals.forEach(el => { el.classList.add('reveal-ready'); revealObserver.observe(el); });
  }
  const hero = document.querySelector('.hero');
  const photo = document.querySelector('.hero-photo');
  const frame = document.querySelector('[data-hero-frame]');
  const seal = document.querySelector('.hero-seal');
  const steps = [...document.querySelectorAll('[data-step]')];
  const progress = document.querySelector('.orbit-progress');
  const stepLabel = document.querySelector('.orbit-step');
  let pending = false;
  let active = 1;
  const reset = () => { [photo, frame, seal].forEach(el => el?.style.removeProperty('transform')); };
  const render = () => {
    pending = false;
    if (reduce.matches || !desktop.matches) { reset(); return; }
    if (hero && photo && frame && seal) {
      const rect = hero.getBoundingClientRect();
      if (rect.bottom > 0) {
        const p = Math.min(1, Math.max(0, -rect.top / rect.height));
        photo.style.transform = `translateY(${-24 + p * 44}px)`;
        frame.style.transform = `scale(${1 - p * .025})`;
        seal.style.transform = `rotate(${-14 + p * 28}deg)`;
      }
    }
    if (steps.length && progress && stepLabel) {
      const targetY = innerHeight * .55;
      let closest = steps[0];
      let distance = Infinity;
      for (const step of steps) {
        const rect = step.getBoundingClientRect();
        const d = Math.abs(rect.top + rect.height * .45 - targetY);
        if (d < distance) { distance = d; closest = step; }
      }
      const current = Number(closest.dataset.step);
      if (active !== current) {
        active = current;
        stepLabel.textContent = String(current).padStart(2, '0');
        progress.style.strokeDashoffset = String(1 - current / 3);
        steps.forEach(step => step.classList.toggle('is-current', step === closest));
      }
    }
  };
  const requestRender = () => { if (!pending) { pending = true; requestAnimationFrame(render); } };
  addEventListener('scroll', requestRender, { passive: true });
  addEventListener('resize', requestRender, { passive: true });
  reduce.addEventListener('change', () => {
    if (reduce.matches) { revealObserver?.disconnect(); reveals.forEach(el => el.classList.add('is-visible')); reset(); progress?.style.removeProperty('stroke-dashoffset'); }
    requestRender();
  });
  desktop.addEventListener('change', requestRender);
  render();
}
