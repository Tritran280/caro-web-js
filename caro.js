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