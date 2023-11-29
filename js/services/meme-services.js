'use strict'

function coverCanvasWithImg(imgId) {
    let elCanvas = document.querySelector('canvas')
    let elCtx = elCanvas.getContext('2d')
    const elImg = new Image()

    elImg.src = `imgs/${imgId}.jpg`
    elImg.onload = () => {
        elCtx .drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
    }
}