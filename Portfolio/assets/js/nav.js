new (class {
  /**
   * @type {Document}
   * @readonly
   */
  get document() {
    return this.global.document;
  }

  /**
   * @type {HTMLAsideElement}
   * @readonly
   */
  get menu() {
    return this.document.querySelector(".page + aside");
  }

  /**
   * @type {(NodeListOf<HTMLAnchorElement>)}
   * @readonly
   */
  get portfolioLinks() {
    return this.document.querySelectorAll(".portfolio__link");
  }

  /**
   * @type {(NodeListOf<HTMLElement>)}
   * @readonly
   */
  get portfolioLinkCaptions() {
    return this.document.querySelectorAll(".portfolio__link figcaption");
  }

  /**
   * @type {boolean}
   * @readonly
   */
  get isTouchDevice() {
    return (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0));
  }

  /**
   * Anonymous class, to manage scoping and share global context.
   *
   * @param global {Window}
   */
  constructor(global) {
    this.global = global;

    this.addEventListeners();
  }

  addEventListeners() {
    this.menu.addEventListener("click", this.toggleMenuOpen);

    this.portfolioLinks.forEach(pl =>
      pl.addEventListener('click', this.doubleTapCaptionsOnMobile));
  }

  /**
   * @param {Event} event
   * @returns {void}
   */
  toggleMenuOpen = event => event.currentTarget.classList.toggle("menu--open");

  /**
   * Allow viewing of portfolio project descriptions on touch screens.
   *
   * @param {Event} event
   */
  doubleTapCaptionsOnMobile = event => {
    /** @type HTMLElement */
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
