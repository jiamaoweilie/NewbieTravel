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
        '3': [  {x: 760,    y: 225,     rotate: 100},
                {x: 780,    y: 230,     rotate: 100},
                {x: 800,    y: 235,     rotate: 100},
                {x: 820,    y: 238,     rotate: 100},
                {x: 840,    y: 243,     rotate: 100},
                {x: 860,    y: 247,     rotate: 100},
                {x: 880,    y: 253,     rotate: 99},
                {x: 900,    y: 258,     rotate: 97},
                {x: 920,    y: 263,     rotate: 96}
        ],
        '4': [  {x: 1220,   y: 234,     rotate: 119},
                {x: 1230,   y: 235,     rotate: 125},
                {x: 1245,   y: 241,     rotate: 130},
                {x: 1260,   y: 253,     rotate: 135},
                {x: 1270,   y: 263,     rotate: 138},
                {x: 1283,   y: 273,     rotate: 146},
                {x: 1306,   y: 293,     rotate: 163},
                {x: 1310,   y: 313,     rotate: 172},
                {x: 1319,   y: 343,     rotate: 180},
                {x: 1319,   y: 371,     rotate: 193},
                {x: 1318,   y: 400,     rotate: 205},
                {x: 1308,   y: 439,     rotate: 223},
                {x: 1292,   y: 459,     rotate: 230},
                {x: 1273,   y: 475,     rotate: 232},
                {x: 1257,   y: 490,     rotate: 236},
                {x: 1240,   y: 500,     rotate: 238},
                {x: 1233,   y: 506,     rotate: 240},
                {x: 1225,   y: 510,     rotate: 240},
                {x: 1224,   y: 514,     rotate: 243},
                {x: 1220,   y: 518,     rotate: 244},
                {x: 1213,   y: 522,     rotate: 245},
                {x: 1205,   y: 526,     rotate: 245},
                {x: 1198,   y: 530,     rotate: 247},
                {x: 1190,   y: 535,     rotate: 247}
        ],
        '5': [  {x: 830,    y: 703,     rotate: 235},
                {x: 818,    y: 710,     rotate: 230},
                {x: 810,    y: 714,     rotate: 225},
                {x: 803,    y: 718,     rotate: 220},
                {x: 798,    y: 722,     rotate: 215},
                {x: 793,    y: 726,     rotate: 210},
                {x: 787,    y: 730,     rotate: 205},
                {x: 783,    y: 735,     rotate: 200},
                {x: 779,    y: 740,     rotate: 195},
                {x: 772,    y: 760,     rotate: 188},
                {x: 765,    y: 780,     rotate: 180},
                {x: 765,    y: 810,     rotate: 180},
                {x: 765,    y: 850,     rotate: 180},
                {x: 765,    y: 890,     rotate: 180}
        ]
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
        if (this.rocketPositionIndex < 6) {
            route = this.routes[this.rocketPositionIndex];
            this.init(this.rocketPositionIndex);
            for (step = 1; step < route.length; step++) {
                $(Rocket.rocket).transit({x: route[step].x, y: route[step].y, rotate: route[step].rotate}, 500 / route.length);
            }
            if (Rocket.rocketPositionIndex < 5)
                planets[Rocket.rocketPositionIndex - 1].unlock();
            Rocket.rocketPositionIndex++;
        }
        return this;
    }
};
