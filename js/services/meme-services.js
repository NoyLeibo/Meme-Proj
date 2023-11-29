'use strict'

function coverCanvasWithImg(imgId) {
    const elImg = new Image()
    elImg.src = `imgs/${imgId}.jpg`
    elImg.onload = () => {
        gElCtx .drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
    }
}

function drawText(msg){
    const msgCapitalize = capitalize(msg)
    gElCtx.lineWidth = 2
    gElCtx.strokeStyle = 'brown' // change it to what user want
    gElCtx.fillStyle = 'black'
    gElCtx.font = '30px Arial'
    gElCtx.textBaseline = 'middle'
    gElCtx.fillText(msg, 200, 40)
    gElCtx.strokeText(msg, 200, 40)
}

function capitalize(txt) {
    return txt.charAt(0).toUpperCase() + txt.substring(1)
}