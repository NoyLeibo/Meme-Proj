"use strict";

const IMAGES_STORAGE_KEY = 'imagesDB'
var gImgCount = 18; // imgs number
var gImgs = [
  { id: 1, url: `imgs/${1}.jpg`, keywords: ["funny", "cat"] },
  { id: 2, url: `imgs/${2}.jpg`, keywords: ["funny", "cat"] },
  { id: 3, url: `imgs/${3}.jpg`, keywords: ["funny", "cat"] },
  { id: 4, url: `imgs/${4}.jpg`, keywords: ["funny", "cat"] },
  { id: 5, url: `imgs/${5}.jpg`, keywords: ["funny", "cat"] },
  { id: 6, url: `imgs/${6}.jpg`, keywords: ["funny", "cat"] },
  { id: 7, url: `imgs/${7}.jpg`, keywords: ["funny", "cat"] },
  { id: 8, url: `imgs/${8}.jpg`, keywords: ["funny", "cat"] },
  { id: 9, url: `imgs/${9}.jpg`, keywords: ["funny", "cat"] },
  { id: 10, url: `imgs/${10}.jpg`, keywords: ["funny", "cat"] },
  { id: 11, url: `imgs/${11}.jpg`, keywords: ["funny", "cat"] },
  { id: 12, url: `imgs/${12}.jpg`, keywords: ["funny", "cat"] },
  { id: 13, url: `imgs/${13}.jpg`, keywords: ["funny", "cat"] },
  { id: 14, url: `imgs/${14}.jpg`, keywords: ["funny", "cat"] },
  { id: 15, url: `imgs/${15}.jpg`, keywords: ["funny", "cat"] },
  { id: 16, url: `imgs/${16}.jpg`, keywords: ["funny", "cat"] },
  { id: 17, url: `imgs/${17}.jpg`, keywords: ["funny", "cat"] },
  { id: 18, url: `imgs/${18}.jpg`, keywords: ["funny", "cat"] },]

var gMainGallery = true
var gElCanvas = document.querySelector('canvas')
var gElCtx = gElCanvas.getContext('2d')

var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [{ txt: "CAN'T GET FIRED", size: 30, color: "white" }, { txt: "IF YOU DONAT HAVE A JOB", size: 30, color: "white" }],
};
// var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 };

function getImgs() {
  return gImgs
}

function displayGallery(imgId){
    gMeme.selectedImgId = imgId
    changeMainGallery()
}

function changeMainGallery(){
    gMainGallery = !gMainGallery
    if (gMainGallery) document.querySelector('.main-gallery').style.display = 'block'
    else document.querySelector('.main-gallery').style.display = 'none'
}