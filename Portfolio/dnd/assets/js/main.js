const skillPointCounter = (event) => {
  event.preventDefault();
  const skill = event.currentTarget;
  if (!skill.dataset.skillPoints || skill.getAttribute("active") === null)
    return;
  const skillPoints = skill.dataset.skillPoints.match(/(\d)\/(\d)/);
  const maxPoints = +skillPoints[2];
  const currPoints =
    event.type === "click" ? ++skillPoints[1] : --skillPoints[1];

  if (0 <= currPoints && currPoints <= maxPoints) {
    skill.dataset.skillPoints = `${currPoints}/${maxPoints}`;
  }

  document
    .querySelectorAll(`.skill[data-skill-id^="${skill.dataset.skillId}."`)
    .forEach((nextSkill) =>
      currPoints === maxPoints
        ? nextSkill.setAttribute("active", "")
        : nextSkill.removeAttribute("active")
    );
};

document.querySelectorAll(".skill").forEach((skill) => {
  skill.addEventListener("click", skillPointCounter);
  skill.addEventListener("contextmenu", skillPointCounter);
});

// const buffer_to_hex = (buffer) =>
//   Array.prototype.map
//     .call(buffer, function (val) {
//       var hex = val.toString(16).toUpperCase();
//       if (val < 16) hex = "0" + hex;
//       return hex;
//     })
//     .join("");

// const hex_to_buffer = (string) =>
//   string
//     .match(/.{2,2}/g)
//     .filter((chr) => chr !== "")
//     .map((chr) => parseInt(chr, 16));

// var buffer = window.msgpack.encode({ foo: "bar" });
// var hex = buffer_to_hex(buffer);
// var data = window.msgpack.decode(hex_to_buffer(hex));
// console.log(hex);
// console.log(data);
