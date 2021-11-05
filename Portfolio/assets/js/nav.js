new (class {
  get document() {
    return this.global.document;
  }

  get menu() {
    return this.document.querySelector(".page + aside");
  }

  constructor(global) {
    this.global = global;
    this.addEventListeners();
  }

  addEventListeners() {
    this.menu.addEventListener("click", this.toggleMenuOpen);
  }

  toggleMenuOpen = (event) =>
    event.currentTarget.classList.toggle("menu--open");
})(window);
