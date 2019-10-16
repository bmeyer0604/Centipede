const Laser = require("./laser");
const Util = require("../src/util");

const flea = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAICAYAAAArzdW1AAAASklEQVQYV3WQQQrAQAgDM77Mp/uz9GRXSzcgBBxDELk05OFpE2ebE1gHcQEWiFw34FVoC5OafRqix6RxYdK/xXfcAU2KzwvUadM/OzUiiuUHtSAAAAAASUVORK5CYII=";

class Flea {
    constructor(context, canvasWidth, canvasHeight, x, y, game) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.game = game;
        this.x = x;
        this.y = y;
        this.velocityY = .25;
        this.image = new Image();
        this.image.src = flea;
        this.radius = 10;
    }

    draw() {
        this.context.drawImage(this.image, this.x, this.y, 20, 20);
    }

    move() {
        this.y += this.velocityY;
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
            otherObj.remove();
            this.remove();
            this.game.points += 200;
            this.game.checkPoints();
        }
    }

    remove() {
        this.game.remove(this);
    }
}

module.exports = Flea;