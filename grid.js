/***
*   Author: Tobi Turing <webdev@fet.li>
*   Version: 0.2.2
*   Date: 2013-09-17
*   License: 
*   The MIT License (MIT)

Copyright (c) 2013 Tobi Turing

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

function init_2Dcanvas(id) {
  var canvas = document.getElementById(id);
  var edge = 40;
  var max_size = Math.min(window.innerWidth-edge,window.innerHeight-edge);
  canvas.width = canvas.height = Math.max(max_size, 256);
  return canvas.getContext('2d');
}

var c = init_2Dcanvas('c');
var grid;
var matrix;
var cycle = 0;
var state_colors = [ '#2E9AFE', '#58FAF4' , '#2ECCFA'];

function parse_url(){
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++){
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
var query_string = parse_url();

var detail;
if( !query_string.detail ) {
  detail = 2;
} else {
  detail = parseInt(query_string.detail, 10);
}

function update_detail(detail){
  if(detail < 1) { detail = 2; }
  if(detail > 8) { detail = 8; }
  $('#detail').value=detail;
}
update_detail(detail);

function update_cycleview(cycle){
  $('#cycle').html(cycle);
}
update_cycleview(cycle);

function draw_grid(canvas_context){
  canvas_context.fillRect(grid.pixel); 
}

function draw_pixel(canvas_context,rel_pos) {
  if(rel_pos.x< 0 || rel_pos.x>grid.x || rel_pos.y< 0 || rel_pos.y>grid.y) {
    throw new Error('pixel position out of range',rel_pos.x,rel_pos.y); 
  }
  var pos = {
    'x': rel_pos.x*grid.pixel,
    'y': rel_pos.y*grid.pixel
  };
  canvas_context.fillRect(pos.x,pos.y,grid.pixel,grid.pixel);
}

function next_value(x,y){
  matrix.data[x][y]=(matrix.data[x][y]+1)%3;
  return matrix.data[x][y];
}

function drawLine(startpoint,endpoint,color){
  if(!color) { color = '#eef'; }
  c.moveTo(startpoint.x,startpoint.y);
  c.lineTo(endpoint.x,endpoint.y);
  c.strokeStyle = color;
  c.stroke();
}

function drawGridLines(rel_pos){
  var draw = false;
  if(draw){
      var x,y;
      //draw only lines around a selected pixel
      if(!rel_pos) { rel_pos = { 'x': undefined, 'y': undefined }; }
      if( typeof(rel_pos.x) === 'number' && typeof(rel_pos.y) === 'number' ){
        for(x = 0.5 + grid.pixel * rel_pos.x; 
            x < 0.5 + grid.pixel * (rel_pos.x + 1); 
            x += grid.pixel){
            drawLine({'x':x,'y':0}, {'x':x,'y':grid.y});
        }
        for(y = 0.5 + grid.pixel * rel_pos.y; 
            y < 0.5 + grid.pixel * (rel_pos.y + 1);
            y += grid.pixel){
            drawLine({'x':0,'y':y}, {'x':grid.x,'y':y});
        }
      }
      //draw lines on pixel all edges
      else{
        for(x = 0.5; x < grid.x; x += grid.pixel){
            drawLine({'x':x,'y':0}, {'x':x,'y':grid.y});
        }
        for(y = 0.5; y < grid.y; y += grid.pixel){
            drawLine({'x':0,'y':y}, {'x':grid.x,'y':y});
        }
      }
  }
}

function pixel(x,y){
  var rel_pos={'x':x,'y':y};
  c.fillStyle = state_colors[next_value(x,y)]; 
  draw_pixel(c,rel_pos);
  drawGridLines(rel_pos);
}

function fill_rect(start,end){
  for(var x=start.x; x<end.x; x++){
    for(var y=start.y; y<end.y; y++){
      pixel(x,y);
    }
  }
}

function log_matrix(matrix){
  var verbose = false;
  if(verbose){
      console.group('matrix data:');
      var x = 0;
      for(x=0; x<matrix.length; x++){
          var line = '';
          for(var y=0; y<matrix[0].length; y++){
            line+=matrix[y][x];
          }
          console.log(line);
      }
      console.groupEnd();
  }
}

function checkerboard(){
  for(var y=0; y<matrix.size; y+=2){
    var x;
    for(x=0; x<matrix.size; x+=2){
      pixel(x,y);
    }
    for(x=1; x<matrix.size; x+=2){
      //if(y>=matrix.size) break;
      pixel(x,y+1);
    }
  }
  log_matrix(matrix.data);
}

function init_grid(){
  var cycles = 0;
  var detail = document.getElementById('detail_select').value;
  //console.log($('#detail').filter(':first')[0].selectedIndex);
  var grid_bit_resolution = Math.log(c.canvas.width)/Math.log(2) - detail;
  grid = { 
    'x': c.canvas.width,  
    'y': c.canvas.height,
    'pixel': Math.pow(2,grid_bit_resolution)
  };
  c.fillStyle = state_colors[0];
  c.fillRect(0,0,grid.x,grid.y);
  drawGridLines();
  var states = 3; // 0: resting, 1: excited, 2: refractoring
  matrix = {
    'size' : Math.pow(2,detail),
    'data' : []
  };
  for(var x=0; x<matrix.size; x++){
    var y_line = [];
    for(var y=0; y<matrix.size; y++){
      y_line.push(0);
    }
    matrix.data.push(y_line);
  }
}

function grid_main(){
  init_grid();
  //fill_rect({'x':1,'y':0}, {'x':3,'y':3});
}
