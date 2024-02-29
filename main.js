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
  this.parentElement.parentElement.classList.toggle("h-zIndex");
  if (document.querySelector(".popup-overlay") == null) {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    // append the overlay to the body
    document.body.appendChild(overlay);
  } else {
    document.querySelector(".popup-overlay").remove();
    toggleGear();
  }
};
// close toggle gear
document.querySelector(".overlay").addEventListener("click", toggleGear);
document.querySelectorAll("section").forEach((e) => {
  e.addEventListener("click", toggleGear);
});
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
    // Active state handler
    handleActive(e);
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
    // Active state handler
    handleActive(e);
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

// select skills selector
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  // skills offset
  let skillOffsetTop = ourSkills.offsetTop;
  // outer hight
  let skillsOuterHeight = ourSkills.offsetHeight;
  // window hight
  let windowHight = this.innerHeight;
  // window scrollTop
  let windowScrollTop = this.pageYOffset;
  if (
    windowScrollTop > skillOffsetTop - windowHight &&
    windowScrollTop < skillOffsetTop + skillsOuterHeight
  ) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });

    // the percentage
    const skillsPercentage = document.querySelectorAll(
      ".skill-progress .percentage"
    );
    skillsPercentage.forEach((skill) => {
      currentPercent = skill.parentElement
        .querySelector("span")
        .dataset.progress.slice(0, 2);
      displayNumbersWithDelay(currentPercent, skill, 40);
    });
  }
};

function displayNumbersWithDelay(number, element, delay) {
  let i = 1;
  const intervalId = setInterval(() => {
    if (i <= number) {
      element.textContent = i + "%";
      i++;
    } else {
      clearInterval(intervalId);
    }
  }, delay);
}
// create popup with the Image
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create overlay element
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    // append the overlay to the body
    document.body.appendChild(overlay);
    let popupBox = document.createElement("div");
    // add class to the popup box
    popupBox.className = "popup-box";
    if (img.alt !== null) {
      // create heading
      let imgHeading = document.createElement("h3");
      // create text for the heading
      let imgText = document.createTextNode(img.alt);
      imgHeading.appendChild(imgText);
      // append the heading to the popup box
      popupBox.appendChild(imgHeading);
    }
    // creat the img
    let popupImg = document.createElement("img");
    popupImg.src = img.src;
    // add img to popup box
    popupBox.appendChild(popupImg);
    // append the popup box to body
    document.body.appendChild(popupBox);
    // create close button
    let closeButton = document.createElement("span");
    // create close button txt
    let closeButtonText = document.createTextNode("X");
    // append txt to close button
    closeButton.appendChild(closeButtonText);
    // add class to close btn
    closeButton.className = "close-button";
    // add close button to popup box
    popupBox.appendChild(closeButton);
  });
});
// close the popup box
document.addEventListener("click", (e) => {
  if (
    e.target.className == "close-button" ||
    e.target.className == "popup-overlay" ||
    e.target.className == "toggle-settings"
  ) {
    document.querySelectorAll(".popup-box").forEach((ele) => {
      ele.remove();
    });
    // remove overlay
    document.querySelector(".settings-box").classList.remove("h-zIndex");
    document.querySelector(".popup-overlay").remove();
    toggleGear();
  }
});

// seclect all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".landing ul li a");
function scrollToSection(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSection(allBullets);
scrollToSection(allLinks);

// handle active state
function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });
  // add active class
  ev.target.classList.add("active");
}
