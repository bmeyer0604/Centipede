const Laser = require("./laser");
const Mushroom = require("./mushroom");
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
        this.velocityY = .15;
        this.image = new Image();
        this.image.src = flea;
        this.radius = 10;

        this.slow = true;
    }

    draw() {
        this.context.drawImage(this.image, this.x, this.y, 20, 20);
    }

    move() {
        this.y += this.velocityY;
        let randNum = Math.floor(Math.random() * 2000);
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