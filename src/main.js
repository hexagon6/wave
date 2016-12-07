// Main program
import settings from './settings.js';
import Controls from './Controls.html';

var greenberg_hastings;
var random_algorithm;
var game_of_life;

function getSelectedAlgorithm() {
    var ops = app.refs.algorithm.children;
    for(var o in ops) {
        if(ops[o].selected){
            return ops[o].value;
        }
    }
}

var app = new Controls({
    target: document.querySelector('controls'),
    data: {
        name: 'world',
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