const CentipedeSegment = require("./centipede-segment");
const Mushroom = require("./mushroom");

class CentipedeWhole {
    constructor() {
        this.segments = [];
    }

    setCentipede() {
        console.log("creating whole centipede");
        let x = 15;
        for(let i = 0; i < 12; i++) {
            let centipedeSegment = new CentipedeSegment(this.context, this.DIM_X, this.DIM_Y, x, 15, this);
            if(i === 11) {
                centipedeSegment.head = true;
            } else {
                centipedeSegment.head = false;
            }
            this.segments.push(centipedeSegment);
            x += 24;
        }
        console.log(`Centipede: ${this.segments}`)
    }

    move() {
        console.log("moving whole centipede");
        this.segments.forEach(segment => {
            segment.move();
        })
    }

    draw() {
        console.log("drawing whole centipede");
        this.segments.forEach(segment => {
            segment.move();
        })
    }
}

module.exports = CentipedeWhole;