// Main program
import Controls from './Controls.html';

var greenberg_hastings;
var random_algorithm;
var game_of_life;

function returnDetailArr() {
    var details = [];
    for (var i = 1; i <= settings.detail.max; i++){
        details.push(i);
    }
    return details;
}

function getSelectedAlgorithm() {
    var ops = app.refs.algorithm.children;
    for(var o in ops) {
        if(ops[o].selected){
            return ops[o].value;
        }
    }
}

var settings = {
    version: '0.7',
    date: '2016-12-04',
    algorithm_state: 0,
    canvas: {
        size: 640
    },
    clock: {
        state: false
    },
    cycle: 0,
    debug: false,
    detail: {
        initial: 4,
        max: 9
    },
    grid: {
        lines: false
    },
    intro: true,
    touched: false,
    ready: false,
    save: false,
    speed: 75,
    steps: 3,
    verbose: false,
    state: 'wave'
};

var app = new Controls({
    target: document.querySelector('main'),
    data: {
        name: 'world',
        detail: returnDetailArr(),
        settings: settings,
        algorithms: [
            {
                key: 'GH',
                name: 'Greenberg-Hastings',
                method: greenberg_hastings,
                neighborhood: [ //uses per default 'von neumann neighboorhood' with r = 1
                    {
                        type: 'neumann',
                        radius: [1, 2, 3]
                    },
                    {
                        type: 'moore',
                        radius: [1, 2]
                    },
                    {
                        type: 'neumann_moore',
                        radius: [1],
                        states: 2
                    },
                    {
                        type: 'schmirdn',
                        radius: [1, 2, 3]
                    }
                ]
            },
            {
                key: 'TT',
                name: 'Random',
                method: random_algorithm,
                neighborhood: [
                    {
                        type: 'random',
                        radius: [1, 2, 3, 4]
                    }
                ]
            },
            {
                key: 'GoL',
                name: 'Game of Life',
                method: game_of_life,
                neighborhood: [
                    {
                        type: 'moore',
                        radius: [1]
                    }
                ]
            }
        ],
    }
});