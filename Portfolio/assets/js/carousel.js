(function () {
  const carousel = document.querySelector(".carousel");
  const slides = carousel.querySelectorAll(".slides li");
  const controls = carousel.appendChild(
    document.createElement("div")
  );
  controls.classList.add("controls");
  controls.innerHTML = `
    <span class="numbertext"></span>
    
    <a class="prev">&#10094;</a>
    <a class="next">&#10095;</a>

    <h5 class="text"></h5>
    <ul class="dots"></ul>
  `;
  slides.forEach(() =>
    carousel
      .querySelector(".dots")
      .appendChild(document.createElement("li"))
  );
  const dots = carousel.querySelectorAll(".dots li");

  let slideIndex = 1;

  const plusSlides = (n) => showSlides((slideIndex += n));
  const setCurrentSlide = (n) => showSlides((slideIndex = n));

  const showSlides = (n) => {
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    controls.querySelector(".text").textContent = slides[
      slideIndex - 1
    ].querySelector("img").alt;
    controls.querySelector(
      ".numbertext"
    ).textContent = `${slideIndex}/${slides.length}`;
    slides.forEach(
      (slide, i) =>
        (slide.style.display = i === slideIndex - 1 ? "flex" : "")
    );
    dots.forEach((dot, i) => {
      const activeClassName = "active";
      if (i === slideIndex - 1)
        return dot.classList.add(activeClassName);
      dot.classList.remove(activeClassName);
    });
  };

  controls
    .querySelector(".prev")
    .addEventListener("click", () => plusSlides(-1));
  controls
    .querySelector(".next")
    .addEventListener("click", () => plusSlides(+1));
  dots.forEach((dot, i) =>
    dot.addEventListener("click", () => setCurrentSlide(i + 1))
  );
  showSlides(slideIndex);
})();
