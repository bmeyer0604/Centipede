const Laser = require("./laser");
const Util = require("../src/util");

const spider = new Image();
spider.src = "../images/spider.png";

class Spider {
    constructor(context, canvasWidth, canvasHeight, x, y, game) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.game = game;

        this.velocityX = .15;
        this.velocityY = .15;

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
        if (this.x > this.canvasWidth - 24) {
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
            this.game.points += 600;
            this.game.checkPoints();
        }
    }

    remove() {
        this.game.remove(this);
    }
}

module.exports = Spider;