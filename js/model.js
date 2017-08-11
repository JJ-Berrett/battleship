'use strict';

const ocean = 'ocean';
const hit = 'hit';
const miss = 'miss';
let request;
let players;

let finder = {
	continue: false,
	cellToBeChecked: {
		row: 0,
		col: 0,
	},
	originalCell: {
		row: 0,
		col: 0,
	},
	grid: {
		up: true,
		down: true,
		left: true,
		right: true,
	}
};


function getGameData() {
	request = new XMLHttpRequest();
	request.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			players = JSON.parse(this.responseText);
			createTable(10, 10);
		}
	};
	request.open("GET", "../js/game.json", true);
	request.send();
}

function createTableArray(height, width) {
	let columns = [];

	for (let i = 0; i < height; i++) {
		let row = [];

		for (let j = 0; j < width; j++) {
			row.push(ocean);
		}

		columns.push(row);
	}
	players.computer.table = columns;
	players.user.table = columns;
}

function placeShips(shipName, orientation, coordinates) {

}

//===============================//
//==========Cell Actions=========//
//===============================//


function missShip(row, col, player) {
	players[player].table[row][col] = miss;
	if (player === 'user') {
		updateUserTable();
	}
	else {
		updateComputerTable();
	}
}

function hitShip(row, col, player) {
	let table = players[player].table;
	let cell = table[row][col];
	players[player].ships.forEach((ship) => {
		if (ship.id === cell) {

			ship.hits++;

			if (ship.hits === ship.maxHits) {
				if (player === 'user') {
					alert(`${localStorage.getItem('username')}'s ${ship.type} has been destroyed!`);
					ship.destroyed++;
				}
				else {
					alert(`${player}'s ${ship.type} has been destroyed!`);
					ship.destroyed++;
				}
			}

			table[row][col] = hit;
		}
	});

	//Check to see if the user has won the game
	if (players[player].destroyedShips === players[player].totalShips) {
		if (player === 'user') {
			updateUserTable();
			alert(`${localStorage.getItem('username')}' has won the game!!`);
		}
		else {
			alert(`${player}'s ${ship.type} has won the game!!!`);
			updateComputerTable();
		}
	}

	//Update the grid
	if (player === 'user') {
		updateUserTable();
	}
	else {
		updateComputerTable();
	}
}

//=======================================//
//========Checking Computer Grid=========//
//=======================================//


function checkComputer(row, col) {
	let cell = players.computer.table[row][col];
	if (cell !== 'ocean' && cell !== 'miss' && cell !== 'hit') {
		hitShip(row, col, 'computer');
	}
	else if (cell === ocean) {
		missShip(row, col, 'computer');
	}
	else if (cell === hit) {
		alert('You already hit that part of the ship!');
		return 'retry';
	}
	else if (cell === miss) {
		alert('You already checked that part of the ocean!');
		return 'retry';
	}
}

function checkCoordinates() {
	let col = this.cellIndex;
	let row = this.parentNode.rowIndex;

	let result = checkComputer(row, col);

	// Computers Turn
	if (result !== 'retry') {
		findUsersShips();
	}
}


//==============================================//
//================Computer AI===================//
//==============================================//


//===========Check User's Grid==================//

function checkUserCell(row, col) {
	let cell;

	if (row >= 0 && row !== 10 && col >= 0 && col !== 10) {
		cell = players.user.table[row][col];
		if (cell !== 'ocean' && cell !== 'miss' && cell !== 'hit') {
			hitShip(row, col, 'user');
			return 'hit';
		}
		else if (cell === ocean) {
			missShip(row, col, 'user');
			return 'miss';
		}
		else if (cell === hit) {
			return 'alreadyHit'
		}
		else if (cell === miss) {
			return 'alreadyMissed';
		}
	}
	else {
		return 'outOfBounds';
	}

}

function findUsersShips() {
	let checkedResult = '';
	let row = Math.round(Math.random() * 9);
	let col = Math.round(Math.random() * 9);

	if (!finder.continue) {
		finder.originalCell.row = row;
		finder.originalCell.col = col;
		finder.cellToBeChecked.row = row;
		finder.cellToBeChecked.col = col;

		checkedResult = checkUserCell(row, col);

		if (checkedResult === 'alreadyMissed') {
			return findUsersShips();
		} else if (checkedResult === 'miss') {

			return;
		}
		else if (checkedResult === 'hit') {
			finder.continue = true;

			return;
		}
	}

	return checkNextSquare();
}

//Logic to continue searching once Hit//

function resetCellToBeChecked() {
	finder.cellToBeChecked.row = finder.originalCell.row;
	finder.cellToBeChecked.col = finder.originalCell.col;
}


function checkNextSquare() {
	if (finder.grid.up) {
		return search.up();
	}
	else if (finder.grid.down) {
		return search.down();
	}
	else if (finder.grid.left) {
		return search.left();
	}
	else if (finder.grid.right) {
		return search.right();
	}
	else {
		finder.grid.up = true;
		finder.grid.down = true;
		finder.grid.left = true;
		finder.grid.right = true;
		finder.continue = false;
	}
}

const search = {
	up: function () {
		finder.cellToBeChecked.row -= 1;
		let result = checkUserCell(finder.cellToBeChecked.row, finder.cellToBeChecked.col);

		if (result === 'outOfBounds' || result === 'alreadyMissed') {
			finder.grid.up = false;
			resetCellToBeChecked();
			return checkNextSquare();
		}
		else if (result === 'miss') {
			finder.grid.up = false;
			return resetCellToBeChecked();
		}
		else if (result === 'alreadyHit') {
			finder.grid.up = false;
			resetCellToBeChecked();
			return checkNextSquare();
		}

	},
	down: function () {
		finder.cellToBeChecked.row += 1;
		let result = checkUserCell(finder.cellToBeChecked.row, finder.cellToBeChecked.col);

		if (result === 'outOfBounds' || result === 'alreadyMissed') {
			finder.grid.down = false;
			resetCellToBeChecked();
			return checkNextSquare();
		}
		else if (result === 'miss') {
			finder.grid.down = false;
			return resetCellToBeChecked();
		}
		else if (result === 'alreadyHit') {
			finder.grid.down = false;
			resetCellToBeChecked();
			return checkNextSquare();
		}
	},
	right: function () {
		finder.cellToBeChecked.col += 1;
		let result = checkUserCell(finder.cellToBeChecked.row, finder.cellToBeChecked.col);

		if (result === 'outOfBounds' || result === 'alreadyMissed') {
			finder.grid.right = false;
			resetCellToBeChecked();
			return checkNextSquare();
		}
		else if (result === 'miss') {
			finder.grid.right = false;
			return resetCellToBeChecked();
		}
		else if (result === 'alreadyHit') {
			finder.grid.right = false;
			resetCellToBeChecked();
			return checkNextSquare();
		}
	},
	left: function () {
		finder.cellToBeChecked.col -= 1;
		let result = checkUserCell(finder.cellToBeChecked.row, finder.cellToBeChecked.col);

		if (result === 'outOfBounds' || result === 'alreadyMissed') {
			finder.grid.left = false;
			resetCellToBeChecked();
			return checkNextSquare();
		}
		else if (result === 'miss') {
			finder.grid.left = false;
			return resetCellToBeChecked();
		}
		else if (result === 'alreadyHit') {
			finder.grid.left = false;
			resetCellToBeChecked();
			return checkNextSquare();
		}
	}
};

// function run() {
// 	checkUserCell(5, -1)
// }
//
// run();
