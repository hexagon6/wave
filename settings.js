//settings.js

"use strict";

var js = {
    settings: true
};

var settings = {
    version: '0.4',
    date: '2015-02-23',
    algorithms: {
        'GH': {
            neighborhood: {
                type: 'neumann', //neumann or moore
                r: 1 //distance
            },
        },
        'TT' : {
            neighborhood: {
                type: 'random',
                r: 1
            }
        }
    },
    algorithm: 'TT',
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
        max: 8
    },
    grid: {
        lines: false
    },
    intro: true,
    touched: false,
    ready: false,
    save: false,
    speed: 125,
    steps: 4,
    verbose: false   
}

