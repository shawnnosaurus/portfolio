new (class {
  _slideIndex = 1;
  get slideIndex() {
    return this._slideIndex;
  }

  set slideIndex(v) {
    this._slideIndex = v || this._slideIndex;

    if (v > this.slides.length) this._slideIndex = 1;
    if (v < 1) this._slideIndex = this.slides.length;
  }

  get document() {
    return this.global.document;
  }

  /**
   * @type {HTMLElement}
   * @readonly
   */
  get carousel() {
    return this.document.querySelector(".carousel");
  }

  /**
   * @type {(NodeListOf<HTMLLIElement>)}
   * @readonly
   */
  get slides() {
    return this.carousel.querySelectorAll(".slides li");
  }

  /**
   * @type {HTMLElement}
   * @readonly
   */
  get controls() {
    let rtnControls = this.document.querySelector(".controls");

    if (!rtnControls?.querySelector(".dots")) {
      rtnControls = this.carousel.appendChild(
        this.document.createElement("div")
      );
      rtnControls.classList.add("controls");
      rtnControls.innerHTML = `
        <span class="numbertext"></span>
        
        <a tabindex="0" class="prev">&#10094;</a>
        <a tabindex="0" class="next">&#10095;</a>

        <h5 class="text"></h5>
        <ul class="dots"></ul>
      `;
    }

    return rtnControls;
  }

  /**
   * @type {HTMLLIElement[]}
   * @readonly
   */
  get dots() {
    let rtnDots = this.controls.querySelectorAll(".dots li");

    if (!rtnDots || rtnDots.length === 0) {
      const createDot = () => {
        const dot = this.document.createElement("li");
        dot.tabIndex = 0;
        return dot;
      };

      rtnDots = [...this.slides].map(() =>
        this.controls
          .querySelector(".dots")
          .appendChild(createDot())
      );
    }

    return rtnDots;
  }

  get currentSlide() {
    return this.slides[this.slideIndex - 1];
  }

  /**
   * Anonymous class, to manage scoping and share global context.
   *
   * @param global {Window}
   */
  constructor(global) {
    this.global = global;
    this.addEventListeners();
    this.showSlide();
  }

  addEventListeners() {
    this.controls
      .querySelector(".prev")
      .addEventListener("click", () => this.plusSlides(-1));

    this.controls
      .querySelector(".next")
      .addEventListener("click", () => this.plusSlides(+1));

    this.dots.forEach((dot, i) =>
      dot.addEventListener("click", () => this.setCurrentSlide(i + 1))
    );

    this.global.addEventListener("keydown", (event) => {
      switch (event.key.toUpperCase()) {
        case "ENTER":
          event.target.click();
          break;
        case "ARROWRIGHT":
          this.plusSlides(1);
          break;
        case "ARROWLEFT":
          this.plusSlides(-1);
          break;
        default:
          return;
      }
    });
  }

  plusSlides = (n) => this.showSlide((this.slideIndex += n));

  setCurrentSlide = (n) => this.showSlide((this.slideIndex = n));

  showSlide = (n) => {
    this.slideIndex = n;

    this.setActiveImage();
    this.setSlideCount();
    this.setDescription();
    this.setActiveDot();
  };

  setActiveImage = () => {
    const selectedSlide = this.carousel.querySelector(".selected");
    if (selectedSlide) selectedSlide.classList.remove("selected");
    this.currentSlide.classList.add("selected");
  };

  setSlideCount = () =>
    (this.controls.querySelector(
      ".numbertext"
    ).textContent = `${this.slideIndex}/${this.slides.length}`);

  setDescription = () =>
    (this.controls.querySelector(
      ".text"
    ).textContent = this.currentSlide.querySelector("img").alt);

  setActiveDot = () =>
    this.dots.forEach((dot, i) => {
      if (i === this.slideIndex - 1)
        return dot.classList.add("active");

      dot.classList.remove("active");
    });
})(window);
