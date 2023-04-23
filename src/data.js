import myImage from "./images/illustration.svg";
import rockImg from "./images/banner_2.svg";
import checkImg from "./images/banner_3.svg";

const data = [
  `
        <div class="slider-start">
          <div class="slider-start-change">
            <a href="#" class="m-20 txt-black"><span>Change<br>
                old book<br>
                on new<br></span></a>
          </div>
          <div class="slider-start-top">
            <a href="#" class="m-20 txt-black"><span>top<br>
                100<br>
                books<br>
                2022</span></a>
          </div>
          <p class="slider-start__text">Black friday sale</p>
          <div class="slider-start-txt">
            <p class="text-top">up to</p>
            <p class="text-center">60</p>
            <p class="text-bottom">%</p>
          </div>
          <img src=${myImage} alt="illustration" class="m-auto slider-start__img" />
        </div>
  `,
  `<div class="slider-item-second" id="slider-item-second">
            <img src=${rockImg} alt="rock" class="rock-auto" />
            </div>`,
  `<div class="slider-item-third" id="slider-item-third">
            <img src=${checkImg} alt="check" class="check-auto" />
            </div>`,
];
export default data;
