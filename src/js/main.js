const hamburger = document.querySelector('.hamburger');
if (hamburger) {
  hamburger.addEventListener('click', function () {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    if (!hamburgerMenu) {
      return;
    }
    hamburgerMenu.classList.toggle('is-open');
  });
}
