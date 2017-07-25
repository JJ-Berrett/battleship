'use strict';

const	ocean = 'ocean';
const hit = 'hit';
const	miss = 'miss';


//Sample game running
let table = [
	[ 1, 1, 1, 1, 1, 'ocean', 'ocean', 'ocean', 'miss', 'ocean' ],
	[ 'ocean', 'ocean', 'ocean', 'ocean', 'ocean', 'ocean', 'miss', 'ocean', 'ocean', 'miss' ],
	[ 'ocean', 'miss', 'ocean', 'ocean', 'ocean', 'ocean', 'ocean', 'ocean', 'ocean', 'ocean' ],
	[ 4, 'ocean', 'ocean', 'miss', 2, 'ocean', 'ocean', 'miss', 'ocean', 'ocean' ],
	[ 4, 'ocean', 'ocean', 'ocean', 2, 'ocean', 'ocean', 'ocean', 'ocean', 'miss' ],
	[ 4, 'miss', 'ocean', 'ocean', 2, 'ocean', 'miss', 'ocean', 'ocean', 'ocean' ],
	[ 'miss', 'ocean', 'ocean', 'ocean', 2, 'ocean', 'ocean', 'miss', 'ocean', 5 ],
	[ 'ocean', 'ocean', 'ocean', 'ocean', 'ocean', 'ocean', 'ocean', 'ocean', 'ocean', 5 ],
	[ 'ocean', 3, 3, 3, 'ocean', 'ocean', 'miss', 'ocean', 'miss', 'ocean' ],
	[ 'ocean', 'ocean', 'miss', 'ocean', 'ocean', 'miss', 'ocean', 'ocean', 'ocean', 'miss' ]
];

let ships = [
	{
		id: 1,
		type: 'carrier',
		size: 5,
		orientation: 'horizontal',
		hits: 0,
		maxHits: 5,

	},
	{
		id: 2,
		type: 'battleship',
		size: 4,
		orientation: 'vertical',
		hits: 0,
		maxHits: 4,

	},
	{
		id: 3,
		type: 'submarine',
		size: 3,
		orientation: 'horizontal',
		hits: 0,
		maxHits: 3,

	},
	{
		id: 4,
		type: 'destroyer',
		size: 3,
		orientation: 'vertical',
		hits: 0,
		maxHits: 3,

	},
	{
		id: 5,
		type: 'cruiser',
		size: 2,
		orientation: 'vertical',
		hits: 0,
		maxHits: 2,

	},
];


function createTableArray(height, width){
	// Will be implemented when not showing current game state.
	let columns = [];

	for(let i = 0; i < height; i++){
		let row = [];

		for(let j = 0; j < width; j++){
			row.push(ocean);
		}

		columns.push(row);
	}
	table = columns;
	console.log(table);
}

function missShip(col, row) {
	table[row][col] = miss;
}

function placeShip(shipName, orientation, coordinates) {
  //TODO: Create funciton that places the ship the user chooses
	//TODO: and where they choose it to be
}

function hitShip(col, row) {
	let cell = table[row][col];
	ships.forEach((ship) => {
		if(ship.id === cell){

			ship.hits++;

			if(ship.hits === ship.maxHits){
				alert(`You have sunken a ${ship.type}!`)
			}
			table[row][col] = hit;
		}
	})
}

function checkIfHit(col, row) {
	let cell = table[row][col];
	if(cell !== 'ocean' && cell !== 'miss' && cell !== 'hit'){
		hitShip(col, row);
	}
	else if(cell === ocean){
		missShip(col, row)
	}
	else if(cell === hit){
		alert('You already hit that part of the ship!')
	}
	else if(cell === miss){
		alert('You already checked that part of the ocean!')
	}
}

function checkCoordinates() {
	let col = this.cellIndex;
	let row = this.parentNode.rowIndex;
	updateCoordinatesDisplay(col, row);
	checkIfHit(col, row);
	updateTable();
}