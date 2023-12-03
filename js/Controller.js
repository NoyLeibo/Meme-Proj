"use strict";

var gLocalMemes;
var gElEditMeme = document.querySelector(".meme");
var gCanvas = document.querySelector("canvas");
var gSavedMemes = document.querySelector(".saved-memes")


function onInit() {
  onRenderGallery();
  gElEditMeme.classList.add("hidden");
  gElCanvas.classList.add("hidden");
  gSavedMemes.classList.add("hidden");

  // addListeners() להחזיר כשתרצה לתקן את התזוזה של הטקסט
  // resizeCanvas();
  // window.addEventListener("resize", resizeCanvas);
}

function onRenderGallery() {
  renderGallery();
}

function onAddEmoji(elEmoji) {
  addEmoji(elEmoji.src);
}

function onUploadImg() {
  // Uploading to facebook
  uploadImg();
}

function onDownloadImg(elLink) {
  const imgContent = gElCanvas.toDataURL("image/jpeg"); // image/jpeg the default format
  elLink.href = imgContent;
}

function onSerachInput(elText) {
  searchKeys(elText.value);
}

function onImgClick(imgId) {
  gMemeSaved = false
  gMemeShown = true
  gCurrMeme = newMeme()
  displayGallery(imgId);
  onRenderMeme();
  
  gElEditMeme.classList.remove("hidden");
  gCanvas.classList.remove("hidden");
}

function onOpenSavedMeme(Id){
  gMemeSaved = false
  gMemeShown = true
  // console.log(gLocalMemes[Id]);
  coverCanvasWithSavedMeme(gLocalMemes[Id][1])
  turnOffGallery()
  // displayGallery(imgId);
}

function onClickGallery() {
  turnOnGallery();
}

function turnOnGallery() {
  gMainGallery = true;
  changeMainGallery();
}

function turnOffGallery() {
  gMainGallery = false;
  changeMainGallery();
}

function changeMainGallery() {
  if (gMainGallery) {
    gElMainGallery.classList.remove("hidden");
    gElEditMeme.classList.add("hidden");
    gElCanvas.classList.add("hidden");
    gSavedMemes.classList.add("hidden");
  } 
  else if (gMemeShown) {
    gElMainGallery.classList.add("hidden");
    gSavedMemes.classList.add("hidden");
    gElEditMeme.classList.remove("hidden");
    gElCanvas.classList.remove("hidden");
  } 
  else if (gMemeSaved) {
    gElMainGallery.classList.add("hidden");
    gSavedMemes.classList.remove("hidden");
    gElEditMeme.classList.add("hidden");
    gElCanvas.classList.add("hidden");
  }
}

function onClickAbout() {
  turnOffGallery();
}

function onClickMemes() {
  gMemeSaved = true
  gMemeShown = false
  turnOffGallery();
  const imgs = gLocalMemes.map((dataUrl, Idx) => {
    const img = `<img src="${dataUrl[0]}" data-saved-meme-id="${Idx}" onclick="onOpenSavedMeme(this.dataset.savedMemeId)"/>`
    return img
  }).join('')
  document.querySelector(".saved-imgs").innerHTML = imgs;
}

function onRenderMeme() {
  coverCanvasWithImg();
  // let elMeme = document.querySelector('.meme')
}

function onRemoveLine() {
  removeSelectedLine();
}

function onColorText(ev){
  gSelectedColor = ev.target.value
  drawText()
}
function onInspectText(inspect){
  gSelectedInspect = inspect
  drawText()

}
function onInput(msg) {
  updateTxt(msg.value);
}

function onMoveLine() {
  // moving to the next line
  moveToNextLine();
}

// function onImgInput(ev) { // upload img to meme
//   loadImageFromInput(ev, renderImg);
// }

function renderImg(img) {
  // Draw the img on the canvas
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function onFontSizeP() {
  changeFontSize("+");
}

function onFontSizeM() {
  changeFontSize("-");
}

function onSaveMeme() {
  gLocalMemes = getMemes()
  if (!gLocalMemes || !gLocalMemes.length) gLocalMemes = []

  const dataUrl = gCanvas.toDataURL("image/jpeg", 1.0);
  gLocalMemes.push([dataUrl, gCurrMeme]);
  console.log(gLocalMemes);
  saveToStorage(IMAGES_STORAGE_KEY, gLocalMemes);
}

function onDownloadCanvas(elLink) {
  const dataUrl = gCanvas.toDataURL();
  elLink.href = dataUrl;
  elLink.download = "my-img";
}

function onMouseClick(ev) {
  mouseClick(ev);
}

function onSetCentering(centeringPlace) {
  setCentering(centeringPlace);
}
