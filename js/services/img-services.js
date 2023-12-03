"use strict";

const LEFT_SIDE = 320 // x
const CENTER_SIDE = 150 // x | y
const RIGHT_SIDE = 20 // x
const UP_SIDE = 40 // y
const DOWN_SIDE = 450 // y
const IMAGES_STORAGE_KEY = "imagesDB";

var gImgCount = 18; // imgs number
var gImgs = [
  { id: 1, url: `imgs/${1}.jpg`, keywords: ["funny", "man"] },
  { id: 2, url: `imgs/${2}.jpg`, keywords: ["cute", "animal"] },
  { id: 3, url: `imgs/${3}.jpg`, keywords: ["funny", "cute","baby", "animal"] },
  { id: 4, url: `imgs/${4}.jpg`, keywords: ["cute", "animal"] },
  { id: 5, url: `imgs/${5}.jpg`, keywords: ["funny", "cute", "baby"] },
  { id: 6, url: `imgs/${6}.jpg`, keywords: ["funny", "man"] },
  { id: 7, url: `imgs/${7}.jpg`, keywords: ["funny", "cute","baby"] },
  { id: 8, url: `imgs/${8}.jpg`, keywords: ["funny", "man"] },
  { id: 9, url: `imgs/${9}.jpg`, keywords: ["funny","baby"] },
  { id: 10, url: `imgs/${10}.jpg`, keywords: ["funny", "man"] },
  { id: 11, url: `imgs/${11}.jpg`, keywords: ["man"] },
  { id: 12, url: `imgs/${12}.jpg`, keywords: ["man"] },
  { id: 13, url: `imgs/${13}.jpg`, keywords: ["funny"] },
  { id: 14, url: `imgs/${14}.jpg`, keywords: ["man"] },
  { id: 15, url: `imgs/${15}.jpg`, keywords: ["man"] },
  { id: 16, url: `imgs/${16}.jpg`, keywords: ["funny", "man"] },
  { id: 17, url: `imgs/${17}.jpg`, keywords: ["man"] },
  { id: 18, url: `imgs/${18}.jpg`, keywords: ["funny"] },
]

var gKeywordSearchCount = ['funny', 'man', 'cute', 'animal', 'baby']
var gElEditMeme = document.querySelector(".edit-meme")
var gElMainGallery = document.querySelector(".main-gallery")
var gAboutPage = false
var gMainGallery = true
var gMemeSaved = false
var gMemeShown = false
var gSelectedColor = 'black'
var gSelectedInspect = 'poppinsLight'
var gElCanvas = document.querySelector("canvas")
var gElCtx = gElCanvas.getContext("2d")

var gMeme = newMeme()
var gCurrMeme

function getImgs() {
  return gImgs
}
function newMeme(){
  return {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
      { txt: "CAN'T GET FIRED", size: 20, color: gSelectedColor, x: CENTER_SIDE, y: UP_SIDE},
      { txt: "IF YOU DONAT HAVE A JOB", size: 20, color: gSelectedColor, x: CENTER_SIDE, y: DOWN_SIDE }
    ],
  }
}
function searchKeys(inputKey) {
  console.log(inputKey);
  const keySearch = gImgs.filter(function (img) {
    return img.keywords.some(function (keyword) {
      return keyword.startsWith(inputKey)
    })
  })

  if (keySearch.length > 0) renderSearchMap(keySearch)
  else renderGallery
}

function displayGallery(imgId) {
  gCurrMeme.selectedImgId = imgId
  console.log(gCurrMeme);
  turnOffGallery()
}

function renderSearchMap(imgsToShown){
  let elImgs = document.querySelector(".imgs");
  let strHtml = imgsToShown.map((img) => {
      return `<img onclick="onImgClick(${img.id})" src="${img.url}">`;
    })
    .join("");
  elImgs.innerHTML = strHtml;
}

function renderGallery() {
  gElEditMeme.classList.remove("hidden")
  gElCanvas.classList.remove("hidden")
  const imgs = getImgs()
  let elImgs = document.querySelector(".imgs")
  let strHtml = imgs.map((img) => {
      return `<img onclick="onImgClick(${img.id})" src="${img.url}">`
    })
    .join("")
  elImgs.innerHTML = strHtml
}