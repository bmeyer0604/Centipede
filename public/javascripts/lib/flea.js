const Laser = require("./laser");
const Mushroom = require("./mushroom");
const Util = require("../src/util");

const flea = new Image();
flea.src = "../../images/flea.png";

const bugDeath = new Audio("../../sfx/bugDeath.mp4");

class Flea {
    constructor(context, canvasWidth, canvasHeight, x, y, game) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.game = game;

        this.image = flea;
        this.x = x;
        this.y = y;
        this.sourceWidth = 9;
        this.sourceHeight = 8;
        this.width = 27;
        this.height = 24;
        this.sourceX = 0;
        this.sourceY = 0;
        this.radius = 14;

        this.velocityY = .5;
        this.slow = true;

        this.frames = 0;
    }

    draw() {
        this.frames += 1;
        if(this.frames === 300) {
            this.frames = 0;
            this.sourceY = (this.sourceY + this.sourceHeight) % 16
        }
        // (img, sx, sy, sw, sh, dx, dy, dw, dh)
        this.context.drawImage(
            this.image, this.sourceX, this.sourceY, this.sourceWidth, 
            this.sourceHeight, this.x, this.y, this.width, this.height
        );
    }

    move() {
        this.y += this.velocityY;
        let randNum = Math.floor(Math.random() * 1400);
        if((randNum === 13) && this.y < 930 && this.y > 300) {
            this.game.mushrooms.push(new Mushroom(this.context, this.canvasWidth, this.canvasHeight, this.x, this.y, this.game))
        }
        if (this.y > this.canvasHeight - 15) {
            this.remove();
        }
    }

    isCollidedWith(otherObj) {
        const centerDist = Util.dist([this.x, this.y], [otherObj.x, otherObj.y]);
        return centerDist < (this.radius + otherObj.radius)
    }

    collideWith(otherObj) {
        if(otherObj instanceof Laser) {
            if(this.slow) {
                otherObj.remove();
                this.slow = false;
                this.velocityY *= 2.3;
            } else {
                otherObj.remove();
                this.remove();
                bugDeath.play();
                this.game.points += 200;
                this.game.checkPoints();
            }
        }
    }

    remove() {
        this.game.remove(this);
    }
}

module.exports = Flea;