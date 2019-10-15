class CentipedeSegment {
    constructor(context, canvasWidth, canvasHeight) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x = 10;
        this.y = 10;
        this.velocityX = 0;
        this.velocityY = 0;
    }

    draw(ctx) {
        ctx.fillStyle = "#ff0000";
        ctx.beginPath();
        ctx.arc(95,50,40,0,2* Math.PI);
        ctx.fill();
    }
}

module.exports = CentipedeSegment;