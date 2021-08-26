(function () {
  document.querySelector('.page + aside')
    .addEventListener('click', e => e.currentTarget.classList.toggle('menu-open'));
}());