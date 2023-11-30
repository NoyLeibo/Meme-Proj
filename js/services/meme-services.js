'use strict'

function coverCanvasWithImg() {
    const elImg = new Image()
    elImg.src = `imgs/${gMeme.selectedImgId}.jpg`
    elImg.onload = () => {
        gElCtx .drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
    }
    drawText()
}

function drawText() {
    gElCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height); // מחיקת הקאנווס
    const elImg = new Image();
    elImg.src = `imgs/${gMeme.selectedImgId}.jpg`;
    elImg.onload = () => {
        gElCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight);
        gElCtx.beginPath();
        gElCtx.lineWidth = 2;
        gElCtx.strokeStyle = gMeme.lines[0].color;
        gElCtx.font = gMeme.lines[0].size + 'px Arial';
        gElCtx.textBaseline = 'middle';
        gElCtx.fillText(gMeme.lines[0].txt, 200, 40);
        gElCtx.strokeText(gMeme.lines[0].txt, 200, 40);
    };
}


function updateTxt(msg) {
    const msgCapitalize = capitalize(msg);
    gMeme.lines[0].txt = msgCapitalize;
    drawText();
}

function capitalize(txt) {
    return txt.charAt(0).toUpperCase() + txt.substring(1)
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    reader.onload = function (event) {
        let img = new Image() 
        img.src = event.target.result 
        img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0])   
}