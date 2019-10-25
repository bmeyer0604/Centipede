const Laser = require("./laser");
const Util = require("../src/util");

const mushroom = new Image();
mushroom.src = "../public/images/mushroom.png";

class Mushroom {
    constructor(context, canvasWidth, canvasHeight, x, y, game) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.game = game;

        this.image = mushroom;
        this.x = x;
        this.y = y;
        this.sourceWidth = 8;
        this.sourceHeight = 8;
        this.width = 28;
        this.height = 28;
        this.sourceX = 0;
        this.sourceY = 0;
        this.radius = 14;

        this.poisoned = false;
    }

    draw(ctx) {
        // (img, sx, sy, sw, sh, dx, dy, dw, dh)
        this.context.drawImage(
            this.image, this.sourceX, this.sourceY, this.sourceWidth, 
            this.sourceHeight, this.x, this.y, this.width, this.height
        );
    }

    isCollidedWith(otherObj) {
        const centerDist = Util.dist([this.x, this.y], [otherObj.x, otherObj.y]);
        return centerDist < (this.radius + otherObj.radius)
    }

    collideWith(otherObj) {
        if(otherObj instanceof Laser) {
            otherObj.remove();
            this.take_damage();
        }
    }

    take_damage() {
        if(this.sourceX < 16) {
            this.sourceX += 8;
        } else {
            this.remove();
            this.game.points += 1;
            this.game.checkPoints();
        }
    }

    move() {
    }

    remove() {
        this.game.remove(this);
    }
}

module.exports = Mushroom;