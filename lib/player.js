const CentipedeSegment = require("./centipede-segment");
const Flea = require("./flea");
const Scorpion = require("./scorpion");
const Spider = require("./spider");
const Mushroom = require("./mushroom");
const Laser = require("./laser");
const Util = require("../src/util");

const playerSprite = "data:image/png;base64,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";
const playerSprite2 = new Image();
playerSprite2.src = "../ship5.png";
const playerWidth = 57
const playerHeight = 53

const laserBlast = new Audio("../laser.mp4");
const explosion = new Audio("../explosion.mp4");

class Player {
    constructor(context, canvasWidth, canvasHeight, game) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.game = game;
        this.x = (this.canvasWidth - playerWidth) / 2;
        this.y = this.canvasHeight - playerHeight - 10;
        this.velocityX = 0;
        this.velocityY = 0;

        this.radius = 23;
        this.image = new Image();
        this.image = playerSprite2;
        this.bindKeyboardInput();
        this.rightDown = false;
        this.leftDown = false;
        this.upDown = false;
        this.downDown = false;
    }

    bindKeyboardInput() {
        window.addEventListener("keydown", event => {
            if(event.key === "ArrowLeft") {
                this.velocityX = -.4;
            } 
            if(event.key === "ArrowRight") {
                this.velocityX = .4;
            }
            if(event.key === "ArrowUp") {
                this.velocityY = -.4;
            }
            if(event.key === "ArrowDown") {
                this.velocityY = .4;
            }
            if (event.code === "Space") {
                let laser = new Laser(this.context, this.canvasWidth, this.canvasHeight, this, this.game);
                this.game.lasers.push(laser);
                laserBlast.play();
            }
            this.checkBounds();
        });

        window.addEventListener("keyup", event => {
            if(event.key === "ArrowLeft") {
                this.velocityX = 0;
            } 
            if(event.key === "ArrowRight") {
                this.velocityX = 0;
            }
            if(event.key === "ArrowUp") {
                this.velocityY = 0;
            }
            if(event.key === "ArrowDown") {
                this.velocityY = 0;
            }
        });
    }

    checkBounds() {
        // set player boundaries
        if (this.x < 5) {
            this.x = 5;
        } else if (this.x > this.canvasWidth - playerWidth - 5) {
            this.x = this.canvasWidth - playerWidth - 5;
        } else if (this.y < 5) {
            this.y = 5;
        } else if (this.y > this.canvasHeight - playerHeight - 5) {
            this.y = this.canvasHeight - playerHeight - 5;
        }
    }

    isCollidedWith(otherObj) {
        const centerDist = Util.dist([this.x, this.y], [otherObj.x, otherObj.y]);
        return centerDist < (this.radius + otherObj.radius)
    }

    collideWith(otherObj) {
        if(otherObj instanceof CentipedeSegment || otherObj instanceof Spider || otherObj instanceof Flea || otherObj instanceof Scorpion) {
            explosion.play();
            this.game.lives -= 1;
            this.x = (this.canvasWidth - playerWidth) / 2;
            this.y = this.canvasHeight - playerHeight - 10;
            if(this.game.lives < 1) this.game.gameoverScreen();
        } else if(otherObj instanceof Mushroom) {
            // console.log("mushroom colission");
        }
    }

    move() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.checkBounds();
    }

    draw() {
        this.context.drawImage(this.image, this.x, this.y, playerWidth, playerHeight);
    }
}

module.exports = Player;