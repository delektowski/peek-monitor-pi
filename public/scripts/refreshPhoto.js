const getPhotoElement = document.querySelector("#photo");

function refreshPhoto() {
  const timestamp = new Date().getTime();
  const imgSrc = "../public/photo.jpg";
  const queryString = "?t=" + timestamp;
  getPhotoElement.src = imgSrc + queryString;
}

setInterval(refreshPhoto, 7500);
