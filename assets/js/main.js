import { initNavigation } from './navigation.js';
import { initMotion } from './motion.js';
import { initCareTabs } from './tabs.js';
import { initContact } from './contact.js';

// Independent enhancements: a failure must never take the document offline.
for (const init of [initNavigation, initMotion, initCareTabs, initContact]) {
  try { init(); } catch (error) { console.error(`Unable to initialize ${init.name}`, error); }
}
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = String(new Date().getFullYear()); });
