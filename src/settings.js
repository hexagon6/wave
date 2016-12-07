//settings.js

let settings = {
    version: '0.7',
    date: '2016-12-07',
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

export default settings;