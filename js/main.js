let canvas = document.getElementById('canvas');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let ctx = canvas.getContext('2d');

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawSquare(x, y, size) {
    ctx.beginPath();
    ctx.rect(x, y, size, size);
    ctx.stroke();
}

function drawPoint(x, y, size) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.stroke();
}

function generatePoints(amount) {
    let pointss = [];
    let minDistance = 100
    let maxDistance = canvas.width - 10;
    let size = canvas.width - canvas.width / 10;
    for (let i = 0; i < amount; i++) {
        let x = Math.floor(Math.random() * maxDistance) + minDistance;
        let y = Math.floor(Math.random() * maxDistance) + minDistance;
        if (pointss.length > 0) {
            for (let j = 0; j < pointss.length; j++) {
                if (Math.abs(x - pointss[j].x) < minDistance && Math.abs(y - pointss[j].y) < minDistance) {
                    x = Math.floor(Math.random() * maxDistance) + minDistance;
                    y = Math.floor(Math.random() * maxDistance) + minDistance;
                }
            }
        }
        if (!x > 20 && x < 20 + size && y > 20 && y < 20 + size) {
            x = Math.floor(Math.random() * maxDistance) + minDistance;
            y = Math.floor(Math.random() * maxDistance) + minDistance;
            console.log("outside")
        }
        pointss.push({
            x: x,
            y: y,
            number: i
        });
    }
    return pointss;
}
let points = generatePoints(10);
let lines = [];

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let size = canvas.width - canvas.width / 10;
    drawSquare(20, 20, size);
    for (let i = 0; i < points.length; i++) {
        drawPoint(points[i].x, points[i].y, 10);

        drawPoint(points[i].x, points[i].y, 5);
        ctx.font = "15px Arial";
        ctx.fillText(points[i].number, points[i].x + 10, points[i].y);
        for (let j = 0; j < points.length; j++) {
            if (i != j) {
                let distance = Math.sqrt(Math.pow(points[i].x - points[j].x, 2) + Math.pow(points[i].y - points[j].y, 2));
                if (distance < size / 2) {
                    drawLine(points[i].x, points[i].y, points[j].x, points[j].y);
                }
            }
        }
    }
    window.requestAnimationFrame(draw);
}



draw();