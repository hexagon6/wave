//settings.js

"use strict";

var js = {
    settings: true
};

var settings = {
    version: '0.3',
    date: '2013-11-20',
    algorithm: {
        type: 'GH',
        neighborhood: {
            type: 'neumann', //neumann or moore
            r: 1 //distance
        }
    },
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
    verbose: false   
}

