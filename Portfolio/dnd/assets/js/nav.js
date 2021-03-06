const skillPointCounter = (event) => {
  event.preventDefault();
  const skill = event.currentTarget;
  if (
    !skill.dataset.skillPoints ||
    skill.getAttribute("active") === null
  )
    return;
  const skillPoints = skill.dataset.skillPoints.match(/(\d)\/(\d)/);
  const maxPoints = +skillPoints[2];
  const currPoints =
    event.type === "click" ? ++skillPoints[1] : --skillPoints[1];

  if (0 <= currPoints && currPoints <= maxPoints) {
    skill.dataset.skillPoints = `${currPoints}/${maxPoints}`;
  }

  document
    .querySelectorAll(
      `.skill[data-skill-id^="${skill.dataset.skillId}."`
    )
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
