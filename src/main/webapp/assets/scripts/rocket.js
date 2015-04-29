/**
 * Created by wbzhao on 15/4/28.
 */

var Rocket = {

    rocketPositionIndex: undefined,
    rocket: undefined,

    routes: {
        '1': [  {x: 30,     y: 770,     rotate: 45},
                {x: 40,     y: 765,     rotate: 45},
                {x: 50,     y: 755,     rotate: 45},
                {x: 60,     y: 745,     rotate: 45},
                {x: 70,     y: 735,     rotate: 45},
                {x: 80,     y: 725,     rotate: 45},
                {x: 90,     y: 715,     rotate: 45}
            ],
        '2': [  {x: 200,    y: 380,     rotate: -10},
                {x: 190,    y: 370,     rotate: -5},
                {x: 185,    y: 350,     rotate: 0},
                {x: 182,    y: 330,     rotate: 0},
                {x: 180,    y: 310,     rotate: 0},
                {x: 180,    y: 290,     rotate: 0},
                {x: 180,    y: 270,     rotate: 3},
                {x: 183,    y: 250,     rotate: 4},
                {x: 185,    y: 230,     rotate: 9},
                {x: 186,    y: 210,     rotate: 20},
                {x: 190,    y: 190,     rotate: 30},
                {x: 196,    y: 170,     rotate: 40},
                {x: 205,    y: 150,     rotate: 48},
                {x: 226,    y: 130,     rotate: 54},
                {x: 236,    y: 115,     rotate: 60},
                {x: 256,    y: 106,     rotate: 62},
                {x: 273,    y: 96,      rotate: 67},
                {x: 283,    y: 89,      rotate: 71}
            ],
        '3': [],
        '4': []
    },

    init: function(pIndex) {
        this.rocketPositionIndex = pIndex;
        this.rocket = $("#rocket");
        $(this.rocket).queue(function(next){
            $(this).css(Rocket.routes[pIndex][0]);
            next();
        }).fadeIn();

    },

    travel: function() {
        var step;
        var route;
        route = this.routes[this.rocketPositionIndex];
        this.init(this.rocketPositionIndex);
        for (step = 1; step < route.length; step++) {
            $(Rocket.rocket).transit({x: route[step].x, y: route[step].y, rotate: route[step].rotate}, 500 / route.length);
        }
        planets[Rocket.rocketPositionIndex - 1].unlock();
        Rocket.rocketPositionIndex++;
        return this;
    }
};
