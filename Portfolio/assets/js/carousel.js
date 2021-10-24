(function () {
  const carousel = document.querySelector(".carousel");
  const slides = carousel.querySelectorAll(".slides li");
  const controls = carousel.appendChild(
    document.createElement("div")
  );
  controls.classList.add("controls");
  controls.innerHTML = `
    <a class="prev">&#10094;</a>
    <a class="next">&#10095;</a>

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
    slides.forEach(
      (slide, i) =>
        (slide.style.display = i === slideIndex - 1 ? "flex" : "")
    );
    dots.forEach(
      (dot, i) =>
        (dot.style.color = i === slideIndex - 1 ? "#717171" : "")
    );
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
