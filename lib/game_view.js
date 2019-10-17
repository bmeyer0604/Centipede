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