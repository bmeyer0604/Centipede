const GameView = require("./game_view");
const Player = require("./player");
const MovingObject = require("./moving_object");
const CentipedeSegment = require("./centipede-segment");
const Flea = require("./flea");
const Scorpion = require("./scorpion");
const Spider = require("./spider");
const Mushroom = require("./mushroom");
const Laser = require("./laser");
const Util = require("../src/util");

class Game {
    constructor(context) {
        this.DIM_X = 500;
        this.DIM_Y = 750;
        this.context = context;
        this.isRunning = false;
        this.gameView = new GameView(this.context, this.DIM_X, this.DIM_Y);
        this.player = new Player(this.context, this.DIM_X, this.DIM_Y, this);
        this.centipedeSegments = [];
        this.lasers = [];
        this.mushrooms = [];
        this.segments = [];
        this.monsters = [];

        this.level = 1;
        this.lives = 1;
        this.lives_gained = 0;
        this.points = 0;
        this.setMushrooms();
        this.setCentipede();

        this.bindKeyboardInput();

        this.paused = false;
    }

    bindKeyboardInput() {
        window.addEventListener("keydown", event => {
            if(event.code === "Escape") {
                this.isRunning ? this.isRunning = false : this.isRunning = true;
                this.paused = !this.paused;
                console.log(`Setting pause to ${this.paused}`);
                this.context.fillStyle = "yellow";
                this.context.font = "30px Arial";
                this.context.fillText(`Pause`, this.DIM_X * .4, this.DIM_Y * .5);
            }
        })
    }

    allObjects() {
        return [].concat(this.player, this.mushrooms, this.lasers, this.segments, this.monsters);
    }

    setMushrooms() {
        for(let i = 0; i < 25; i++) {
            let randX = Math.floor(Math.random() * (this.DIM_X - 50)) + 20
            let randY = Math.floor(Math.random() * (this.DIM_Y * 0.66 - 38)) + 45;

            while(this.mushrooms.some(mushroom => Util.dist([randX, randY], [mushroom.x, mushroom.y]) < 28)) {
                randX = Math.floor(Math.random() * (this.DIM_X - 50)) + 20;
                randY = Math.floor(Math.random() * (this.DIM_Y * 0.66 - 28)) + 45;
            }

            const mushroom = new Mushroom(this.context, this.DIM_X, this.DIM_Y, randX, randY, this);
            this.mushrooms.push(mushroom);
        }
    }

    setCentipede() {
        let x = 15;
        for(let i = 0; i < 12; i++) {
            this.segments.push(new CentipedeSegment(this.context, this.DIM_X, this.DIM_Y, x, 15, this));
            x += 24;
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
        } else if (obj instanceof Flea || obj instanceof Scorpion || obj instanceof Spider) {
            this.monsters = [];
        }
    }

    start() {
        this.startScreen();
    }

    runGameLoop() {
        if(this.lives === 0) {
            this.context.clearRect(0, 0, this.DIM_X, this.DIM_Y);
            this.gameView.draw();
            this.gameoverScreen();
        } else {
            if(this.isRunning) {
                this.updateGameState();
                this.draw();
                let me = this;
                window.setInterval(() => {
                    me.runGameLoop();
                }, 10);
            }
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
                    Math.random() >= 0.5 ? this.setSpider() : this.setScorpion();
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
        let posX = this.DIM_X;
        let posY = Math.floor(Math.random() * (this.DIM_Y - 130)) + 80;
        this.monsters.push(new Scorpion(this.context, this.DIM_X, this.DIM_Y, posX, posY, this));
    }

    setSpider() {
        let posX = 0;
        if(Math.random() >= .5) posX = this.DIM_X;
        let posY = Math.floor(Math.random() * (this.DIM_Y - (this.DIM_Y / 2))) + (this.DIM_Y / 3);
        this.monsters.push(new Spider(this.context, this.DIM_X, this.DIM_Y, posX, posY, this));
    }

    draw() {
        if(this.paused) console.log("Game is drawing while paused");
        this.context.clearRect(0, 0, this.DIM_X, this.DIM_Y);
        this.gameView.draw();

        this.allObjects().forEach((obj) => {
            obj.draw(this.context);
        })
        this.context.fillStyle = "#FFA500";
        this.context.font = "20px Arial";
        this.context.fillText(`Level ${this.level}  Lives: ${this.lives}`, 20, 30);
        this.context.fillText(`Points: ${this.points}`, 380, 30);

        if(this.paused) {
            console.log(this.paused);
            this.context.fillStyle = "yellow";
            this.context.font = "30px Arial";
            this.context.fillText(`Pause`, this.DIM_X * .4, this.DIM_Y * .5);
        }
    }

    checkPoints() {
        if(Math.floor(this.points / 10000) > this.lives_gained) {
            this.lives += 1;
            this.lives_gained += 1;
        }
    }

    startScreen() {
        this.gameView.draw();
        this.context.fillStyle = "yellow";
        this.context.font = "48px Arial";
        this.context.fillText(`CENTIPEDE`, this.DIM_X * .25, this.DIM_Y * .38);
        this.context.font = "24px Arial";
        this.context.fillText("Press any key to start", this.DIM_X * .28, this.DIM_Y * .5);

        document.addEventListener("keydown", () => {
            this.isRunning = true;
            this.paused = false;
            this.runGameLoop();
        })
    }

    gameoverScreen() {
        this.isRunning = false;

        this.gameView.draw();
        this.context.fillStyle = "yellow";
        this.context.font = "48px Arial";
        this.context.fillText(`GAME OVER`, this.DIM_X * .23, this.DIM_Y * .38);
        this.context.font = "26px Arial";
        this.context.fillText(`Points: ${this.points}`, this.DIM_X * .25, this.DIM_Y * .53)
        this.context.font = "24px Arial";
        this.context.fillText("Press any key to try again", this.DIM_X * .25, this.DIM_Y * .6);
        
        document.addEventListener("keydown", () => {
            this.isRunning = true;
            this.paused = false;
        })

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
}

module.exports = Game;