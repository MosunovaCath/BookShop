import { setActiveSliderNav } from "./sliderNav.js";

export const changeSlide = (index, data, sliderItem, sliderBts) => {
  sliderItem.innerHTML = data[index];
  setActiveSliderNav(sliderBts, index);
};
