const Laser = require("./laser");
const Mushroom = require("./mushroom");
const Util = require("../src/util");

const segment = new Image();
segment.src = "../images/centipede-body.png";
const segmentReverse = new Image();
segmentReverse.src = "../images/centipede-body-reverse.png";
const head = new Image();
head.src = "../images/centipede-head.png";

class CentipedeSegment {
    constructor(context, canvasWidth, canvasHeight, x, y, game) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.game = game;

        this.velocityX = .15;
        this.velocityY = 20;

        this.image = segment;
        this.x = x;
        this.y = y;
        this.sourceWidth = 8;
        this.sourceHeight = 8;
        this.width = 24;
        this.height = 24;
        this.sourceX = 0;
        this.sourceY = 0;
        this.radius = 12;

        this.angry = false;

        this.frames = 0;
    }

    draw() {
        this.frames += 1;
        if(this.frames === 300) {
            this.frames = 0;
            this.sourceX = (this.sourceX + this.sourceWidth) % 32
        }
        // (img, sx, sy, sw, sh, dx, dy, dw, dh)
        this.context.drawImage(
            this.image, this.sourceX, this.sourceY, this.sourceWidth, 
            this.sourceHeight, this.x, this.y, this.width, this.height
        );
    }

    move() {
            if(this.angry) this.y += this.velocityY;
            
            this.x += this.velocityX;
            if (this.y < 0) {
                this.y = 0;
                this.velocityY = -this.velocityY;
            } else if (this.y > this.canvasHeight - 24) {
                this.y = this.canvasHeight - 24;
                this.velocityY = -20;
                this.velocityX = .15;
                this.angry = false;
            } else if (this.x < 15) {
                this.x = 15;
                this.y += this.velocityY;
                this.velocityX = -this.velocityX;
                this.image = segment;
            } else if (this.x > this.canvasWidth - 15) {
                this.x = this.canvasWidth - 15;
                this.y += this.velocityY;
                this.velocityX = -this.velocityX;
                this.image = segmentReverse;
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
            this.game.points += 10;
            this.game.checkPoints();
        } else if(otherObj instanceof Mushroom) {
            if(otherObj.poisoned) {
                this.angry = true;
                this.velocityY = .4;
                this.velocityX = 0;
            } else if(this.angry) {
                this.y += this.velocityY;
            } else {
                this.y += this.velocityY;
                this.velocityX = -this.velocityX;
                if(otherObj.x < this.x) {
                    this.image = segment;
                } else {
                    this.image = segmentReverse;
                }
            }
        }
    }

    remove() {
        this.game.mushrooms.push(new Mushroom(this.context, this.canvasWidth, this.canvasHeight, this.x, this.y, this.game));
        this.game.remove(this);
    }
}

module.exports = CentipedeSegment;