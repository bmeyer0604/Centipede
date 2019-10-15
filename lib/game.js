const Canvas = require("./canvas");
const Player = require("./player");
const MovingObject = require("./moving_object");
const CentipedeSegment = require("./centipede-segment");
const Mushroom = require("./mushroom");
const Laser = require("./laser");

class Game {
    constructor(context) {
        this.DIM_X = 500;
        this.DIM_Y = 750;
        this.BG_COLOR = "#000000";
        this.context = context;
        this.isRunning = false;
        this.canvas = new Canvas(this.context, this.DIM_X, this.DIM_Y);
        this.player = new Player(this.context, this.DIM_X, this.DIM_Y, this);
        this.centipedeSegments = [];
        this.lasers = [];
        this.mushrooms = [];
        this.segments = [];

        this.testSegment = new CentipedeSegment(this.context, this.DIM_X, this.DIM_Y);

        this.setMushrooms();
    }

    allObjects() {
        return [].concat(this.mushrooms, this.lasers, this.segments);
    }

    setMushrooms() {
        for(let i = 0; i < 30; i++) {
            let randX = Math.floor(Math.random() * this.DIM_X - 10)
            let randY = Math.floor(Math.random() * this.DIM_Y * 0.66);
            console.log(randX);
            const mushroom = new Mushroom(this.context, this.DIM_X, this.DIM_Y, randX, randY, this);
            this.mushrooms.push(mushroom);
        }
        console.log(this.mushrooms);
    }

    remove(obj) {
        if(obj instanceof Laser) {
            this.lasers.splice(this.lasers.indexOf(obj), 1);
        } else if (obj instanceof CentipedeSegment) {
            this.segments.splice(this.segments.indexOf(obj), 1);
        } else if (obj instanceof Mushroom) {
            this.mushrooms.splice(this.mushrooms.indexOf(obj), 1);
        }
    }

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
            }, 10);
        }
    }

    updateGameState() {
        this.testSegment.move();
        this.allObjects().forEach((obj) => {
            obj.move();
        })
    }

    draw() {
        this.canvas.draw();
        this.player.draw();
        this.testSegment.draw(this.context);
        this.allObjects().forEach((obj) => {
            obj.draw(this.context);
        })
    }
}

module.exports = Game;