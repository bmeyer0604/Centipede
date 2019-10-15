const Canvas = require("./canvas");
const Player = require("./player");
const MovingObject = require("./moving_object");

class Game {
    constructor(context) {
        this.DIM_X = 500;
        this.DIM_Y = 750;
        this.BG_COLOR = "#000000";
        this.context = context;
        this.isRunning = false;
        this.canvas = new Canvas(this.context, this.DIM_X, this.DIM_Y);
    }

    // draw(ctx) {
    //     ctx.clearRect(0, 0, this.width, this.height);
    //     ctx.fillStyle = this.BG_COLOR;
    //     ctx.fillRect(0, 0, this.width, this.height);
    // }
    start() {
        this.isRunning = true;
        this.runGameLoop();
    }

    runGameLoop() {
        if(this.isRunning) {
            this.updateGameState();
            this.draw();
            let me = this;
            window.setInterval(() => {
                me.runGameLoop();
            }, 1000);
        }
    }

    updateGameState() {
        console.log("updateGameState");
    }

    draw() {
        console.log("drawl");
        this.canvas.draw();
    }
    
}

module.exports = Game;