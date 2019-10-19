const CentipedeSegment = require("./centipede-segment");
const Flea = require("./flea");
const Scorpion = require("./scorpion");
const Spider = require("./spider");
const Mushroom = require("./mushroom");
const Laser = require("./laser");
const Util = require("../src/util");

const ship = new Image();
ship.src = "../images/ship.png";
const playerHeight = 35;
const playerWidth = 28;

const laserBlast = new Audio("../sfx/laser.mp4");
const explosion = new Audio("../sfx/explosion.mp4");

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

        this.radius = 15;
        this.image = ship;
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
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x > this.canvasWidth - playerWidth) {
            this.x = this.canvasWidth - playerWidth;
        } else if (this.y < 0) {
            this.y = 0;
        } else if (this.y > this.canvasHeight - playerHeight) {
            this.y = this.canvasHeight - playerHeight;
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
        } else if(otherObj instanceof Mushroom) {
            if(otherObj.x > this.x + otherObj.width) {
                console.log("mushroom to the right")
                this.x = otherObj.x - playerWidth - 8;
            } else if(otherObj.x < this.x - otherObj.width) {
                console.log("mushroom to the left")
                this.x = otherObj.x + otherObj.width + 7;
            } else if(otherObj.y > this.y + otherObj.height) {
                console.log("mushroom below")
                this.y = otherObj.y - playerHeight - 5;
            } else if(otherObj.y < this.y - otherObj.height) {
                console.log("mushroom above")
                this.y = otherObj.y + otherObj.height + 6;
            }
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