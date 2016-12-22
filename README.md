wave: A multi-state two dimensional cellular automaton to simulate excitable medium (and more)
==============================================================================================

SVELTE: Currently code is being moved in `svelte`-branch from . to src/ and converted to svelte components and es6-modules.
Used together with rollup this is awesome! As long this message is here you can ignore files other than in src.

Author: Tobi Turing <dev@fet.li>

This repo contains a web-based editor to play around with cellular automatons.
Originally born from the idea to implement a tristate cellular automaton using the Greenberg-Hastings algorithm.
This CA can be used to simulate excitable medium (aka "waves").

Over time I have added different algorithms such as Game of Life and my own based on random neighborhood.

There are multiple parameters which can be tweaked, such as:

* algorithms:
	* GH: Greenberg-Hastings (default algo)
    * TT: Tobi Turing (similar to GH, but with random neighborhood)
    * GoL: Inspired by conway's game of life which by default uses 2 states, but more can be used.
* states:
	* 2 state (used for GoL), 0 represents a dead cell, 1 a cell which is alive
	* 3 state (used for GH), 0 is the media in resting state, 1 excited, 2 refractoring
    * 4+ state (just for fun, try to play with this)
* neighborhood:
	* von Neumann (4 neighbors, in direct cardinal direction)
	* Moore (8 neighbors, direct and diagonal)
    * Combination of von Neumann and Moore (alternates mode between cycles)
	* random (actually Moore, but neighbours are chosen randomly)
	* Note: neighborhood has a radius attribute, which expands the reach, 1 is default
* level of detail:
	* this parameter defines how many cells are simulated, depending on your hardware it might be really slow:
		* 1 means 4 cells, so 2^(2*1)
		* 2 means 16 cells, so 2^(2*2)
		* n means 2^(2n)
		* 9 -> 262144 cells might be to much for most CPUs, so by default we use 4 -> 256 fields, this works well even with portable phones

The matrix canvas is always initiated to have a multiple of 2^2n cells so minimal visual smoothing happens.

Enjoy!
