let currentId = 1;
const imagesArray = document.querySelectorAll(".photo_container");
let noOfImg = imagesArray.length;

let options = {
  threshold: 0.2,
}

let callback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > options.threshold) {
      galleryScroller();
      // console.log('hi')
    } else {
      clearTimeout(galleryTimeout);
      // console.log('hello')
    };
  })
}

let observer = new IntersectionObserver(callback, options);

let target = document.querySelector(".photos_grid");

observer.observe(target);


function galleryScroller() {
  // console.log(currentId)
  gallerySetter();
  galleryTimeout = setTimeout(() => {
    currentId = currentId == noOfImg ? 1 : currentId + 1;
    galleryScroller();
  }, 3000)
}

export function gallerySetter() {
  // console.log(noOfImg);
  let prevLeftId = (currentId - 2 <= 0) ? currentId + noOfImg - 2 : currentId - 2;
  let nextRightId = (currentId + 2 > noOfImg) ? currentId - noOfImg + 2 : currentId + 2;
  let leftId = (currentId - 1 <= 0) ? currentId + noOfImg - 1 : currentId - 1;
  let rightId = (currentId + 1 > noOfImg) ? currentId - noOfImg + 1 : currentId + 1;


  let currentImg = document.querySelector(`.img_id_${currentId}`);
  let leftImg = document.querySelector(`.img_id_${leftId}`);
  let rightImg = document.querySelector(`.img_id_${rightId}`);
  let prevLeftImg = document.querySelector(`.img_id_${prevLeftId}`);


  prevLeftImg.classList.remove("photo_container__left");
  currentImg.classList.remove("photo_container__left");
  currentImg.classList.remove("photo_container__right");
  leftImg.classList.remove("photo_container__right");
  leftImg.classList.remove("photo_container__show");
  rightImg.classList.remove("photo_container__left");
  rightImg.classList.remove("photo_container__show");



  currentImg.classList.add("photo_container__show");
  leftImg.classList.add("photo_container__left");
  rightImg.classList.add("photo_container__right");
}