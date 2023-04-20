class circle {
    constructor(x, y, r, speed) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.speed = speed;
        this.startingAngle = 0;
    }

    getEndingAngle() {
        return this.startingAngle + 0.03 * Math.PI;
    }

    increaseStartingAngle() {
        this.startingAngle += this.speed;

        if (this.startingAngle >= 2 * Math.PI) {
            this.startingAngle = 0;
        }
    }
}


class circleDrawer {
    constructor(canvas, mw, mh) {
        this.canvas = canvas;
        this.mw = mw;
        this.mh = mh;
        this.circles = [];
        for (let i = 0; i < 20000; i++) {
            const x = this.getRandomValue(3, mw);
            const y = this.getRandomValue(3, mh);
            const r = this.getRandomValue(3, 100);
            const s = this.getRandomValue(.01, 0.05);
            this.circles.push(new circle(x, y, r, s));
        }
    }

    getRandomValue(min, max) {
        return Math.random() * (max - min) + min;
    }

    draw() {
        if (!this.canvas) return; // Kiểm tra xem canvas đã được khởi tạo hay chưa

        var ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.circles.forEach(circle => {
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.r, circle.startingAngle, circle.getEndingAngle());
            // ctx.fillStyle = "red";
            // ctx.fill();
            ctx.strokeStyle = "blue";
            ctx.stroke();
            circle.increaseStartingAngle();
        });
        requestAnimationFrame(this.draw.bind(this));
      }
}

var canvas = document.getElementById("canvas1")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var _circleDrawer = new circleDrawer(canvas, window.innerWidth, window.innerHeight);
requestAnimationFrame(_circleDrawer.draw.bind(_circleDrawer));

