// check if there is local storage color
let mainColor = localStorage.getItem("color_option");
if (mainColor != null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  document.querySelectorAll(".colors-list li").forEach((e) => {
    // remove active from all li
    e.classList.remove("active");
    // add active class
    if (e.dataset.color == mainColor) {
      e.classList.add("active");
    }
  });
}
//  background option
let backgroundOpt = true;
//  var to control the interval
let bgInterval;
// check if there is local storage random img
let randomImgLocal = localStorage.getItem("bg_option");
// check if random background is not empty
if (randomImgLocal != null) {
  if (randomImgLocal == "true") {
    backgroundOpt = true;
    randomImg();
  } else {
    backgroundOpt = false;
  }
  // remove active class
  document.querySelectorAll(".option-box span").forEach((e) => {
    e.classList.remove("active");
  });
  if (randomImgLocal == "true") {
    document.querySelector(".option-box .yes").classList.add("active");
  } else {
    document.querySelector(".option-box .no").classList.add("active");
  }
}
// toggle gear
document.querySelector(".toggle-settings i").onclick = function () {
  this.classList.toggle("fa-spin");
  this.parentElement.classList.toggle("active");
  this.parentElement.parentElement.classList.toggle("open");
};
// close toggle gear
document.querySelector(".overlay").addEventListener("click", toggleGear);
document.querySelector(".header").addEventListener("click", toggleGear);
function toggleGear() {
  document.querySelector(".toggle-settings").classList.remove("active");
  document.querySelector(".settings-box").classList.remove("open");
  document.querySelector(".toggle-settings i").classList.remove("fa-spin");
}
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
// switch random background
const randomBg = document.querySelectorAll(".option-box:nth-child(3) span");
// set the last background to the page to local
let imgIndex = "01.jpg";
let imgIndexLocal = localStorage.getItem("img_index");
randomBg.forEach((span) => {
  console.log(span);
  span.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((ele) => {
      ele.classList.remove("active");
    });
    // add active class
    e.target.classList.add("active");
    if (e.target.dataset.bolean == "true") {
      backgroundOpt = true;
      randomImg();
      localStorage.setItem("bg_option", true);
      localStorage.setItem("img_index", "01.jpg");
    } else {
      backgroundOpt = false;
      clearInterval(bgInterval);
      localStorage.setItem("bg_option", false);
      localStorage.setItem("img_index", imgIndex);
    }
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
function randomImg() {
  if (backgroundOpt == true) {
    bgInterval = setInterval(() => {
      // get random nuumber
      let randomNumber = Math.floor(Math.random() * imgs.length);
      landingPage.style.backgroundImage = `url("../imgs/${imgs[randomNumber]}")`;
      imgIndex = imgs[randomNumber];
    }, 10000);
  }
}
// add the last background to the page
landingPage.style.backgroundImage = `url("../imgs/${imgIndexLocal}")`;
