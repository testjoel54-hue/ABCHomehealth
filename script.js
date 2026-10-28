const menu = document.querySelector('.menu');
const nav = document.querySelector('#navigation');
menu?.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open', !expanded);
});
const dropdown = document.querySelector('.nav-dropdown');
document.addEventListener('click', event => {
  if (dropdown && !dropdown.contains(event.target)) dropdown.open = false;
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    if (dropdown?.open) { dropdown.open = false; dropdown.querySelector('summary').focus(); }
    else if (nav?.classList.contains('open')) { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.focus(); }
  }
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false');
}));
document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());
document.querySelector('.print-guide')?.addEventListener('click', () => window.print());
