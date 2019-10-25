const Laser = require("./laser");
const Mushroom = require("./mushroom");
const Util = require("../src/util");
// Centipede segment

const segment = new Image();
segment.src = "../images/centipede-body.png";
const segmentReverse = new Image();
segmentReverse.src = "../images/centipede-body-reverse.png";
const segmentDown = new Image();
segmentDown.src = "../images/centipede-down.png";
const headSeg = new Image();
headSeg.src = "../images/centipede-head.png";
const headSegReverse = new Image();
headSegReverse.src = "../images/centipede-head-reverse.png";
const headDown = new Image();
headDown.src = "../images/head-down.png";

const centipedeDeath = new Audio("../sfx/centipedeDeath.mp4");

class CentipedeSegment {
    constructor(context, canvasWidth, canvasHeight, x, y, game, head=false) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.game = game;
        this.head = false;

        this.velocityX = .15;
        this.velocityY = 25;

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
        this.head = head;

        if(this.head) {
            this.image = headSeg;
        } else {
            this.image = segment;
        }

        this.frames = 0;
    }

    draw() {
        this.frames += 1;
        if(this.angry) {
            if(this.frames % 150 === 0) {
                this.frames = 0;
                this.sourceX = 0;
                this.sourceY = (this.sourceY + this.sourceHeight) % 16;
            }
        } else {
            if(this.frames === 300) {
                this.frames = 0;
                this.sourceY = 0;
                this.sourceX = (this.sourceX + this.sourceWidth) % 32;
            }
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
                this.velocityY = -25;
                this.velocityX = .15;
                this.angry = false;
                this.head ? this.image = headSeg : this.image = segment;
            } else if (this.x < 15) {
                if(this.angry) {
                    this.y += this.velocityY;
                } else {
                    this.x = 15;
                    this.y += this.velocityY;
                    this.velocityX = -this.velocityX;
                    this.head ? this.image = headSeg : this.image = segment;
                }
            } else if (this.x > this.canvasWidth - 15) {
                if(this.angry) {
                    this.y += this.velocityY;
                } else {
                    this.x = this.canvasWidth - 15;
                    this.y += this.velocityY;
                    this.velocityX = -this.velocityX;
                    this.head ? this.image = headSegReverse : this.image = segmentReverse;
                }
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
            centipedeDeath.play();
            this.head ? this.game.points += 100 : this.game.points += 10;
            this.game.checkPoints();
        } else if(otherObj instanceof Mushroom) {
            if(otherObj.poisoned) {
                this.angry = true;
                this.head ? this.image = headDown : this.image = segmentDown;
                this.velocityY = .4;
                this.velocityX = 0;
            } else if(this.angry) {
                this.y += this.velocityY;
            } else {
                this.y += this.velocityY;
                this.velocityX = -this.velocityX;
                if(otherObj.x < this.x) {
                    this.head ? this.image = headSeg : this.image = segment;
                    this.x = otherObj.x + otherObj.width + 1;
                } else if(otherObj.x > this.x) {
                    this.head ? this.image = headSegReverse : this.image = segmentReverse;
                    this.x = otherObj.x - this.width - 1;
                } else if(otherObj.y > this.y + this.height) {
                    this.y = otherObj.y + this.height + 1;
                }
            }
        } else if(otherObj instanceof CentipedeSegment && !this.angry && !otherObj.angry) {
            if(otherObj.x > this.x && this.velocityX < 0) {
                this.x = otherObj.x - this.width - 1;
            } else if(otherObj.x < this.x && this.velocityX > 0) {
                this.x = otherObj.x + otherObj.width + 1;
            }
        }
    }

    remove() {
        this.game.mushrooms.push(new Mushroom(this.context, this.canvasWidth, this.canvasHeight, this.x, this.y, this.game));
        this.game.remove(this);
    }
}

module.exports = CentipedeSegment;