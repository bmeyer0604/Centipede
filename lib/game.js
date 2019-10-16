const Canvas = require("./canvas");
const Player = require("./player");
const MovingObject = require("./moving_object");
const CentipedeSegment = require("./centipede-segment");
const Flea = require("./flea");
const Scorpion = require("./scorpion");
const Mushroom = require("./mushroom");
const Laser = require("./laser");
const Util = require("../src/util");

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
        this.monsters = [];

        this.level = 1;
        this.lives = 3;
        this.lives_gained = 0;
        this.points = 0;
        this.setMushrooms();
        this.setCentipede();
    }

    allObjects() {
        return [].concat(this.player, this.mushrooms, this.lasers, this.segments, this.monsters);
    }

    setMushrooms() {
        for(let i = 0; i < 4; i++) {
            let randX = Math.floor(Math.random() * (this.DIM_X - 50) + 20)
            let randY = Math.floor(Math.random() * (this.DIM_Y * 0.66 - 28) + 35);

            while(this.mushrooms.some(mushroom => Util.dist([randX, randY], [mushroom.x, mushroom.y]) < 20)) {
                randX = Math.floor(Math.random() * (this.DIM_X - 50) + 20)
                randY = Math.floor(Math.random() * (this.DIM_Y * 0.66 - 28) + 35);
            }

            const mushroom = new Mushroom(this.context, this.DIM_X, this.DIM_Y, randX, randY, this);
            this.mushrooms.push(mushroom);
        }
    }

    setCentipede() {
        let x = 15;
        for(let i = 0; i < 15; i++) {
            this.segments.push(new CentipedeSegment(this.context, this.DIM_X, this.DIM_Y, x, 15, this));
            x += 15;
        }
    }

    collision() {
        const allObjects = this.allObjects();
        for(let i = 0; i < allObjects.length; i++) {
            for(let j = 0; j < allObjects.length; j++) {
                const obj1 = allObjects[i];
                const obj2 = allObjects[j];

                if(obj1.isCollidedWith(obj2)) {
                    const collision = obj1.collideWith(obj2);
                    if(collision) return;
                }
            }
        }
    }

    remove(obj) {
        if(obj instanceof Laser) {
            this.lasers.splice(this.lasers.indexOf(obj), 1);
        } else if (obj instanceof CentipedeSegment) {
            this.segments.splice(this.segments.indexOf(obj), 1);
        } else if (obj instanceof Mushroom) {
            this.mushrooms.splice(this.mushrooms.indexOf(obj), 1);
        } else if (obj instanceof Flea || obj instanceof Scorpion) {
            this.monsters = [];
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
        this.allObjects().forEach((obj) => {
            obj.move();
        })
        this.collision();
        if(this.segments.length === 0) {
            this.level += 1;
            this.setCentipede();
        }
        this.setMonster();
    }

    setMonster() {
        if(this.monsters.length === 0) {
            let randNum = Math.floor(Math.random() * 100);
            if(randNum === 13) {
                if(this.mushrooms.length <= 20 && this.monsters.length === 0) {
                    this.setFlea();
                } else {
                    this.setScorpion();
                }
            }
        }
    }

    setFlea() {
        let posX = Math.floor(Math.random() * (this.DIM_X - 35) + 20);
        let posY = 0;
        this.monsters.push(new Flea(this.context, this.DIM_X, this.DIM_Y, posX, posY, this));
    }

    setScorpion() {
        // let randNum = Math.floor(Math.random() * (100)) + 1;
        let posX = this.DIM_X;
        // if(randNum % 2 === 0 ? poxX = 0 : posX = this.DIM_X);
        let posY = Math.floor(Math.random() * (this.DIM_Y - 130)) + 80;
        this.monsters.push(new Scorpion(this.context, this.DIM_X, this.DIM_Y, posX, posY, this));
    }

    draw() {
        this.canvas.draw();

        this.allObjects().forEach((obj) => {
            obj.draw(this.context);
        })
        this.context.fillStyle = "grey";
        this.context.font = "20px Comic Sans MS";
        this.context.fillText(`Level ${this.level}  Lives: ${this.lives}`, 20, 30);
        this.context.fillText(`Points: ${this.points}`, 380, 30);
    }

    checkPoints() {
        if(Math.floor(this.points / 10000) > this.lives_gained) {
            this.lives += 1;
            this.lives_gained += 1;
        }
    }
}

module.exports = Game;