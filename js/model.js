'use strict';

//Sample game running
let table = [
	[ 1, 1, 6, 6, 1, 0, 0, 0, 7, 0 ],
	[ 0, 0, 0, 0, 0, 0, 7, 0, 0, 7 ],
	[ 0, 7, 0, 0, 0, 0, 0, 0, 0, 0 ],
	[ 4, 0, 0, 7, 2, 0, 0, 7, 0, 0 ],
	[ 4, 0, 0, 0, 2, 0, 0, 0, 0, 7 ],
	[ 4, 7, 0, 0, 6, 0, 7, 0, 0, 0 ],
	[ 7, 0, 0, 0, 2, 0, 0, 7, 0, 6 ],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 6 ],
	[ 0, 6, 3, 3, 0, 0, 7, 0, 7, 0 ],
	[ 0, 0, 7, 0, 0, 7, 0, 0, 0, 7 ]
];

let tableStates = {
	blank: 0,
	hit: 6,
	miss: 7,
};

let ships = [
	{
		shipId: 1,
		type: 'carrier',
		size: 5,
		orientation: 'horizontal',
		hits: 0,
		maxHits: 5,

	},
	{
		shipId: 2,
		type: 'battleship',
		size: 4,
		orientation: 'vertical',
		hits: 0,
		maxHits: 4,

	},
	{
		shipId: 3,
		type: 'submarine',
		size: 3,
		orientation: 'horizontal',
		hits: 0,
		maxHits: 3,

	},
	{
		shipId: 4,
		type: 'destroyer',
		size: 3,
		orientation: 'vertical',
		hits: 0,
		maxHits: 3,

	},
	{
		shipId: 5,
		type: 'cruiser',
		size: 2,
		orientation: 'vertical',
		hits: 0,
		maxHits: 2,

	},
];
let sunkenShips = [
	// Not sure if I will need this or not
	// Potential array of sunken ships
];

function createTableArray(height, width){
	// Will be implemented when not showing current game state.
	let columns = [];

	for(let i = 0; i < height; i++){
		let row = [];

		for(let j = 0; j < width; j++){
			row.push(0);
		}

		columns.push(row);
	}
	table = columns;
}

function placeShip(shipName, orientation, coordinates) {
  //TODO: Create funciton that places the ship the user chooses
	//TODO: and where they choose it to be
}

function hitShip(coordinates) {
	//TODO: Create function that sets the cell to hit table state
	//TODO: Increments ships hits, then checks to see if ship is sunk
}

function checkIfHit(coordinates) {
	//TODO: Create functino that checks to see if the ships is in that cell
	//TODO: Sets the cell to either miss or calls hit ship
}
