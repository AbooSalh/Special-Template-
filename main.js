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
