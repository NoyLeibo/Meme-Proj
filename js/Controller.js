'use strict'


function onInit(){
    onRenderGallery()
}

function onRenderGallery(){
    const imgs = getImgs();
    let elImgs = document.querySelector(".imgs");
    console.log(imgs);
    let strHtml = imgs.map((imgPath) => {
        return (`<img onclick="onImgClick(this.src)" src="${imgPath.url}">`)
    }).join('')
    elImgs.innerHTML = strHtml
}

function onImgClick(elSelectImg){
    displayGallery()
    onRenderMeme(elSelectImg)
}

function onRenderMeme(selectedImg){
    let elMeme = document.querySelector('.meme')
}