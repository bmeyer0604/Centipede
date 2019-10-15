const Util = require("../src/util");
const MovingObject = require("./moving_object");

class Laser {
    constructor(context, canvasWidth, canvasHeight, player, game) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.player = player;
        this.game = game;
        this.x = this.player.x + 23;
        this.y = this.player.y + 2;
        this.velocityX = 0;
        this.velocityY = 0.1;
    }

    draw(ctx) {
        ctx.fillStyle = "#FFFF00";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, 2* Math.PI);
        // (x, y, radius, start angle, end angle)
        ctx.fill();
    }

    move() {
            this.y -= this.velocityY;
            console.log("move the laser");
            if (this.y < 2) {
                this.game.remove(this);
            }
    }
}

module.exports = Laser;