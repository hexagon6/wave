/***
*   Author: Tobi Turing <webdev@fet.li>
*   License: 
*   The MIT License (MIT)

Copyright (c) 2015 Tobi Turing

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

//tick.js

"use strict";

//global vars
var js, settings, cycle, matrix;
var update_cycleview, log_matrix, pixel, update_speed;

js.tick = true;

if (!js.grid) {
    alert('need grid.js loaded first');
}

if (!js.algo) {
    alert('need algo.js loaded first');
}

var clock, algorithms;
var clock_state = settings.clock.state;
var speed = settings.speed; //interval time in ms
var verbose = settings.verbose;

/*
*   next_cycle
*   this function defines the way our cellular algorithm works
*/

function next_cycle() {
    if (verbose) {
        console.log('cycle: %s', cycle); 
    }
    update_cycleview(++cycle);
    var size = matrix.size;
    log_matrix(matrix.data);
    var last_matrix = [];
    if (verbose) { console.log(matrix); }

    run_algorithm(size, last_matrix);
    
    log_matrix(last_matrix);
    log_matrix(matrix.data);
}

function start_clock(speed) {
    if (!speed) {
        speed = settings.speed;
    }
    function start() {
        next_cycle();  
        if (verbose) {
            console.log('cycling..' + cycle + '. iteration'); 
        }
    }
      
    if (!clock_state) {
        clock_state = true;
        if (verbose) {
            console.log('start', speed); 
        }
        update_speed(speed);
        clock = window.setInterval(start, speed);
    }
}

function stop_clock() {
    clearInterval(clock);
    if (settings.verbose) {
        console.log('stop');
    }
    clock_state = false;
    update_speed(settings.speed);
}

