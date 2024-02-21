// check if there is local storage color
let mainColor = localStorage.getItem("color_option");
if (mainColor != null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  document.querySelectorAll(".colors-list li").forEach((e) => {
    // remove active from all li
      e.classList.remove("active");
    // add active class
    if(e.dataset.color == mainColor) {
      e.classList.add("active");
      console.log(e);
    }
  });
}
// toggle gear
document.querySelector(".toggle-settings i").onclick = function () {
  this.classList.toggle("fa-spin");
  this.parentElement.classList.toggle("active");
  this.parentElement.parentElement.classList.toggle("open");
};
// switch color
const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    // set color on Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // set color on localStorage
    localStorage.setItem("color_option", e.target.dataset.color);
    // remove active from all li
    e.target.parentElement.querySelectorAll(".active").forEach((ele) => {
      ele.classList.remove("active");
    });
    // add active class
    e.target.classList.add("active");
  });
});
// select landing page elements
let landingPage = document.querySelector(".landing");
// get array of imgs
let imgs = [];
let imgsLength = 10;
// auto pushing imgs into array
for (let i = 1; i <= 10; i++) {
  if (i < 10) {
    imgs.push(`0${i}.jpg`);
  } else {
    imgs.push(`${i}.jpg`);
  }
}
// change background img

setInterval(() => {
  // get random nuumber
  let randomNumber = Math.floor(Math.random() * imgs.length);
  landingPage.style.backgroundImage = `url("../imgs/${imgs[randomNumber]}")`;
}, 10000);
