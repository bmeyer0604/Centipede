const Mushroom = require("./mushroom");
const Laser = require("./laser");
const Util = require("../src/util");

const spider = new Image();
spider.src = "../images/spider.png";

const bugDeath = new Audio("../sfx/bugDeath.mp4");

class Spider {
    constructor(context, canvasWidth, canvasHeight, x, y, game) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.game = game;

        this.image = spider;
        this.x = x;
        this.y = y;
        this.sourceWidth = 16;
        this.sourceHeight = 8;
        this.width = 48;
        this.height = 24;
        this.sourceX = 0;
        this.sourceY = 0;
        this.radius = 12;

        this.velocityX = .25;
        if(this.x !== 0) this.velocityX = -.25;
        this.velXTemp = this.velocityX;
        this.velocityY = .4;

        this.frames = 0;
    }

    draw() {
        this.frames += 1;
        if(this.frames === 200) {
            this.sourceX = (this.sourceX + this.sourceWidth) % 64;
        }
        // (img, sx, sy, sw, sh, dx, dy, dw, dh)
        this.context.drawImage(
            this.image, this.sourceX, this.sourceY, this.sourceWidth, 
            this.sourceHeight, this.x, this.y, this.width, this.height
        );
    }

    checkBounds() {
        if(this.y > this.canvasHeight - this.height) {
            this.y = this.canvasHeight - this.height;
        }
    }

    move() {
        if(this.frames % 300 === 0) {
            this.velocityY = -this.velocityY;
        } else if(this.frames % 1000 === 0) {
            this.velocityX = this.velXTemp;
            this.frames = 0;
        }
        Math.random() <= .5 ? this.velocityX = 0 : this.velocityX = this.velXTemp;

        this.x += this.velocityX;
        this.y += this.velocityY;
        this.checkBounds();
        if (this.x > this.canvasWidth + 100 || this.x < -100) {
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
            bugDeath.play();
            this.game.points += 600;
            this.game.checkPoints();
        } else if(otherObj instanceof Mushroom) {
            if(Math.random() > 0.8) otherObj.remove();
        }
    }

    remove() {
        this.game.remove(this);
    }
}

module.exports = Spider;