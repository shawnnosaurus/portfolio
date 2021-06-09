(function () {
  const body = document.body,
    toggleMenu = _ =>
      body.hasAttribute('menu-open') ?
        body.removeAttribute('menu-open') :
        body.setAttribute('menu-open', '');

  document.querySelectorAll('.hamburger')
    .forEach(btn => btn.addEventListener('click', toggleMenu));
  document.querySelector('#menu')
    .addEventListener('click', toggleMenu);
}());