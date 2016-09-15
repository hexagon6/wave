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
show_interaction_text, set_untouched_state;

var seq = {
    intro: function () {
        if (karel) {
            this.karel();
        } else {
            this.wav();
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
            window.setTimeout(stop_clock, 3500);
            window.setTimeout(reset_canvas, 3501);
            window.setTimeout(show_interaction_text, 3502);
            window.setTimeout(set_untouched_state, 3503);
            window.setTimeout(set_ready, 3504);
        }
        
        console.log(r);
    },
    karel: function () {
        window.setTimeout(pattern.heart, 10);
        window.setTimeout(pattern.heart, 2000);
        window.setTimeout(pattern.heart, 2100);
        window.setTimeout(pattern.heart, 2150);
        window.setTimeout(pattern.t_k, 2050);
        window.setTimeout(pattern.t_k, 2150);
        window.setTimeout(start_clock, 2300);
        window.setTimeout(stop_clock, 2499);
        window.setTimeout(reset_canvas, 2500);
        window.setTimeout(set_ready, 2501);
    }
}
