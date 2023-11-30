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
    document.getElementById('text1').value = gMeme.lines[0].txt

    gElCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height); // מחיקת הקאנווס
    const elImg = new Image();
    elImg.src = `imgs/${gMeme.selectedImgId}.jpg`;
    elImg.onload = () => {
        gElCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight);
        gElCtx.beginPath();
        gElCtx.lineWidth = 2;
        gElCtx.strokeStyle = gMeme.lines[0].color;
        gElCtx.font = 'bold ' + gMeme.lines[0].size + 'px poppinsRegular';
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

function addEmoji(emojiSrc) {
    switch (true) {
        case (emojiSrc.includes('Emoji1')):
            gMeme.lines[0].txt += '🤪'
            break;
        case (emojiSrc.includes('Emoji2')):
            gMeme.lines[0].txt += '😄'
            break;
        case (emojiSrc.includes('Emoji3')):
            gMeme.lines[0].txt += '🤯'
            break;
        case (emojiSrc.includes('Emoji4')):
            gMeme.lines[0].txt += '😣'
            break;    
    }
    drawText();
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

function onUploadImg() {
    // Gets the image from the canvas
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg') 

    function onSuccess(uploadedImgUrl) {
        // Handle some special characters
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }
    
    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}

// Upload the image to a server, get back a URL 
// call the function onSuccess when done
function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    // Send a post req with the image to the server
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        // If the request is not done, we have no business here yet, so return
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        // if the response is not ok, show an error
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR
        // Same as
        // const url = XHR.responseText

        // If the response is ok, call the onSuccess callback function, 
        // that will create the link to facebook using the url we got
        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}