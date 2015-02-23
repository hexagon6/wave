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

var clock;
var clock_state = settings.clock.state;
var speed = settings.speed; //interval time in ms
var verbose = settings.verbose;

var algorithms = {
    'GH': { //greenberg-hastings
        name: 'Greenberg-Hastings',
        neighborhood: { //uses normally von neumann neighboorhood with r = 1
            neumann: [1, 2, 3],
            moore: [1, 2],
            schmirdn: [1, 2, 3],
            random: [1, 2, 3, 4]
        }
    }
}

function get_neighbors(m, x, y, def) {
    var nb = {}; 
    for (var key in def) {
        nb[key] = get_neighbor(m, x, y, def[key][0], def[key][1]);
    }
    return nb;
}

function get_neighbor(m, x, y, delta_x, delta_y) {
    var pos_x, pos_y; 
    if (delta_x < 0) {
        pos_x = (x + delta_x < 0) && matrix.size + delta_x || x + delta_x;
    } else if (delta_x > 0){
        pos_x = (x + delta_x) % (matrix.size);
    } else {
        pos_x = x;
    }
    if (delta_y < 0) {
        pos_y = (y + delta_y < 0) && matrix.size + delta_y || y + delta_y;
    } else if (delta_y > 0){
        pos_y = (y + delta_y) % (matrix.size);
    } else {
        pos_y = y;
    }
    return parseInt(m[pos_x][pos_y], 10);
}

function rand(){
    return Math.floor(Math.random()*3-1);
}

function nb_random(m, x, y, r){
    if(r === 1) {
        return get_neighbors(m, x, y, {
            W: [rand(), rand()],
        });
    } else if(r === 2) {
        return get_neighbors(m, x, y, {
            W: [rand(), rand()],
            E: [rand(), rand()],
        });
    } else if(r === 3) {
        return get_neighbors(m, x, y, {
            W: [rand(), rand()],
            E: [rand(), rand()],
            N: [rand()*2, rand()*2],
        });
    } else if(r === 4) {
        return get_neighbors(m, x, y, {
            W: [rand(), rand()],
            E: [rand(), rand()],
            N: [rand(), rand()],
            S: [rand()*4, rand()*4],
        });
    }
}

function schmirdn(m, x, y, r){
    if(r === 1) {
        return get_neighbors(m, x, y, {
            W: [-1, 0],
            E: [1, 0],
            N: [0, -1],
            S: [0, 1],
            NW: [-1, -1],
            NE: [1, -1],
            SW: [-1, 1],
            SE: [1, 1],
            WW: [-2, 0],
            EE: [2, 0],
            NN: [0, -2],
            SS: [0, 2],
            NNWW: [-2, -2],
            NWWW: [3, -1],
            NNW: [-1, -2],
            NNE: [1, -2],
            NNEE: [2, -2],
            NNNE: [1, -3],
            NEEE: [-3, -1],
            NWW: [-2, -1],
            NNNW: [-1, -3],
            NEE: [2, -1],
            SWW: [-2, 1],
            SSWW: [-2, 2],
            SSSW: [-1, 3],
            SWWW: [-3, 1],
            SEE: [2, 1],
            SEEE: [3, 1],
            SSEE: [2, 2],
            SSSE: [1, 3],
            SSW: [-1, 2],
            SSE: [1, 2],
            WWW: [-3, 0],
            EEE: [3, 0],
            NNN: [0, -3],
            SSS: [0, 3],
        });
    } else if (r === 2){
        return get_neighbors(m, x, y, {
            /*W: [-1, 0],
            E: [1, 0],
            N: [0, -1],
            S: [0, 1],*/
            NW: [-1, -1],
            NE: [1, -1],
            SW: [-1, 1],
            SE: [1, 1],
            WW: [-2, 0],
            EE: [2, 0],
            NN: [0, -2],
            SS: [0, 2],/*
            NNWW: [-2, -2],
            NWWW: [3, -1],
            NNW: [-1, -2],
            NNE: [1, -2],
            NNEE: [2, -2],
            NNNE: [1, -3],
            NEEE: [-3, -1],
            NWW: [-2, -1],
            NNNW: [-1, -3],
            NEE: [2, -1],
            SWW: [-2, 1],
            SSWW: [-2, 2],
            SSSW: [-1, 3],
            SWWW: [-3, 1],
            SEE: [2, 1],
            SEEE: [3, 1],
            SSEE: [2, 2],
            SSSE: [1, 3],
            SSW: [-1, 2],*/
            //SSE: [1, 2],
            WWW: [-3, 0],
            EEE: [3, 0],
            NNN: [0, -3],
            SSS: [0, 3],
        });
    } else if (r === 3){
        return get_neighbors(m, x, y, {
            W: [-1, 0],
            E: [1, 0],
            N: [0, -1],
            S: [0, 1],
            NW: [-1, -1],
            NE: [1, -1],
            SW: [-1, 1],
            SE: [1, 1],
            WW: [-2, 0],
            EE: [2, 0],
            NN: [0, -2],
            SS: [0, 2],
            NNWW: [-2, -2],
            NNW: [-1, -2],
            NNE: [1, -2],
            NNEE: [2, -2],
            NWW: [-2, -1],
            NEE: [2, -1],
            SWW: [-2, 1],
            SSWW: [-2, 2],
            SEE: [2, 1],
            SSEE: [2, 2],
            SSW: [-1, 2],
            SSE: [1, 2],
            WWW: [-3, 0],
            EEE: [3, 0],
            NNN: [0, -3],
            SSS: [0, 3],
        });
    }
}

function von_neumann(m, x, y, r){
    var neb = {};
    r = r || 1;
    if (r === 1){
        neb = {
            W: [-1, 0],
            E: [1, 0],
            N: [0, -1],
            S: [0, 1]
        };
        return get_neighbors(m, x, y, neb);
    } else if (r === 2) {
        return get_neighbors(m, x, y, {
            W: [-1, 0],
            E: [1, 0],
            N: [0, -1],
            S: [0, 1],
            NW: [-1, -1],
            NE: [1, -1],
            SW: [-1, 1],
            SE: [1, 1],
            WW: [-2, 0],
            EE: [2, 0],
            NN: [0, -2],
            SS: [0, 2]
        });
    } else if (r === 3) {
        return get_neighbors(m, x, y, {
            W: [-1, 0],
            E: [1, 0],
            N: [0, -1],
            S: [0, 1],
            NW: [-1, -1],
            NE: [1, -1],
            SW: [-1, 1],
            SE: [1, 1],
            WW: [-2, 0],
            EE: [2, 0],
            NN: [0, -2],
            SS: [0, 2],
            NNW: [-1, -2],
            NNE: [1, -2],
            NWW: [-2, -1],
            NEE: [2, -1],
            SWW: [-2, 1],
            SEE: [2, 1],
            SSW: [-1, 2],
            SSE: [1, 2],
            WWW: [-3, 0],
            EEE: [3, 0],
            NNN: [0, -3],
            SSS: [0, 3],
        });
    }
}

function moore(m, x, y, r){
    r = r || 1;
    if (r === 1){
        return get_neighbors(m, x, y, {
            W: [-1, 0],
            E: [1, 0],
            N: [0, -1],
            S: [0, 1],
            NW: [-1, -1],
            NE: [1, -1],
            SW: [-1, 1],
            SE: [1, 1]
        });
    } else if (r === 2){
        return get_neighbors(m, x, y, {
            W: [-1, 0],
            E: [1, 0],
            N: [0, -1],
            S: [0, 1],
            NW: [-1, -1],
            NE: [1, -1],
            SW: [-1, 1],
            SE: [1, 1],
            WW: [-2, 0],
            EE: [2, 0],
            NN: [0, -2],
            SS: [0, 2],
            NNWW: [-2, -2],
            NNW: [-1, -2],
            NNE: [1, -2],
            NNEE: [2, -2],
            NWW: [-2, -1],
            NEE: [2, -1],
            SWW: [-2, 1],
            SSWW: [-2, 2],
            SEE: [2, 1],
            SSEE: [2, 2],
            SSW: [-1, 2],
            SSE: [1, 2]
        });
    }
}

function check_or(nb, value){
    for (var key in nb) {
        if (nb[key] === value) {
            return true;
        }
    }
    return false;
}

function check_and(nb, value){
    for (var key in nb) {
        if (nb[key] !== value) {
            return false;
        }
    }
    return true;
}

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
    if (verbose) { 
        console.log(matrix); 
    }
    var x, y, nb, r = settings.algorithm.neighborhood.r;
    for (x = 0; x < size; x++) {
        last_matrix.push(matrix.data[x].slice());
    }
    for (y = 0; y < size; y++) {  
        for (x = 0; x < size; x++) {
            if (settings.algorithm.type === 'GH') { // Greenberg-Hastings
                r = settings.algorithm.neighborhood.r || 1;
                if (settings.algorithm.neighborhood.type === 'neumann'){
                    nb = von_neumann(last_matrix, x, y, r);
                } else if (settings.algorithm.neighborhood.type === 'moore'){
                    nb = moore(last_matrix, x, y, r);
                } else if (settings.algorithm.neighborhood.type === 'schmirdn'){
                    nb = schmirdn(last_matrix, x, y, r);
                } else if (settings.algorithm.neighborhood.type === 'random'){
                    nb = nb_random(last_matrix, x, y, r);
                }
                //rule 1 and 2
                if (last_matrix[x][y] > 0) {
                    pixel(x, y);
                } else if (last_matrix[x][y] === 0) { //rule 3
                    if (check_or(nb, 1)) {
                        pixel(x, y);
                    //} else if (check_and(nb, 0)) {
                    }
                }
            }
        }
    }
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

