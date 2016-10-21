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
