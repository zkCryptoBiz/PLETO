
let start = false

const txt1 = document.getElementById('textOne')
const txt2 = document.getElementById('textTwo')


var canvas = new fabric.Canvas('c', {
    width: document.querySelector('.image').clientWidth,
    height: document.querySelector('.image').clientHeight
});

// create a rect object
var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

var deleteImg = document.createElement('img');
deleteImg.src = deleteIcon;

fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.cornerColor = 'black';
// fabric.Object.prototype.cornerStyle = 'circle';


function renderIcon(icon) {
    return function renderIcon(ctx, left, top, fabricObject) {
    var size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(icon, -size/2, -size/2, size, size);
    ctx.restore();
    }
}

fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: -20,
    offsetX: 20,
    cursorStyle: 'pointer',
    mouseUpHandler: deleteObject,
    render: renderIcon(deleteImg),
    cornerSize: 30
});


function deleteObject(eventData, transform) {
    var target = transform.target;
    var canvas = target.canvas;
    canvas.remove(target);
    canvas.requestRenderAll();
}



document.getElementById('imageFile').addEventListener("change", function (e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (f) {
        var data = f.target.result;

        fabric.Image.fromURL(data, function(img) {
            var scaleFactor = canvas.width / img.width;
    
            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                scaleX: scaleFactor,
                scaleY: scaleFactor
            });
    
            
            canvas.setHeight(img.height * scaleFactor);
            document.querySelector('.image').style.height = img.height * scaleFactor+'px'
        });


        
    };


    reader.readAsDataURL(file);

    document.querySelector('.addImage').innerHTML = 
    `
        <div class="loader">
        </div>
        <p>creating your canvas</p>
    `

    setTimeout(() => {
        document.querySelector('.addImage').style.display = 'none';  
        start = true 
        txt1.value = ''
        txt2.value = ''
    }, 500);
});

function resetCanvas() {
    // Loop through all objects and remove them
    canvas.getObjects().forEach(obj => {
        if (obj !== canvas.backgroundImage && obj !== canvas.backgroundColor) {
            canvas.remove(obj);
        }
    });
    
    canvas.renderAll(); // Re-render the canvas
}

function ranPosition() {
    return Math.floor(
        Math.random() * (200 - 50 + 1)
    ) + 50;

}



function addImage(file) {
    if (start) {
        fabric.Image.fromURL('../img/'+file, function(oImg) {
            oImg.scaleToWidth(150);
            oImg.scaleToHeight(150);
            oImg.set({
                left: 10, // X position
                top: 10   // Y position
            });
            canvas.add(oImg);
        });
    }
}

const saveCanvas = () => {
    if (start) {
        const ext = "png";
        const base64 = canvas.toDataURL({
        format: ext,
        enableRetinaScaling: true
        });
        const link = document.createElement("a");
        link.href = base64;
        link.download = `pleto.${ext}`;
        link.click();
    }
};

