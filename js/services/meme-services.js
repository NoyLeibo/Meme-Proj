"use strict";

const TOUCH_EVS = ["touchstart", "touchmove", "touchend"];

function coverCanvasWithImg() {
  const elImg = new Image();

  elImg.src = `imgs/${gMeme.selectedImgId}.jpg`;
  elImg.onload = () => {
    gElCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight);
  };
  drawText();
}

function getMemes() {
  return loadFromStorage(IMAGES_STORAGE_KEY);
}

function drawText() {
  gElCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height); // מחיקת הקאנווס
  const elImg = new Image();
  elImg.src = `imgs/${gMeme.selectedImgId}.jpg`;
  elImg.onload = () => {
    gElCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight);
    gElCtx.beginPath();
    gElCtx.lineWidth = 2;
    if (gMeme.lines.length <= 0) return
    document.getElementById("text1").value = gMeme.lines[gMeme.selectedLineIdx].txt;
    // gElCtx.strokeStyle = gMeme.lines[0].color;
    gElCtx.strokeStyle = gSelectedColor;
    gElCtx.font = "bold " + gMeme.lines[gMeme.selectedLineIdx].size + "px " + gSelectedInspect; // fix the selected line ++ font size
    gElCtx.textBaseline = "middle";
    gMeme.lines.forEach((meme) => {
      gElCtx.fillText(meme.txt, meme.x, meme.y);
      gElCtx.strokeText(meme.txt, meme.x, meme.y);
    });
  };
}

function setCentering(centeringPlace){
  switch (centeringPlace) {
    case 'Left':
      gMeme.lines[gMeme.selectedLineIdx].x = LEFT_SIDE
      break;
    case 'Center':
      gMeme.lines[gMeme.selectedLineIdx].x = CENTER_SIDE
      break;
    case 'Right':
      gMeme.lines[gMeme.selectedLineIdx].x = RIGHT_SIDE
      break;
    }
  drawText()
}

function removeSelectedLine() {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1);
  gMeme.selectedLineIdx = 0;
  drawText();
}

function moveToNextLine() {
  if (gMeme.selectedLineIdx < gMeme.lines.length - 1) gMeme.selectedLineIdx++;
  else gMeme.selectedLineIdx = 0;
  drawText();
}

function updateTxt(msg) {
  // console.log(msg);
  const msgCapitalize = capitalize(msg);
  gMeme.lines[gMeme.selectedLineIdx].txt = msg;
  drawText();
}

function changeFontSize(opperator) {
  console.log(gMeme.lines);
  gMeme.lines[gMeme.selectedLineIdx].size = eval(
    gMeme.lines[gMeme.selectedLineIdx].size + opperator + 1
  );
  drawText();
}

function capitalize(txt) {
  return txt.charAt(0).toUpperCase() + txt.substring(1);
}

function addEmoji(emojiSrc) {
  switch (true) {
    case emojiSrc.includes("Emoji1"):
      gMeme.lines[0].txt += "🤪";
      break;
    case emojiSrc.includes("Emoji2"):
      gMeme.lines[0].txt += "😄";
      break;
    case emojiSrc.includes("Emoji3"):
      gMeme.lines[0].txt += "🤯";
      break;
    case emojiSrc.includes("Emoji4"):
      gMeme.lines[0].txt += "😣";
      break;
  }
  drawText();
}

// function loadImageFromInput(ev, onImageReady) { // upload image
//     const reader = new FileReader()
//     reader.onload = function (event) {
//         let img = new Image()
//         img.src = event.target.result
//         img.onload = () => onImageReady(img)
//     }
//     reader.readAsDataURL(ev.target.files[0])
// }

function uploadImg() {
  // Gets the image from the canvas
  const imgDataUrl = gElCanvas.toDataURL("image/jpeg");

  function onSuccess(uploadedImgUrl) {
    // Handle some special characters
    const url = encodeURIComponent(uploadedImgUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`);
  }

  // Send the image to the server
  doUploadImg(imgDataUrl, onSuccess);
}

function mouseClick(ev) {
  const { offsetX, offsetY, clientX, clientY } = ev;
  console.log("offsetX:", offsetX, "\noffsetY:", offsetY);
  console.log("clientX:", clientX, "\nclientY:", clientY);
  // console.log('gStars:', gStars)
  const clickedLineIndex = gMeme.lines.findIndex((line) => {
    return (
      offsetX >= line.txt.x &&
      offsetX <= line.txt.x + 50 &&
      offsetY >= line.txt.y &&
      offsetY <= line.txt.y + line.size
    );
  });
  console.log(clickedLineIndex);
  if (clickedLineIndex !== -1) {
    gMeme.selectedLineIdx = clickedLineIndex;
    console.log("picked line");
  } else {
    console.log("none of picked line");
  }
}

// Upload the image to a server, get back a URL
// call the function onSuccess when done
function doUploadImg(imgDataUrl, onSuccess) {
  // Pack the image for delivery
  const formData = new FormData();
  formData.append("img", imgDataUrl);

  // Send a post req with the image to the server
  const XHR = new XMLHttpRequest();
  XHR.onreadystatechange = () => {
    // If the request is not done, we have no business here yet, so return
    if (XHR.readyState !== XMLHttpRequest.DONE) return;
    // if the response is not ok, show an error
    if (XHR.status !== 200) return console.error("Error uploading image");
    const { responseText: url } = XHR;
    // Same as
    // const url = XHR.responseText

    // If the response is ok, call the onSuccess callback function,
    // that will create the link to facebook using the url we got
    console.log("Got back live url:", url);
    onSuccess(url);
  };
  XHR.onerror = (req, ev) => {
    console.error(
      "Error connecting to server with request:",
      req,
      "\nGot response data:",
      ev
    );
  };
  XHR.open("POST", "//ca-upload.com/here/upload.php");
  XHR.send(formData);
}

function resizeCanvas() {
  const elContainer = document.querySelector("#canvas");

  if (elContainer) {
    // Check if the element exists before accessing its properties
    gElCanvas.width = elContainer.clientWidth - 2;
  } else {
    console.error("Canvas container element not found");
  }
}
