const menuToggle = document.querySelector('.menu-toggle');
const concertMenu = document.querySelector('#concert-menu');
const menuBackdrop = document.querySelector('.menu-backdrop');
function setMenuOpen(open, restoreFocus = false) {
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  concertMenu.hidden = !open;
  menuBackdrop.hidden = !open;
  if (restoreFocus) menuToggle.focus({ preventScroll: true });
}
menuToggle.addEventListener('click', () => {
  setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
});
menuBackdrop.addEventListener('click', () => setMenuOpen(false, true));
concertMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    setMenuOpen(false);
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  });
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !concertMenu.hidden) setMenuOpen(false, true);
});
document.addEventListener('focusin', event => {
  if (!concertMenu.hidden && !event.target.closest('.header')) setMenuOpen(false);
});
document.querySelector('.concert-brand').addEventListener('click', () => setMenuOpen(false));
