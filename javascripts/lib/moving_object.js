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