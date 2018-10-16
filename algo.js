import { js, settings } from '/settings.js';
import { matrix, pixel } from '/grid.js';

js.algo = true;


function rand(){
    var r = Math.floor(Math.random()*3-1);
    //console.log(r);
    return r;
}

// define algorithm name and neighborhood definitions with radius and state modifier
export const algorithms = {
    'GH': {
        name: 'Greenberg-Hastings',
        method: greenberg_hastings,
        neighborhood: { //uses per default 'von neumann neighboorhood' with r = 1
            neumann: { 'radius' : [1, 2, 3] },
            moore: { 'radius' : [1, 2] },
            neumann_moore: { 'radius' : [1], 'states' : 2 },
            schmirdn: { 'radius' : [1, 2, 3] },
        },
    },
    'TT' : {
        name: 'Random',
        method: random_algorithm,
        neighborhood: {
            random: { 'radius' : [1, 2, 3, 4] },
        }
    }
}

var neighborhood = {
    'random' : function (m, x, y, r){
        var neb = {};
        if(r === 1) {
            neb = {
                W: [rand(), rand()],
            };
        } else if(r === 2) {
            neb = {
                W: [rand(), rand()],
                E: [rand(), rand()],
            };
        } else if(r === 3) {
            neb = {
                W: [rand(), rand()],
                E: [rand(), rand()],
                N: [rand()*2, rand()*2],
            };
        } else if(r === 4) {
            neb = {
                W: [rand(), rand()],
                E: [rand(), rand()],
                N: [rand(), rand()],
                S: [rand()*4, rand()*4],
            };
        }
        return get_neighbors(m, x, y, neb);
    },

    'schmirdn' : function(m, x, y, r){
        var neb = {};
        if(r === 1) {
            neb = {
                W: [-1, 0], E: [1, 0],
                N: [0, -1], S: [0, 1],
                NW: [-1, -1], NE: [1, -1],
                SW: [-1, 1],  SE: [1, 1],
                WW: [-2, 0],  EE: [2, 0],
                NN: [0, -2],  SS: [0, 2],
                NNWW: [-2, -2], NWWW: [3, -1],
                NNW: [-1, -2], NNE: [1, -2],
                NNEE: [2, -2], NNNE: [1, -3],
                NEEE: [-3, -1], NWW: [-2, -1],
                NNNW: [-1, -3], NEE: [2, -1],
                SWW: [-2, 1], SSWW: [-2, 2],
                SSSW: [-1, 3], SWWW: [-3, 1],
                SEE: [2, 1], SEEE: [3, 1],
                SSEE: [2, 2], SSSE: [1, 3],
                SSW: [-1, 2], SSE: [1, 2],
                WWW: [-3, 0], EEE: [3, 0],
                NNN: [0, -3], SSS: [0, 3],
            };
        } else if (r === 2){
            neb = {
                /*W: [-1, 0], E: [1, 0],
                N: [0, -1], S: [0, 1],*/
                NW: [-1, -1], NE: [1, -1],
                SW: [-1, 1], SE: [1, 1],
                WW: [-2, 0], EE: [2, 0],
                NN: [0, -2], SS: [0, 2],/*
                NNWW: [-2, -2], NWWW: [3, -1],
                NNW: [-1, -2], NNE: [1, -2],
                NNEE: [2, -2], NNNE: [1, -3],
                NEEE: [-3, -1], NWW: [-2, -1],
                NNNW: [-1, -3], NEE: [2, -1],
                SWW: [-2, 1], SSWW: [-2, 2],
                SSSW: [-1, 3], SWWW: [-3, 1],
                SEE: [2, 1], SEEE: [3, 1],
                SSEE: [2, 2], SSSE: [1, 3],
                SSW: [-1, 2], SSE: [1, 2],
                */
                WWW: [-3, 0], EEE: [3, 0],
                NNN: [0, -3], SSS: [0, 3],
            };
        } else if (r === 3){
            neb = {
                W: [-1, 0], E: [1, 0],
                N: [0, -1], S: [0, 1],
                NW: [-1, -1], NE: [1, -1],
                SW: [-1, 1], SE: [1, 1],
                WW: [-2, 0], EE: [2, 0],
                NN: [0, -2], SS: [0, 2],
                NNWW: [-2, -2], NNW: [-1, -2],
                NNE: [1, -2], NNEE: [2, -2],
                NWW: [-2, -1], NEE: [2, -1],
                SWW: [-2, 1], SSWW: [-2, 2],
                SEE: [2, 1], SSEE: [2, 2],
                SSW: [-1, 2], SSE: [1, 2],
                WWW: [-3, 0], EEE: [3, 0],
                NNN: [0, -3], SSS: [0, 3],
            }
        }
        return get_neighbors(m, x, y, neb);
    },

    'neumann' : function(m, x, y, r){
        var neb = {};
        r = r || 1;
        if (r === 1){
            neb = {
                W: [-1, 0], E: [1, 0],
                N: [0, -1], S: [0, 1]
            };
        } else if (r === 2) {
            neb = {
                W: [-1, 0], E: [1, 0],
                N: [0, -1], S: [0, 1],
                NW: [-1, -1], NE: [1, -1],
                SW: [-1, 1], SE: [1, 1],
                WW: [-2, 0], EE: [2, 0],
                NN: [0, -2], SS: [0, 2]
            };
        } else if (r === 3) {
            neb = {
                W: [-1, 0], E: [1, 0],
                N: [0, -1], S: [0, 1],
                NW: [-1, -1], NE: [1, -1],
                SW: [-1, 1], SE: [1, 1],
                WW: [-2, 0], EE: [2, 0],
                NN: [0, -2], SS: [0, 2],
                NNW: [-1, -2], NNE: [1, -2],
                NWW: [-2, -1], NEE: [2, -1],
                SWW: [-2, 1], SEE: [2, 1],
                SSW: [-1, 2], SSE: [1, 2],
                WWW: [-3, 0], WEE: [3, 0],
                NNN: [0, -3], SSS: [0, 3],
            };
        }
        return get_neighbors(m, x, y, neb);
    },

    'moore' : function(m, x, y, r){
        r = r || 1;
        if (r === 1){
            return get_neighbors(m, x, y, {
                W: [-1, 0], E: [1, 0],
                N: [0, -1], S: [0, 1],
                NW: [-1, -1], NE: [1, -1],
                SW: [-1, 1], SE: [1, 1]
            });
        } else if (r === 2){
            neb = {
                W: [-1, 0], E: [1, 0],
                N: [0, -1], S: [0, 1],
                NW: [-1, -1], NE: [1, -1],
                SW: [-1, 1], SE: [1, 1],
                WW: [-2, 0], EE: [2, 0],
                NN: [0, -2], SS: [0, 2],
                NNWW: [-2, -2], NNW: [-1, -2],
                NNE: [1, -2], NNEE: [2, -2],
                NWW: [-2, -1], NEE: [2, -1],
                SWW: [-2, 1], SSWW: [-2, 2],
                SEE: [2, 1], SSEE: [2, 2],
                SSW: [-1, 2], SSE: [1, 2]
            };
        }
        return get_neighbors(m, x, y, neb);
    },

    'neumann_moore' : function(m, x, y, r) {
        var neb = {};
        var state = settings.algorithm_state;
        if(state == 0){
        neb = {
                W: [-1, 0], E: [1, 0],
                N: [0, -1], S: [0, 1],
                NW: [-1, -1], NE: [1, -1],
                SW: [-1, 1], SE: [1, 1]
            };
        } else if(state == 1){
        neb = {
                W: [-1, 0],  E: [1, 0],
                N: [0, -1], S: [0, 1]
            };
        } else if(state == 2){
        neb = {
                W: [-1, 0],  E: [1, 0]
            };
        } else if(state == 3){
        neb = {
                S: [0, 1]
            };
        }
        return get_neighbors(m, x, y, neb);
    }
};


function greenberg_hastings(nb,last_matrix,x,y,r) {
        //rule 1 and 2
        if (last_matrix[x][y] > 0) {
            pixel(x, y);
        } else if (last_matrix[x][y] === 0) { //rule 3
            if (check_or(nb(last_matrix, x, y, r), 1)) {
                pixel(x, y);
            //} else if (check_and(nb, 0)) {
            }
        }
}

function random_algorithm(nb,last_matrix,x,y,r){
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

function update_algorithm_state() {
    if(settings.algorithm == 'GH' && settings.algorithms.GH.neighborhood.type == 'neumann_moore'){
        var state = settings.algorithm_state;
        var amount = algorithms.GH.neighborhood.neumann_moore.states;
        settings.algorithm_state = (state + 1) %amount;
        //algorithms_state; = Math.floor(Math.random()*2);
    }
}

export function run_algorithm(size, last_matrix) {
    var x, y, nb;
       
    for (x = 0; x < size; x++) {
        last_matrix.push(matrix.data[x].slice());
    }

    var r = settings.algorithms[settings.algorithm].neighborhood.r || 1;
    var type = settings.algorithms[settings.algorithm].neighborhood.type;

    if (settings.algorithm === 'GH') { // Greenberg-Hastings
        for (y = 0; y < size; y++) {  
            for (x = 0; x < size; x++) {
                greenberg_hastings(neighborhood[type],last_matrix,x,y,r);
            }
        }
    } else if(settings.algorithm === 'TT') {
        for (y = 0; y < size; y++) {
            for (x = 0; x < size; x++) {
                var nb = neighborhood[type](last_matrix,x,y,r);
                random_algorithm(nb,last_matrix,x,y,r);
            }
        }
    }
    update_algorithm_state();

}
