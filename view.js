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

/* view.js
*  is responsible for manipulation of general and visible website elements
*  is not responsible for the canvas
*/

import { js, settings } from '/settings.js';

export function parse_url() {
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length;i++) {
        var pair =  vars[i].split("=");
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = pair[1];
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [ query_string[pair[0]], pair[1] ];
            query_string[pair[0]] = arr;
        } else {
            query_string[pair[0]].push(pair[1]);
        }
    }
    return query_string;
}

const query_string = parse_url();

//global vars
var cycle, speed;

js.grid = true;

js.view = true;

var detail;
if (!query_string.detail) {
    detail = 2;
} else {
    detail = parseInt(query_string.detail, 10);
}

function update_detail(detail) {
    if (detail < 1) {
        detail = 2;
    }
    if (detail > 8) {
        detail = 8;
    }
    $('#detail').value = detail;
}
update_detail(detail);

export function update_cycleview(cycle) {
    $('#cycle').html(cycle);
}
update_cycleview(cycle);

export function update_speed(speed) {
    $('#speed').html(speed);
}
update_speed(settings.speed);
