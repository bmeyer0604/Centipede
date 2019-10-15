class CentipedeSegment {
    constructor(context, canvasWidth, canvasHeight) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x = 15;
        this.y = 25;
        this.velocityX = .02;
        this.velocityY = 0;
    }

    draw(ctx) {
        ctx.fillStyle = "#ff0000";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10 ,0, 2* Math.PI);
        // (x, y, radius, start angle, end angle)
        ctx.fill();
    }

    move() {
        // while(this.x < this.canvasWidth - 5) {
            this.x += this.velocityX;
            console.log("move the centipede");
            if (this.x < 15) {
                this.x = 15;
                this.y += 20;
                this.velocityX = -this.velocityX;
            } else if (this.x > this.canvasWidth - 15) {
                this.x = this.canvasWidth - 15;
                this.y += 20;
                this.velocityX = -this.velocityX;
            }
        // }
    }
}

module.exports = CentipedeSegment;