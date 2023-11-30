'use strict'


function onInit(){
    onRenderGallery()
}

function onRenderGallery(){
    const imgs = getImgs();
    let elImgs = document.querySelector(".imgs");

    let strHtml = imgs.map((img) => {
        return (`<img onclick="onImgClick(${img.id})" src="${img.url}">`)
    }).join('')
    elImgs.innerHTML = strHtml
}

function onImgClick(imgId){
    displayGallery(imgId)
    onRenderMeme(imgId)
}

function onRenderMeme(imgId){
    coverCanvasWithImg(imgId)
    // let elMeme = document.querySelector('.meme')
}

function onInput(msg){
    drawText(msg.value)
}

function onUpload(){
    
}