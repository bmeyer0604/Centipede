/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const Util = {
    inherits(childClass, parentClass) {
    },

    dist(pos1, pos2) {
        return Math.sqrt(
            Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
        );
    }
}

module.exports = Util;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);
const MovingObject = __webpack_require__(4);

class Laser {
    constructor(context, canvasWidth, canvasHeight, player, game) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.player = player;
        this.game = game;
        this.x = this.player.x + player.radius;
        this.y = this.player.y + 2;
        this.radius = 1;
        this.velocityX = 0;
        this.velocityY = 0.55;
    }

    draw(ctx) {
        ctx.fillStyle = "#FFFF00";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, 2* Math.PI);
        // (x, y, radius, start angle, end angle)
        ctx.fill();
    }

    isCollidedWith(otherObj) {
        const centerDist = Util.dist([this.x, this.y], [otherObj.x, otherObj.y]);
        return centerDist < (this.radius + otherObj.radius)
    }

    collideWith(otherObj) {
    }

    move() {
            this.y -= this.velocityY;
            if (this.y < 2) {
                this.game.remove(this);
            }
    }

    remove() {
        this.game.remove(this);
    }
}

module.exports = Laser;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Laser = __webpack_require__(1);
const Util = __webpack_require__(0);

const mushroom = new Image();
mushroom.src = "./images/mushroom.png";

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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Laser = __webpack_require__(1);
const Mushroom = __webpack_require__(2);
const Util = __webpack_require__(0);
// Centipede segment

const segment = new Image();
segment.src = "./images/centipede-body.png";
const segmentReverse = new Image();
segmentReverse.src = "./images/centipede-body-reverse.png";
const segmentDown = new Image();
segmentDown.src = "./images/centipede-down.png";
const headSeg = new Image();
headSeg.src = "./images/centipede-head.png";
const headSegReverse = new Image();
headSegReverse.src = "./images/centipede-head-reverse.png";
const headDown = new Image();
headDown.src = "./images/head-down.png";

const centipedeDeath = new Audio("./sfx/centipedeDeath.mp4");

class CentipedeSegment {
    constructor(context, canvasWidth, canvasHeight, x, y, game, head=false) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.game = game;
        this.head = false;

        this.velocityX = .15;
        this.velocityY = 25;

        this.x = x;
        this.y = y;
        this.sourceWidth = 8;
        this.sourceHeight = 8;
        this.width = 24;
        this.height = 24;
        this.sourceX = 0;
        this.sourceY = 0;
        this.radius = 12;

        this.angry = false;
        this.head = head;

        if(this.head) {
            this.image = headSeg;
        } else {
            this.image = segment;
        }

        this.frames = 0;
    }

    draw() {
        this.frames += 1;
        if(this.angry) {
            if(this.frames % 150 === 0) {
                this.frames = 0;
                this.sourceX = 0;
                this.sourceY = (this.sourceY + this.sourceHeight) % 16;
            }
        } else {
            if(this.frames === 300) {
                this.frames = 0;
                this.sourceY = 0;
                this.sourceX = (this.sourceX + this.sourceWidth) % 32;
            }
        }
        // (img, sx, sy, sw, sh, dx, dy, dw, dh)
        this.context.drawImage(
            this.image, this.sourceX, this.sourceY, this.sourceWidth, 
            this.sourceHeight, this.x, this.y, this.width, this.height
        );
    }

    move() {
            if(this.angry) this.y += this.velocityY;
            
            this.x += this.velocityX;
            if (this.y < 0) {
                this.y = 0;
                this.velocityY = -this.velocityY;
            } else if (this.y > this.canvasHeight - 24) {
                this.y = this.canvasHeight - 24;
                this.velocityY = -25;
                this.velocityX = .15;
                this.angry = false;
                this.head ? this.image = headSeg : this.image = segment;
            } else if (this.x < 15) {
                if(this.angry) {
                    this.y += this.velocityY;
                } else {
                    this.x = 15;
                    this.y += this.velocityY;
                    this.velocityX = -this.velocityX;
                    this.head ? this.image = headSeg : this.image = segment;
                }
            } else if (this.x > this.canvasWidth - 15) {
                if(this.angry) {
                    this.y += this.velocityY;
                } else {
                    this.x = this.canvasWidth - 15;
                    this.y += this.velocityY;
                    this.velocityX = -this.velocityX;
                    this.head ? this.image = headSegReverse : this.image = segmentReverse;
                }
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
            centipedeDeath.play();
            this.head ? this.game.points += 100 : this.game.points += 10;
            this.game.checkPoints();
        } else if(otherObj instanceof Mushroom) {
            if(otherObj.poisoned) {
                this.angry = true;
                this.head ? this.image = headDown : this.image = segmentDown;
                this.velocityY = .4;
                this.velocityX = 0;
            } else if(this.angry) {
                this.y += this.velocityY;
            } else {
                this.y += this.velocityY;
                this.velocityX = -this.velocityX;
                if(otherObj.x < this.x) {
                    this.head ? this.image = headSeg : this.image = segment;
                    this.x = otherObj.x + otherObj.width + 1;
                } else if(otherObj.x > this.x) {
                    this.head ? this.image = headSegReverse : this.image = segmentReverse;
                    this.x = otherObj.x - this.width - 1;
                } else if(otherObj.y > this.y + this.height) {
                    this.y = otherObj.y + this.height + 1;
                }
            }
        } else if(otherObj instanceof CentipedeSegment && !this.angry && !otherObj.angry) {
            if(otherObj.x > this.x && this.velocityX < 0) {
                this.x = otherObj.x - this.width - 1;
            } else if(otherObj.x < this.x && this.velocityX > 0) {
                this.x = otherObj.x + otherObj.width + 1;
            }
        }
    }

    remove() {
        this.game.mushrooms.push(new Mushroom(this.context, this.canvasWidth, this.canvasHeight, this.x, this.y, this.game));
        this.game.remove(this);
    }
}

module.exports = CentipedeSegment;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

class MovingObject {
    constructor(options) {
        this.pos = options.pos;
        this.vel = options.vel;
        this.radius = options.radius;
        this.color = options.color;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(95,50,40,0,2* Math.PI);
        ctx.fill();
    }

    move() {
        offsetX = this.vel[0];
        offsetY = this.vel[1];

        this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    }
}

module.exports = MovingObject;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Laser = __webpack_require__(1);
const Mushroom = __webpack_require__(2);
const Util = __webpack_require__(0);

const flea = new Image();
flea.src = "./images/flea.png";

const bugDeath = new Audio("./sfx/bugDeath.mp4");

class Flea {
    constructor(context, canvasWidth, canvasHeight, x, y, game) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.game = game;

        this.image = flea;
        this.x = x;
        this.y = y;
        this.sourceWidth = 9;
        this.sourceHeight = 8;
        this.width = 27;
        this.height = 24;
        this.sourceX = 0;
        this.sourceY = 0;
        this.radius = 14;

        this.velocityY = .5;
        this.slow = true;

        this.frames = 0;
    }

    draw() {
        this.frames += 1;
        if(this.frames === 300) {
            this.frames = 0;
            this.sourceY = (this.sourceY + this.sourceHeight) % 16
        }
        // (img, sx, sy, sw, sh, dx, dy, dw, dh)
        this.context.drawImage(
            this.image, this.sourceX, this.sourceY, this.sourceWidth, 
            this.sourceHeight, this.x, this.y, this.width, this.height
        );
    }

    move() {
        this.y += this.velocityY;
        let randNum = Math.floor(Math.random() * 1400);
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
                bugDeath.play();
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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Laser = __webpack_require__(1);
const Mushroom = __webpack_require__(2);
const Util = __webpack_require__(0);

const scorpion = new Image();
scorpion.src = "./images/scorpion.png";

const bugDeath = new Audio("./sfx/bugDeath.mp4");

class Scorpion {
    constructor(context, canvasWidth, canvasHeight, x, y, game) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.game = game;

        this.image = scorpion;
        this.x = x;
        this.y = y;
        this.sourceWidth = 16;
        this.sourceHeight = 8;
        this.width = 50;
        this.height = 25;
        this.sourceX = 0;
        this.sourceY = 0;
        this.radius = 30;

        this.velocityX = -.1;

        this.frames = 0;
    }

    draw() {
        this.frames += 1;
        if(this.frames === 300) {
            this.frames = 0;
            this.sourceX = (this.sourceX + this.sourceWidth) % 64
        }
        // (img, sx, sy, sw, sh, dx, dy, dw, dh)
        this.context.drawImage(
            this.image, this.sourceX, this.sourceY, this.sourceWidth, 
            this.sourceHeight, this.x, this.y, this.width, this.height
        );
    }

    move() {
        this.x += this.velocityX;
        if (this.x < 0) {
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
            bugDeath.play();
            this.game.points += 1000;
            this.game.checkPoints();
        } else if(otherObj instanceof Mushroom) {
            otherObj.poisoned = true;
            otherObj.sourceY = 8;
        }
    }

    remove() {
        this.game.remove(this);
    }
}

module.exports = Scorpion;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const Mushroom = __webpack_require__(2);
const Laser = __webpack_require__(1);
const Util = __webpack_require__(0);

const spider = new Image();
spider.src = "./images/spider.png";

const bugDeath = new Audio("./sfx/bugDeath.mp4");

class Spider {
    constructor(context, canvasWidth, canvasHeight, x, y, game) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.game = game;

        this.image = spider;
        this.x = x;
        this.y = y;
        this.sourceWidth = 16;
        this.sourceHeight = 8;
        this.width = 48;
        this.height = 24;
        this.sourceX = 0;
        this.sourceY = 0;
        this.radius = 20;

        this.velocityX = .25;
        if(this.x !== 0) this.velocityX = -.25;
        this.velXTemp = this.velocityX;
        this.velocityY = .4;

        this.frames = 0;
    }

    draw() {
        this.frames += 1;
        if(this.frames === 200) {
            this.sourceX = (this.sourceX + this.sourceWidth) % 64;
        }
        // (img, sx, sy, sw, sh, dx, dy, dw, dh)
        this.context.drawImage(
            this.image, this.sourceX, this.sourceY, this.sourceWidth, 
            this.sourceHeight, this.x, this.y, this.width, this.height
        );
    }

    checkBounds() {
        if(this.y > this.canvasHeight - this.height) {
            this.y = this.canvasHeight - this.height;
        }
    }

    move() {
        if(this.frames % 300 === 0) {
            this.velocityY = -this.velocityY;
        } else if(this.frames % 1000 === 0) {
            this.velocityX = this.velXTemp;
            this.frames = 0;
        }
        Math.random() <= .5 ? this.velocityX = 0 : this.velocityX = this.velXTemp;

        this.x += this.velocityX;
        this.y += this.velocityY;
        this.checkBounds();
        if (this.x > this.canvasWidth + 100 || this.x < -100) {
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
            bugDeath.play();
            this.game.points += 600;
            this.game.checkPoints();
        } else if(otherObj instanceof Mushroom) {
            if(Math.random() > 0.8) otherObj.remove();
        }
    }

    remove() {
        this.game.remove(this);
    }
}

module.exports = Spider;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(9);

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("centipede");
    const ctx = canvas.getContext("2d");
    const game = new Game(ctx);
    game.start();
})

//This is a comment

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(10);
const Player = __webpack_require__(11);
const MovingObject = __webpack_require__(4);
const CentipedeSegment = __webpack_require__(3);
const Flea = __webpack_require__(5);
const Scorpion = __webpack_require__(6);
const Spider = __webpack_require__(7);
const Mushroom = __webpack_require__(2);
const Laser = __webpack_require__(1);
const Util = __webpack_require__(0);

class Game {
    constructor(context) {
        this.DIM_X = 500;
        this.DIM_Y = 750;
        this.context = context;
        this.isRunning = false;
        this.gameView = new GameView(this.context, this.DIM_X, this.DIM_Y);
        this.player = new Player(this.context, this.DIM_X, this.DIM_Y, this);
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

        this.bindKeyboardInput();

        this.paused = false;
    }

    bindKeyboardInput() {
        window.addEventListener("keydown", event => {
            if(event.code === "Escape") {
                this.isRunning ? this.isRunning = false : this.isRunning = true;
                this.paused = !this.paused;
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
        for(let i = 0; i < 30; i++) {
            let randX = Math.round((Math.random() * (this.DIM_X - 70) + 25) / 55) * 55;
            let randY = Math.round((Math.random() * (this.DIM_Y * 0.66 - 38) + 45) / 55) * 55;
            // Math.round((Math.random()*(max-min)+min)/10)*10;

            while(this.mushrooms.some(mushroom => Util.dist([randX, randY], [mushroom.x, mushroom.y]) < 28)) {
                randX = Math.round((Math.random() * (this.DIM_X - 70) + 25) / 55) * 55;
                randY = Math.round((Math.random() * (this.DIM_Y * 0.66 - 38) + 45) / 55) * 55;
            }

            const mushroom = new Mushroom(this.context, this.DIM_X, this.DIM_Y, randX, randY, this);
            this.mushrooms.push(mushroom);
        }
    }

    setCentipede() {
        let x = 20;
        for(let i = 0; i < 12; i++) {
            let newSegment;

            if(i === 11) {
                newSegment = new CentipedeSegment(this.context, this.DIM_X, this.DIM_Y, x, 15, this, true);
            } else {
                newSegment = new CentipedeSegment(this.context, this.DIM_X, this.DIM_Y, x, 15, this);
            }

            this.segments.push(newSegment);
            x += 25;
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
            let randNum = Math.floor(Math.random() * 1000);
            if(randNum === 13) {
                if(this.mushrooms.length <= 15 && this.monsters.length === 0) {
                    this.setFlea();
                } else {
                    Math.random() >= 0.5 ? this.setSpider() : this.setScorpion();
                }
            }
        }
    }

    setFlea() {
        let randX = Math.round((Math.random() * (this.DIM_X - 50) + 20) / 65) * 65;
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
            this.context.fillStyle = "yellow";
            this.context.font = "48px Arial";
            this.context.fillText(`Pause`, this.DIM_X * .45, this.DIM_Y * .5);
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
            this.paused = false
        })

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

/***/ }),
/* 10 */
/***/ (function(module, exports) {

class GameView {
    constructor(context, width, height) {
        this.context = context;
        this.width = width;
        this.height = height;
    }

    draw() {
        this.context.fillStyle = "#000000";
        this.context.beginPath();
        this.context.fillRect(0, 0, this.width, this.height);
    }
}

module.exports = GameView;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const CentipedeSegment = __webpack_require__(3);
const Flea = __webpack_require__(5);
const Scorpion = __webpack_require__(6);
const Spider = __webpack_require__(7);
const Mushroom = __webpack_require__(2);
const Laser = __webpack_require__(1);
const Util = __webpack_require__(0);

const ship = new Image();
ship.src = "./images/ship.png";
const playerHeight = 35;
const playerWidth = 28;

const laserBlast = new Audio("./sfx/laser.mp4");
const explosion = new Audio("./sfx/explosion.mp4");

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

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map