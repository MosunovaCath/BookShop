export const setActiveSliderNav = (buttons, index) => {
  buttons.forEach((btn, i) => {
    if (i === index) {
      btn.classList.add("slider-nav__item-active");
    } else {
      btn.classList.remove("slider-nav__item-active");
    }
  });
};
