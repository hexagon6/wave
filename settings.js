//settings.js

"use strict";

var js = {
    settings: true
};

var settings = {
    version: 'GoLv1',
    date: '2016-10-21',
    algorithms: {
        'GoL' : {
            neighborhood: {
                type: 'moore'
            }
        }
    },
    algorithm: 'GoL', // default algorithm
    canvas: {
        size: 640
    },
    clock: {
        state: false
    },
    cycle: 0,
    debug: false,
    detail: {
        initial: 6,
        max: 9
    },
    grid: {
        lines: false
    },
    intro: true,
    touched: false,
    ready: true,
    save: false,
    speed: 50,
    steps: 2, //corresponds to 'two' colorset
    verbose: false,
    state: 'wave'
}
