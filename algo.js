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

//algo.js

"use strict";

//global vars
var js;

js.algo = true;


var algorithms = {
    'GoL': {
        name: 'Game of Life',
        method: game_of_life,
    }
}

var neighborhood = {
    'neumann' : function(m, x, y){
        var neb = {};
        return get_neighbors(m, x, y, {
            W: [-1, 0], E: [1, 0],
            N: [0, -1], S: [0, 1]
        });
    },

    'moore' : function(m, x, y){
        return get_neighbors(m, x, y, {
            W: [-1, 0], E: [1, 0],
            N: [0, -1], S: [0, 1],
            NW: [-1, -1], NE: [1, -1],
            SW: [-1, 1], SE: [1, 1]
        });
    },
};


function game_of_life(nb,last_matrix,x,y){
        var cell_state = last_matrix[x][y];

        // count neighbors
        var sum = 0;
        for (var n in nb) {
            sum = sum + nb[n];
        }

        //dead cell
        if (cell_state == 0){
            //console.log('dead cell at', x, y);
            // rule 4: "reproduction"
            if ( sum == 3) {
                //console.log('new cell born')
                pixel(x, y);
            }
        } //alive cell
        else {
            //console.log('alive cell at', x, y);
            // rule 1 (less than 2nb)
            if ( sum < 2) {
                //die
                pixel(x,y);
                //console.log('die: < 2n');
            }
            // rule 2 (2 or 3 nb)
            else if ( sum == 2 || sum == 3 ) {
                //stay alive
                //console.log('stay alive');
            }
            // rule 3 ( > 3 nb)
            else {
                //console.log('die: > 3n');
                pixel(x,y);
            }
        }
}

function get_neighbors(m, x, y, def) {
    var nb = {};
    //console.log(def);
    for (var key in def) {
        nb[key] = get_neighbor(m, x, y, def[key][0], def[key][1]);
    }
    return nb;
}

function get_neighbor(m, x, y, delta_x, delta_y) {
    var pos_x, pos_y; 
    if (!delta_x) { delta_x = 0; }
    if (!delta_y) { delta_y = 0; }
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

function run_algorithm(size, last_matrix) {
    var x, y, nb;
       
    for (x = 0; x < size; x++) {
        last_matrix.push(matrix.data[x].slice());
    }

    if(settings.algorithm === 'GoL') {
        for (y = 0; y < size; y++) {
            for (x = 0; x < size; x++) {
                var nb = neighborhood['moore'](last_matrix,x,y);
                game_of_life(nb,last_matrix,x,y);
            }
        }
    }
}
