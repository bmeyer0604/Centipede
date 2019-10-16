const Laser = require("./laser");
const Mushroom = require("./mushroom");
const Util = require("../src/util");

const body1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAICAYAAAA1BOUGAAAAPElEQVQIW33PQQqAMAwEwNniv3x7XhYPIlixzXFnYUm6y881ckCcPUvlztsE78ISYaxgi60ynvEvQHavXFGGFY2PW139AAAAAElFTkSuQmCC";
const body2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAICAYAAAA1BOUGAAAAP0lEQVQIW33PwQkAMAhD0R/pXp3dydJDEaRgvekTJbKTVgZUzQIQ233BpO7cdGgnUiMCxARfNKmo5y8A6BflABfeFowAV+/RAAAAAElFTkSuQmCC";
const head1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAICAYAAAA1BOUGAAAARUlEQVQIW33PQQqAQBADwYr4L9++L4sHWVFRG+aSHghJO7xQZAXZCuk0IxDV5ginnA9Rl+jO8iVO2Rx3pUaWWf4UkL8pO/eiGo0KvHLNAAAAAElFTkSuQmCC";
const head2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAICAYAAAA1BOUGAAAASUlEQVQIW32PQQqAQAzEMov/8u19WTzsrlRBAz20GVoaLRoC2c0BQE4B4gxIBSCIruySa0UlSBs9GV/ilmZWRypjH38LgPy9cgG9+huM/61C3gAAAABJRU5ErkJggg==";

class CentipedeSegment {
    constructor(context, canvasWidth, canvasHeight, x, y, game) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.game = game;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = body1;
        this.radius = 5;
        this.velocityX = .15;
        this.velocityY = 18;
    }

    draw() {
        this.context.drawImage(this.image, this.x, this.y, 20, 20);
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
            this.game.points += 10;
            this.game.checkPoints();
        } else if(otherObj instanceof Mushroom) {
            this.y += this.velocityY;
            this.velocityX = -this.velocityX;
        }
    }

    remove() {
        this.game.mushrooms.push(new Mushroom(this.context, this.canvasWidth, this.canvasHeight, this.x, this.y, this.game));
        this.game.remove(this);
    }
}

module.exports = CentipedeSegment;