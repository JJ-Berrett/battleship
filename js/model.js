'use strict';

const ocean = 'ocean';
const hit = 'hit';
const miss = 'miss';
let request;
let gameData;
let finder;

function getGameData() {
	request = new XMLHttpRequest();
	request.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			gameData = JSON.parse(this.responseText);
			saveToStorage('computer', gameData.computer);
			saveToStorage('user', gameData.user);
			finder = gameData.finder;
			createTable(10, 10);
		}
	};
	request.open("GET", "../js/game.json", true);
	request.send();
}

//======================================//
//=========Local Storage Manager========//
//======================================//

function getFromStorage(key) {
	return JSON.parse(localStorage.getItem(key));
}

function saveToStorage(key, object) {
	localStorage.setItem(key, JSON.stringify(object))
}

//===============================//
//==========Cell Actions=========//
//===============================//


function missShip(row, col, player) {
	let playerObject = getFromStorage(player);
	playerObject.table[row][col] = miss;
	saveToStorage(player, playerObject);

	if (player === 'user') {
		updateUserTable();
	}
	else {
		updateComputerTable();
	}
}

function hitShip(row, col, player) {
	let playerObject = getFromStorage(player);
	let cell = playerObject.table[row][col];
	playerObject.ships.forEach((ship) => {
		if (ship.id === cell) {

			ship.hits++;

			if (ship.hits === ship.maxHits) {
				if (player === 'user') {
					alert(`${localStorage.getItem('username')}'s ${ship.type} has been destroyed!`);
					ship.destroyed++;
				}
				else {
					alert(`${player}'s ${ship.type} has been destroyed!`);
					playerObject.destroyedShips++;
				}
			}
			playExplosion();
			playerObject.table[row][col] = hit;
		}
	});

	//Check to see if the user has won the game
	if (playerObject.destroyedShips === playerObject.totalShips) {
		if (player === 'user') {
			alert(`${localStorage.getItem('username')}' has won the game!!`);
			return gameOver();
		}
		else {
			alert(`${player} has won the game!!!`);
			return gameOver();
		}
	}

	saveToStorage(player, playerObject);

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
	let table = getFromStorage('computer').table;
	let cell = table[row][col];
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
		document.getElementById('turn').innerHTML = "Computer's Turn";
		setTimeout(function () {
			document.getElementById('turn').innerHTML = "Your Turn";
			return findUsersShips();
		}, 100);
	}
}


//==============================================//
//================Computer AI===================//
//==============================================//


//===========Check User's Grid==================//

function checkUserCell(row, col) {
	let table = getFromStorage('user').table;
	let cell;

	if (row >= 0 && row !== 10 && col >= 0 && col !== 10) {
		cell = table[row][col];
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

		if (checkedResult === 'alreadyMissed' || checkedResult === 'alreadyHit') {
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

//====Logic to continue searching once Hit======//

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
			checkNextSquare();
		}
		else if (result === 'miss') {
			finder.grid.up = false;
			return resetCellToBeChecked();
		}
		else if (result === 'alreadyHit') {
			finder.grid.up = false;
			resetCellToBeChecked();
			checkNextSquare();
		}

	},
	down: function () {
		finder.cellToBeChecked.row += 1;
		let result = checkUserCell(finder.cellToBeChecked.row, finder.cellToBeChecked.col);

		if (result === 'outOfBounds' || result === 'alreadyMissed') {
			finder.grid.down = false;
			resetCellToBeChecked();
			checkNextSquare();
		}
		else if (result === 'miss') {
			finder.grid.down = false;
			return resetCellToBeChecked();
		}
		else if (result === 'alreadyHit') {
			finder.grid.down = false;
			resetCellToBeChecked();
			checkNextSquare();
		}
	},
	left: function () {
		finder.cellToBeChecked.col -= 1;
		let result = checkUserCell(finder.cellToBeChecked.row, finder.cellToBeChecked.col);

		if (result === 'outOfBounds' || result === 'alreadyMissed') {
			finder.grid.left = false;
			resetCellToBeChecked();
			checkNextSquare();
		}
		else if (result === 'miss') {
			finder.grid.left = false;
			return resetCellToBeChecked();
		}
		else if (result === 'alreadyHit') {
			finder.grid.left = false;
			resetCellToBeChecked();
			checkNextSquare();
		}
	},
	right: function () {
		finder.cellToBeChecked.col += 1;
		let result = checkUserCell(finder.cellToBeChecked.row, finder.cellToBeChecked.col);

		if (result === 'outOfBounds' || result === 'alreadyMissed') {
			finder.grid.right = false;
			resetCellToBeChecked();
			checkNextSquare();
		}
		else if (result === 'miss') {
			finder.grid.up = true;
			finder.grid.down = true;
			finder.grid.left = true;
			finder.grid.right = true;
			finder.continue = false;
		}
		else if (result === 'alreadyHit') {
			finder.grid.up = true;
			finder.grid.down = true;
			finder.grid.left = true;
			finder.grid.right = true;
			finder.continue = false;
		}
	},
};


function playExplosion() {
	let x = document.getElementById("explosion");
	x.play();
}

function playWinner() {
	let x = document.getElementById("winner");
	x.play();
}
