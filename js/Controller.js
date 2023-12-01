"use strict";
var gLocalMemes


function onInit() {
  onRenderGallery();
  gLocalMemes = getMemes()

  // addListeners() להחזיר כשתרצה לתקן את התזוזה של הטקסט
  
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
}

function onRenderGallery() {
  const imgs = getImgs();
  let elImgs = document.querySelector(".imgs");
  let strHtml = imgs.map((img) => {
      return `<img onclick="onImgClick(${img.id})" src="${img.url}">`;
    })
    .join("");
  elImgs.innerHTML = strHtml;
}

function onAddEmoji(elEmoji){
    addEmoji(elEmoji.src)
}

function onUploadImg() {
    uploadImg()
}

function onDownloadImg(elLink) {
  const imgContent = gElCanvas.toDataURL("image/jpeg"); // image/jpeg the default format
  elLink.href = imgContent;
}

function onImgClick(imgId) {
  let elEditMeme = document.querySelector('.edit-meme')
  elEditMeme.style.display = 'block'
  let canvas = document.getElementById('canvas');
  canvas.style.display = 'block';
  displayGallery(imgId);
  onRenderMeme();
}

function onRenderMeme() {
    coverCanvasWithImg();
  // let elMeme = document.querySelector('.meme')
}

function onInput(msg) {
    updateTxt(msg.value);
}

function onImgInput(ev) {
  loadImageFromInput(ev, renderImg);
}

function renderImg(img) {
  // Draw the img on the canvas
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function onFontSizeP(){
  changeFontSize('+')
}

function onFontSizeM(){
  changeFontSize('-')
}

function onSaveMeme(){
  console.log(gLocalMemes);
  saveToStorage(IMAGES_STORAGE_KEY, gLocalMemes.toDataURL())
}

function onMouseClick(ev){
  mouseClick(ev)
}