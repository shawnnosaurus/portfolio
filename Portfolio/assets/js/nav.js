new (class {
  get document() {
    return this.global.document;
  }

  get menu() {
    return this.document.querySelector(".page + aside");
  }

  get portfolioLinks() {
    return this.document.querySelectorAll(".portfolio__link");
  }

  get portfolioLinkCaptions() {
    return this.document.querySelectorAll(".portfolio__link figcaption");
  }

  get isTouchDevice() {
    return (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0));
  }

  constructor(global) {
    this.global = global;

    this.addEventListeners();
  }

  addEventListeners() {
    this.menu.addEventListener("click", this.toggleMenuOpen);

    this.portfolioLinks.forEach(pl =>
      pl.addEventListener('click', this.doubleTapCaptionsOnMobile));
  }

  toggleMenuOpen = event => event.currentTarget.classList.toggle("menu--open");

  doubleTapCaptionsOnMobile = event => {
    const captionComponent = event.currentTarget.querySelector('figcaption');
    this.portfolioLinkCaptions.forEach(plc =>
      plc !== captionComponent ? plc.style.opacity = '' : '');

    if (this.isTouchDevice) {
      const captionHidden = !captionComponent.style.opacity;

      captionComponent.style.opacity = captionHidden ? '1' : '0';
      if (captionHidden) event.preventDefault();
    }
  };
})(window);
