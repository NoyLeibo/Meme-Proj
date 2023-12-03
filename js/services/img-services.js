"use strict";

const IMAGES_STORAGE_KEY = "imagesDB";
var gImgCount = 18; // imgs number
var gImgs = [
  { id: 1, url: `imgs/${1}.jpg`, keywords: ["funny", "man", "dz"] },
  { id: 2, url: `imgs/${2}.jpg`, keywords: ["cute", "animal"] },
  { id: 3, url: `imgs/${3}.jpg`, keywords: ["funny", "cute","baby", "animal"] },
  { id: 4, url: `imgs/${4}.jpg`, keywords: ["cute", "cat", "animal"] },
  { id: 5, url: `imgs/${5}.jpg`, keywords: ["funny", "cute", "baby"] },
  { id: 6, url: `imgs/${6}.jpg`, keywords: ["funny", "man"] },
  { id: 7, url: `imgs/${7}.jpg`, keywords: ["funny", "cute","baby"] },
  { id: 8, url: `imgs/${8}.jpg`, keywords: ["funny", "man"] },
  { id: 9, url: `imgs/${9}.jpg`, keywords: ["funny","baby", 'dz'] },
  { id: 10, url: `imgs/${10}.jpg`, keywords: ["funny", "man"] },
  { id: 11, url: `imgs/${11}.jpg`, keywords: ["man"] },
  { id: 12, url: `imgs/${12}.jpg`, keywords: ["man"] },
  { id: 13, url: `imgs/${13}.jpg`, keywords: ["funny"] },
  { id: 14, url: `imgs/${14}.jpg`, keywords: ["man"] },
  { id: 15, url: `imgs/${15}.jpg`, keywords: ["man"] },
  { id: 16, url: `imgs/${16}.jpg`, keywords: ["funny", "man"] },
  { id: 17, url: `imgs/${17}.jpg`, keywords: ["man"] },
  { id: 18, url: `imgs/${18}.jpg`, keywords: ["funny"] },
];
var gKeywordSearchCount = ['funny', 'man', 'cute', 'animal', 'cat', 'baby']
var gElEditMeme = document.querySelector(".edit-meme")
var gElMainGallery = document.querySelector(".main-gallery")
var gAboutPage = false
var gMainGallery = true
var gElCanvas = document.querySelector("canvas")
var gElCtx = gElCanvas.getContext("2d")

var gMeme = {
  selectedImgId: 0,
  selectedLineIdx: 1,
  lines: [
    { txt: "CAN'T GET FIRED", size: 30, color: "white" },
    { txt: "IF YOU DONAT HAVE A JOB", size: 30, color: "white" }
  ],
}

function getImgs() {
  return gImgs
}

function displayGallery(imgId) {
  gMeme.selectedImgId = imgId
  turnOffGallery()
}

function searchKeys(inputKey) {
  const keySearch = gImgs.filter(function (img) {
    return img.keywords.some(function (keyword) {
      return keyword.startsWith(inputKey)
    })
  })

  if (keySearch.length > 0) renderSearchMap(keySearch)
  else renderGallery
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

function renderAbout(){
  turnOffGallery()
  gElEditMeme.classList.add("hidden")
  gElCanvas.classList.add("hidden")
}