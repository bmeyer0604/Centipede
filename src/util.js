const Util = {
    inherits(childClass, parentClass) {
    },

    dist(pos1, pos2) {
        return Math.sqrt(
            Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
        );
    },

    // sprite(options) {
    //     var that = {};
    //     that.context = options.context;
    //     that.width = options.width;
    //     that.height = options.height;
    //     that.image = options.image;
    
    //     return that;
    // }
}

module.exports = Util;