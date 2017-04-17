/***
*   Author: Tobi Turing <webdev@fet.li>
*   License: 
*   The MIT License (MIT)

Copyright (c) 2016 Tobi Turing

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

/* seq.js
*  define sequences here
*
*/

"use strict";

//global definitions
var karel, pixel, start_clock, stop_clock, pattern, reset_canvas, 
show_interaction_text, set_untouched_state, initial_matrix, tph_thuering;

var seq = {
    intro: function () {
		// FIXME make search parsing simpler
		var search = window.location.search.split('?')
		if (search.length > 0) {
			var p = search[1]
			var params = (p) ? p.split('='): [null, null]
		}
		if (params && params[0] === 'user' && params[1] === 'tph-thuering') {
			console.log('welcome tph-thuering');
			this.tph_thuering();
			return;
		}
        if (Math.random() > 0.3) {
            this.gliders();
        } else {
            this.gol_multistate();
        }
    },
    wav: function () {
        var r = Math.floor(Math.random() * 100);
        pixel(0,  0);
        start_clock(60);
        window.setTimeout(stop_clock, 2000);
        window.setTimeout(pattern.logo, 2200, 0, 3);
        if (r > 90 || r < 10) {
            window.setTimeout(pattern.logo, 2100, 1, 0);
            window.setTimeout(pattern.logo, 2400, 1, 0);
        }
        if (r > 75) { //long intro
            window.setTimeout(pixel, 2700, 8, 8);
            window.setTimeout(pixel, 2900, 8, 8);
            window.setTimeout(start_clock, 3000, 125);
            window.setTimeout(stop_clock, 3500);
            window.setTimeout(pixel, 3750, 8, 8);
            window.setTimeout(start_clock, 4000, 50);
            window.setTimeout(stop_clock, 4950);
            window.setTimeout(reset_canvas, 5000);
            window.setTimeout(show_interaction_text, 5002);
            window.setTimeout(set_untouched_state, 5003);
            window.setTimeout(set_ready, 5004);
        } else { //short intro
            window.setTimeout(start_clock, 3000, 75);
			var offset = 3500;
            window.setTimeout(stop_clock, offset);
            window.setTimeout(reset_canvas, offset + 1);
            window.setTimeout(show_interaction_text, offset + 2);
            window.setTimeout(set_untouched_state, offset + 3);
            window.setTimeout(set_ready, offset + 4);
        }
        
        console.log(r);
    },
	statechange: function(n) {
		if (n === 2) {
			settings.state='two';
		} else if (n === 3) {
			settings.state='wave';
		} else if (n === 4) {
			settings.state='four';
		} else if (n === 6) {
			settings.state='six';
		} else if (n === 16) {
			settings.state='sixteen';
		}
		settings.steps=n;
	},
	gol_multistate: function() {
		window.setTimeout(pattern.pentos, 250, 30, 40);
		window.setTimeout(pattern.glider, 1, 12, 24);
        window.setTimeout(start_clock, 1000, 75);
		window.setTimeout(this.statechange, 2000, 3);
		window.setTimeout(this.statechange, 3000, 4);
		window.setTimeout(this.statechange, 4000, 6);
		window.setTimeout(this.statechange, 5000, 16);
        window.setTimeout(stop_clock, 5997);
        window.setTimeout(reset_canvas, 5998);
        window.setTimeout(pixel, 5999, 30, 30);
        window.setTimeout(start_clock, 6000, 35);
        window.setTimeout(stop_clock, 8000);
		window.setTimeout(this.statechange, 8005, 2);
        window.setTimeout(start_clock, 8250, 15);
        window.setTimeout(stop_clock, 9000);
        window.setTimeout(set_ready, 9004);
        window.setTimeout(reset_canvas, 9005);
    },
    gliders: function () {
        window.setTimeout(init_grid, 250, initial_matrix)
        window.setTimeout(start_clock, 1000, 75);
    },
	tph_thuering: function () {
		window.setTimeout(init_grid, 20, tph_thuering)
		window.setTimeout(start_clock, 1000, 100);
	}
}
