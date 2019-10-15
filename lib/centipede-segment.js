const Laser = require("./laser");
const Mushroom = require("./mushroom");
const Util = require("../src/util");

class CentipedeSegment {
    constructor(context, canvasWidth, canvasHeight, x, y, game) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.game = game;
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.velocityX = .15;
        this.velocityY = 18;
    }

    draw(ctx) {
        ctx.fillStyle = "#ff0000";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10 ,0, 2* Math.PI);
        // (x, y, radius, start angle, end angle)
        ctx.fill();
    }

    move() {
            this.x += this.velocityX;
            if (this.y < 0) {
                this.y = 0;
                this.velocityY = -this.velocityY;
            } else if (this.y > this.canvasHeight - 15) {
                this.y = this.canvasHeight - 15;
                this.velocityY = -this.velocityY;
            } else if (this.x < 15) {
                this.x = 15;
                this.y += this.velocityY;
                this.velocityX = -this.velocityX;
            } else if (this.x > this.canvasWidth - 15) {
                this.x = this.canvasWidth - 15;
                this.y += this.velocityY;
                this.velocityX = -this.velocityX;
            }
    }

    isCollidedWith(otherObj) {
        const centerDist = Util.dist([this.x, this.y], [otherObj.x, otherObj.y]);
        return centerDist < (this.radius + otherObj.radius)
    }

    collideWith(otherObj) {
        if(otherObj instanceof Laser) {
            otherObj.remove();
            this.remove();
        } else if(otherObj instanceof Mushroom) {
            this.y += 20;
            this.velocityX = -this.velocityX;
        }
    }

    remove() {
        this.game.mushrooms.push(new Mushroom(this.context, this.canvasWidth, this.canvasHeight, this.x, this.y, this.game));
        this.game.remove(this);
    }
}

module.exports = CentipedeSegment;