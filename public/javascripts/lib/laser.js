const Util = require("../src/util");
const MovingObject = require("./moving_object");

class Laser {
    constructor(context, canvasWidth, canvasHeight, player, game) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.player = player;
        this.game = game;
        this.x = this.player.x + player.radius;
        this.y = this.player.y + 2;
        this.radius = 1;
        this.velocityX = 0;
        this.velocityY = 0.55;
    }

    draw(ctx) {
        ctx.fillStyle = "#FFFF00";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, 2* Math.PI);
        // (x, y, radius, start angle, end angle)
        ctx.fill();
    }

    isCollidedWith(otherObj) {
        const centerDist = Util.dist([this.x, this.y], [otherObj.x, otherObj.y]);
        return centerDist < (this.radius + otherObj.radius)
    }

    collideWith(otherObj) {
    }

    move() {
            this.y -= this.velocityY;
            if (this.y < 2) {
                this.game.remove(this);
            }
    }

    remove() {
        this.game.remove(this);
    }
}

module.exports = Laser;