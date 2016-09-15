/***
*   Author: Tobi Turing <webdev@fet.li>
*   Version: 0.2.2
*   Date: 2013-09-17
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

"use strict";

var pixel;
if(!pixel) { alert('need grid.js to run'); }

function draw_logo(x,y){
  //w
  pixel(1+x,4+y);
  pixel(2+x,5+y);
  pixel(2+x,6+y);
  pixel(3+x,5+y);
  pixel(4+x,5+y);
  pixel(4+x,6+y);
  pixel(5+x,4+y);
  //a
  pixel(6+x,6+y);
  pixel(7+x,4+y);
  pixel(7+x,5+y);
  pixel(8+x,4+y);
  pixel(9+x,5+y);
  pixel(9+x,6+y);
  //v
  pixel(11+x,4+y);
  pixel(12+x,5+y);
  pixel(12+x,6+y);
  pixel(13+x,5+y);
  pixel(14+x,4+y);
}


function draw_heart(){
  pixel(3,0);
  pixel(4,0);
  pixel(5,0);
  pixel(6,0);
  pixel(9,0);
  pixel(10,0);
  pixel(11,0);
  pixel(12,0);
  pixel(2,1);
  pixel(7,1);
  pixel(8,1);
  pixel(13,1);
  pixel(1,2);
  pixel(14,2);
  pixel(0,3);
  pixel(15,3);
  pixel(0,4);
  pixel(15,4);
  pixel(0,5);
  pixel(15,5);
  pixel(0,6);
  pixel(15,6);
  pixel(0,7);
  pixel(15,7);
  pixel(0,8);
  pixel(15,8);
  pixel(1,9);
  pixel(14,9);
  pixel(2,10);
  pixel(13,10);
  pixel(3,11);
  pixel(12,11);
  pixel(4,12);
  pixel(11,12);
  pixel(5,13);
  pixel(10,13);
  pixel(6,14);
  pixel(9,14);
  pixel(7,15);
  pixel(8,15);
}

function draw_t_k(){
  // t
    pixel(3,4);
    pixel(4,4);
    pixel(5,4);
    pixel(4,5);
    pixel(4,6);
    pixel(4,7);
    pixel(4,8);
  // +
    pixel(6,6);
    pixel(7,5);
    pixel(7,6);
    pixel(7,7);
    pixel(8,6);
  // k
    pixel(10,4);
    pixel(10,5);
    pixel(10,6);
    pixel(10,7);
    pixel(10,8);
    pixel(11,6);
    pixel(12,4);
    pixel(12,5);
    pixel(12,7);
    pixel(12,8);
    
}
