const Game = require("../lib/game");

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("centipede");
    const ctx = canvas.getContext("2d");
    const game = new Game(ctx);
    game.start();

    canvas.width = game.DIM_X;
    canvas.height = game.DIM_Y;
})