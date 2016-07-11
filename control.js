
"use strict";

//global vars
var $, c, cycle, clock_state, grid, grid_main, js, log_matrix, matrix,
next_cycle, pixel, parse_url, reset_canvas, seq, settings, set_grid, start_clock,
stop_clock, algorithms, pattern, state;

var karel = false;

var url_string = parse_url();
if (typeof(url_string.debug) !== 'undefined') {
    settings.debug = (url_string.debug === 'true');
}
if (typeof(url_string.karel) !== 'undefined') {
    karel = (url_string.karel === 'true');
}

function append_options(id, num, default_value) {
    var select = document.getElementById(id);
    var options = [];
    for (var n = 1; n <= num; n++) {
        options[n] = document.createElement('option');
        if (n === default_value) {
            options[n].setAttribute('selected', true);
        }
        options[n].innerHTML = n;
        select.appendChild(options[n]);
    }
}

function append_options_algo(id, algorithms, default_value) {
    var select = document.getElementById(id);
    var options = [];
    _.each(algorithms, function(num, key) {
        options[num] = document.createElement('option');
        if (num === default_value) {
            options[num].setAttribute('selected', true);
        }
        options[num].innerHTML = num;
        select.appendChild(options[num]);
    });
}

function append_options_nb(id, algorithms, default_value) {
    var select = document.getElementById(id);
    $('#' + id).children().remove();
    var options = [];

    var n = _.keys(algorithms.neighborhood);
    _.each(n, function(num, key) {
        options[num] = document.createElement('option');
        if (num === default_value) {
            options[num].setAttribute('selected', true);
        }
        options[num].innerHTML = num;
        select.appendChild(options[num]);
    });
}

function append_options_nb_r(id, neighborhood, default_value) {
    var select = document.getElementById(id);
    $('#' + id).children().remove();
    var options = [];
    for (var n = 1; n <= algorithms[settings.algorithm].neighborhood[neighborhood].radius.length; n++) {
        options[n] = document.createElement('option');
        if (n === default_value) {
            options[n].setAttribute('selected', true);
        }
        options[n].innerHTML = n;
        select.appendChild(options[n]);
    }
}

function append_options_state(id, state, default_value){
	console.log('append_options_state');
	console.log(settings.state);
	console.log(state);
    var select = document.getElementById(id);
    $('#' + id).children().remove();
    var options = [];
	var n = _.keys(state.colors);
	console.log(n);
    _.each(n, function(num, key) {
		console.log(num)
        options[num] = document.createElement('option');
        if (num === default_value) {
            options[num].setAttribute('selected', true);
        }
        options[num].innerHTML = num;
        select.appendChild(options[num]);
    });
}

function press_start_stop_button(b, speed) {
    if (!clock_state) {
        b.innerHTML = 'stop';
        start_clock(speed);
        $('#save_button').attr("disabled", true);
        $('#next_cycle_button').attr("disabled", true);
    } else {
        b.innerHTML = 'start';
        stop_clock();
        $('#save_button').attr("disabled", false);
        $('#next_cycle_button').attr("disabled", false);
    }
}

function enable_control_buttons() {
    $('#next_cycle_button').click(function (e) {
        next_cycle();
    });
    $('#start_button').click(function (e) {
        press_start_stop_button(this, settings.speed);
    });
    $('#reset_button').click(function (e) {
        stop_clock();
        reset_canvas();
        $('#start_button').html('start');
        //pattern.line();
    });
    $('.controls').attr("disabled", false);
}

$('#detail_select').change(function () {
    reset_canvas();
    $('#load_button').attr("disabled", true);
});

$('#nb_select').change(function () {
    settings.algorithms[settings.algorithm].neighborhood.type = $(this).val();
    append_options_nb_r('nb_r_select', $(this).val(), 1);
});

$('#nb_r_select').change(function () {
    settings.algorithms[settings.algorithm].neighborhood.r = parseInt($(this).val(), 10);
});

$('#algo_select').change(function (){
	console.log("THIS:");
	console.log($(this));
    settings.algorithm = $(this).val();
    append_options_nb('nb_select', algorithms[settings.algorithm]);
});

$('#state_select').change(function (){
	settings.state = $(this).val();
	console.log('settings.state');
	console.log(settings.state);
	append_options_state('state_select', state);
	update_steps()
});

$('#save_button').click(function (e) {
    if (settings.verbose) {
        log_matrix(matrix.data);
    }
    settings.save = JSON.stringify(matrix);
    console.log('cookie saved', settings.save);
    $('#load_button').attr("disabled", false);
});

$('#load_button').click(function (e) {
    if (settings.verbose) {
        log_matrix(matrix.data);
    }
    set_grid(JSON.parse(settings.save));
});

$('#export_button').click(function (e) {
    var m = JSON.stringify(matrix);
    var generator = window.open('', 'name', 'height=400,width=500');
    generator.document.write(JSON.stringify(matrix));
    generator.document.close();
});

$('#toimage_button').click(function (e) {
    var URL;
    var canvas = document.getElementById("c");
    canvas.toBlob(function (blob) {
        var newImg = document.createElement("img"),
        url = URL.createObjectURL(blob);
        newImg.onload = function () {
            // no longer need to read the blob so it's revoked
            URL.revokeObjectURL(url);
        };
        newImg.src = url;
        document.body.appendChild(newImg);
    });
});

function set_touched_state() {
    settings.touched = true;
    $('#save_button').attr("disabled", false);
    $('#export_button').attr("disabled", false);
    $('#hover_text').hide();
    $('.controls').attr("disabled", false);
}

function set_untouched_state() {
    settings.touched = false;
    $('#save_button').attr("disabled", true);
    $('#export_button').attr("disabled", true);
    $('#hover_text').show();
    $('.controls').attr("disabled", true);
}

$('canvas').click(function (e) {
    if (!settings.touched && settings.ready) {
        set_touched_state();
        $('canvas').css({"border-width": "1px"});
    }
    console.log('click');
    var left = $('canvas').offset().left;
    var top = $('canvas').offset().top;
    var x = e.pageX - left;
    var y = e.pageY - top;
    $('#mouse_pos').html(x + ', ' + y);
    var g_x = Math.floor(x / grid.pixel);
    var g_y = Math.floor(y / grid.pixel);
    pixel(g_x, g_y);
    $('#grid_pos').html(g_x + ', ' + g_y);
    log_matrix(matrix.data);
});

function show_interaction_text() {
    $('#hover_text').show();
}

function set_ready() {
    settings.ready = true;
}

function main() {
    enable_control_buttons();
    $('#vers').attr("content", settings.version);
    $('#date').attr("content", settings.date);
    $('#hover_text').hide();
    $('#debug_info').hide();
    $('.state').attr("disabled", true);
    $('.controls').attr("disabled", true);
    if (settings.debug === true) {
        $('#debug_info').show();
    }
    append_options('detail_select', settings.detail.max, settings.detail.initial);
    append_options_nb('nb_select', algorithms[settings.algorithm], settings.algorithm);
    //append_options_nb_r('nb_r_select', 'random', settings.algorithms[settings.algorithm].neighborhood.r);
    append_options_nb_r('nb_r_select', 'neumann', settings.algorithms[settings.algorithm].neighborhood.r);
    append_options_algo('algo_select', _.keys(settings.algorithms), settings.algorithm);
    append_options_state('state_select', state, settings.state);
    grid_main();
    $('.unselectable').on('selectstart dragstart',
    function (evt) {
        evt.preventDefault();
        return false;
    });
    if (settings.intro) {
        seq.intro();
    } else {
        settings.ready = true;
    }
}

$(document).ready(function () {
    main();

});
