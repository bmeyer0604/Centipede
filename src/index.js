const Game = require("../lib/game");
const MovingObject = require("../lib/moving_object");

const What = new MovingObject({pos: [0,0], vel: [0,1], radius: 4, color: "#ff0000"});

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("centipede");
    const ctx = canvas.getContext("2d");
    const game = new Game(ctx);
    game.start();

    canvas.width = game.DIM_X;
    canvas.height = game.DIM_Y;

    What.draw(ctx);
})