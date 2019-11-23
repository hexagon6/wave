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

/* grid.js
*  is responsible for the grid(tm) and canvas manipulation
*
*/
/*jshint es5: true */

import { js, settings } from '/settings.js';
import { update_cycleview } from '/view.js';

js.grid = true;

function init_2Dcanvas(id) {
    var canvas = document.getElementById(id);
    var edge = 100;
    var max_size = Math.min(window.innerWidth - edge,window.innerHeight - edge);
    canvas.width = canvas.height = Math.max(max_size, 256);
    return canvas.getContext('2d');
}

var c = init_2Dcanvas('c');
var grid;
var matrix;
var cycle = 0;
export let state = { colors: {
	// 0: resting, 1: excited, 2: refractoring
    original: [
		$('#style').css('background-color'),
		$('#style').css('color'),
		$('#style').css('border-left-color')
	],
	eighteen: [
		$('#style').css('background-color'),
		'#000000',
		'#770000',
		'#BB0000',
		'#FF0000',
		'#BB7700',
		'#77BB00',
		'#00FF00',
		'#00FF77',
		'#00FFBB',
		'#00FFFF',
		'#0FDFFF',
		'#9FFFFF',
		'#FFFFFF',
		$('#style').css('color'),
		$('#style').css('border-left-color')
	],
  six: ["#4CC3D9","#93648D","#404040","#F16745","#FFC65D","#7BC8A4"]
	}
};

function get_steps() { return state.colors[settings.state].length; }
export function update_steps() { settings.steps = get_steps(); }
update_steps();



function draw_grid(canvas_context) {
    canvas_context.fillRect(grid.pixel); 
}

function draw_pixel(canvas_context, rel_pos) {
    if (rel_pos.x < 0 || rel_pos.x > grid.x || rel_pos.y < 0 || rel_pos.y > grid.y) {
        throw new Error('pixel position out of range', rel_pos.x, rel_pos.y); 
    }
    var pos = {
        'x': rel_pos.x * grid.pixel,
        'y': rel_pos.y * grid.pixel
    };
    canvas_context.fillRect(pos.x, pos.y, grid.pixel, grid.pixel);
}

function next_value(x, y) {
    matrix.data[x][y] = (matrix.data[x][y] + 1) % settings.steps;
    return matrix.data[x][y];
}

function set_value(x, y, value) {
    matrix.data[x][y] = value;
}

function get_value(x, y) {
    return matrix.data[x][y];
}

function drawLine(startpoint, endpoint, color) {
    if (!color) { 
        color = '#eef'; 
    }
    c.moveTo(startpoint.x, startpoint.y);
    c.lineTo(endpoint.x, endpoint.y);
    c.strokeStyle = color;
    c.stroke();
}

function drawGridLines(rel_pos) {
    var draw = settings.grid.lines;
    if (draw) {
        var x, y;
        //draw only lines around a selected pixel
        if (!rel_pos) { 
            rel_pos = { 'x': undefined, 'y': undefined }; 
        }
        if (typeof(rel_pos.x) === 'number' && typeof(rel_pos.y) === 'number') {
            for (x = 0.5 + grid.pixel * rel_pos.x; 
                x < 0.5 + grid.pixel * (rel_pos.x + 1); 
                x += grid.pixel) {
                drawLine({'x': x, 'y': 0}, {'x': x, 'y': grid.y});
            }
            for (y = 0.5 + grid.pixel * rel_pos.y; 
                y < 0.5 + grid.pixel * (rel_pos.y + 1);
                y += grid.pixel) {
                drawLine({'x': 0, 'y': y}, {'x': grid.x, 'y': y});
            }
        }
        //draw lines on pixel all edges
        else {
            for (x = 0.5; x < grid.x; x += grid.pixel) {
                drawLine({'x': x, 'y': 0}, {'x': x, 'y': grid.y});
            }
            for (y = 0.5; y < grid.y; y += grid.pixel) {
                drawLine({'x': 0, 'y': y}, {'x': grid.x, 'y': y});
            }
        }
    }
}

export function pixel(x, y) {
    var rel_pos = {'x': x, 'y': y};
    c.fillStyle = state.colors[settings.state][next_value(x, y)]; 
    draw_pixel(c, rel_pos);
    drawGridLines(rel_pos);
}

function redraw_pixel(x, y) {
    var rel_pos = {'x': x, 'y': y};
    c.fillStyle = state.colors[settings.state][matrix.data[x][y]]; 
    draw_pixel(c, rel_pos);
    drawGridLines(rel_pos);
}

function fill_rect(start, end) {
    for (var x = start.x; x < end.x; x++) {
        for (var y = start.y; y < end.y; y++) {
            pixel(x, y);
        }
    }
}

export function log_matrix(matrix) {
    if (settings.verbose) {
        console.group('matrix data:');
        var x = 0;
        for (x = 0; x < matrix.length; x++) {
            var line = '';
            for (var y = 0; y < matrix[0].length; y++) {
                line += matrix[y][x];
            }
            console.log(line);
        }
        console.groupEnd();
    }
}

function init_matrix(detail) {
    var m = {
        'detail' : detail,
        'size' : Math.pow(2, detail),
        'data' : []
    };
    for (var x = 0; x < m.size; x++) {
        var y_line = [];
        for (var y = 0; y < m.size; y++) {
            y_line.push(0);
        }
        m.data.push(y_line);
    }
    return m;
}

function init_grid() {
    var cycles = 0;
    var detail = document.getElementById('detail_select').value;
    //console.log($('#detail').filter(':first')[0].selectedIndex);
    var grid_bit_resolution = Math.log(c.canvas.width) / Math.log(2) - detail;
    grid = { 
        'x': c.canvas.width,  
        'y': c.canvas.height,
        'pixel': Math.pow(2, grid_bit_resolution)
    };
    c.fillStyle = state.colors[settings.state][0];
    c.fillRect(0, 0, grid.x, grid.y);
    drawGridLines();
    matrix = init_matrix(detail);
}


export function set_grid(m) {
    var cycles;
    if (!matrix.cycle) {
        cycles = 0;
    } else {
        cycles = matrix.cycles;
    }
    matrix = m;
    for (var x = 0; x < m.size; x++) {
        for (var y = 0; y < m.size; y++) {
            redraw_pixel(x, y);
        }
    }
}

export function reset_canvas() {
    c.canvas.width++;
    c.canvas.width--;
    init_grid();
    cycle = 0;
    update_cycleview(cycle);
}

export function grid_main() {
    init_grid();
  //fill_rect({'x':1,'y':0}, {'x':3,'y':3});
}

export { cycle, grid, matrix }
