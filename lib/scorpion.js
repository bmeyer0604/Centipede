const Laser = require("./laser");
const Mushroom = require("./mushroom");
const Util = require("../src/util");

const scorpion = new Image();
scorpion.src = "../scorpion.png";

class Scorpion {
    constructor(context, canvasWidth, canvasHeight, x, y, game) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.game = game;

        this.image = scorpion;
        this.x = x;
        this.y = y;
        this.sourceWidth = 16;
        this.sourceHeight = 8;
        this.width = 50;
        this.height = 25;
        this.sourceX = 0;
        this.sourceY = 0;
        this.radius = 30;

        this.velocityX = -.1;

        this.frames = 0;
    }

    draw() {
        this.frames += 1;
        if(this.frames === 300) {
            this.frames = 0;
            this.sourceX = (this.sourceX + this.sourceWidth) % 64
        }
        // (img, sx, sy, sw, sh, dx, dy, dw, dh)
        this.context.clearRect(0, 0, this.width, this.height);
        this.context.drawImage(
            this.image, this.sourceX, this.sourceY, this.sourceWidth, 
            this.sourceHeight, this.x, this.y, this.width, this.height
        );
    }

    move() {
        this.x += this.velocityX;
        if (this.x < 0) {
            this.remove();
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
            this.game.points += 1000;
            this.game.checkPoints();
        } else if(otherObj instanceof Mushroom) {
            otherObj.poisoned = true;
            otherObj.sourceY = 8;
        }
    }

    remove() {
        this.game.remove(this);
    }
}

module.exports = Scorpion;