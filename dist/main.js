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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/canvas.js":
/*!***********************!*\
  !*** ./lib/canvas.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Canvas {\n    constructor(context, width, height) {\n        this.context = context;\n        this.width = width;\n        this.height = height;\n    }\n\n    draw() {\n        this.context.fillStyle = \"#000000\";\n        this.context.beginPath();\n        this.context.fillRect(0, 0, this.width, this.height);\n    }\n}\n\nmodule.exports = Canvas;\n\n//# sourceURL=webpack:///./lib/canvas.js?");

/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Canvas = __webpack_require__(/*! ./canvas */ \"./lib/canvas.js\");\nconst Player = __webpack_require__(/*! ./player */ \"./lib/player.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./lib/moving_object.js\");\n\nclass Game {\n    constructor(context) {\n        this.DIM_X = 500;\n        this.DIM_Y = 750;\n        this.BG_COLOR = \"#000000\";\n        this.context = context;\n        this.isRunning = false;\n        this.canvas = new Canvas(this.context, this.DIM_X, this.DIM_Y);\n    }\n\n    // draw(ctx) {\n    //     ctx.clearRect(0, 0, this.width, this.height);\n    //     ctx.fillStyle = this.BG_COLOR;\n    //     ctx.fillRect(0, 0, this.width, this.height);\n    // }\n    start() {\n        this.isRunning = true;\n        this.runGameLoop();\n    }\n\n    runGameLoop() {\n        if(this.isRunning) {\n            this.updateGameState();\n            this.draw();\n            let me = this;\n            window.setInterval(() => {\n                me.runGameLoop();\n            }, 1000);\n        }\n    }\n\n    updateGameState() {\n        console.log(\"updateGameState\");\n    }\n\n    draw() {\n        console.log(\"drawl\");\n        this.canvas.draw();\n    }\n    \n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./lib/game.js?");

/***/ }),

/***/ "./lib/moving_object.js":
/*!******************************!*\
  !*** ./lib/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class MovingObject {\n    constructor(options) {\n        this.pos = options.pos;\n        this.vel = options.vel;\n        this.radius = options.radius;\n        this.color = options.color;\n    }\n\n    draw(ctx) {\n        ctx.fillStyle = this.color;\n        ctx.beginPath();\n        ctx.arc(95,50,40,0,2* Math.PI);\n        ctx.fill();\n    }\n\n    move() {\n        offsetX = this.vel[0];\n        offsetY = this.vel[1];\n\n        this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];\n    }\n}\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./lib/moving_object.js?");

/***/ }),

/***/ "./lib/player.js":
/*!***********************!*\
  !*** ./lib/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Player {\n    constructor(x, y) {\n        this.x = x;\n        this.y = y;\n    }\n\n    \n\n    move() {\n        this.y -= 1;\n    }\n}\n\nmodule.exports = Player;\n\n//# sourceURL=webpack:///./lib/player.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ../lib/game */ \"./lib/game.js\");\nconst MovingObject = __webpack_require__(/*! ../lib/moving_object */ \"./lib/moving_object.js\");\n\nconst What = new MovingObject({pos: [0,0], vel: [0,1], radius: 10, color: \"#ff0000\"});\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    const canvas = document.getElementById(\"centipede\");\n    const ctx = canvas.getContext(\"2d\");\n    const game = new Game(ctx);\n    game.start();\n\n    canvas.width = game.DIM_X;\n    canvas.height = game.DIM_Y;\n\n    What.draw(ctx);\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });