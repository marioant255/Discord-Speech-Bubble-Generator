const imageUpload = document.getElementById('imageUpload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const resizeBubble = document.getElementById('resizeBubble');
const downloadBtn = document.getElementById('downloadBtn');

const speechBubble = new Image();
speechBubble.src = 'speech-bubble.png'; // Ensure this file is in the same folder

let uploadedImage = null;
let bubbleX = 50, bubbleY = 50, bubbleSize = 200;

// Load uploaded image
imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedImage = new Image();
            uploadedImage.src = e.target.result;
            uploadedImage.onload = () => {
                canvas.width = uploadedImage.width / 2;
                canvas.height = uploadedImage.height / 2;
                drawCanvas();
            };
        };
        reader.readAsDataURL(file);
    }
});

// Draw the image and speech bubble
function drawCanvas() {
    if (!uploadedImage) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(speechBubble, bubbleX, bubbleY, bubbleSize, bubbleSize / 2);
}

// Allow moving the speech bubble with the mouse
canvas.addEventListener('mousedown', (e) => {
    const startX = e.offsetX;
    const startY = e.offsetY;

    function onMouseMove(event) {
        bubbleX += event.movementX;
        bubbleY += event.movementY;
        drawCanvas();
    }

    function onMouseUp() {
        canvas.removeEventListener('mousemove', onMouseMove);
        canvas.removeEventListener('mouseup', onMouseUp);
    }

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
});

// Resize the speech bubble dynamically
resizeBubble.addEventListener('input', (event) => {
    bubbleSize = event.target.value;
    drawCanvas();
});

// Download the final image
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'speech-bubble-image.png';
    link.href = canvas.toDataURL();
    link.click();
});
