'use strict';

const ocean = 'ocean';
const hit = 'hit';
const miss = 'miss';
let request;
let players;

//get JSON OBject

function getGameData() {
	request = new XMLHttpRequest();
	request.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			players = JSON.parse(this.responseText);
			createTable(10,10);
		}
	};
	request.open("GET", "../js/game.json", true);
	request.send();

}

function createTableArray(height, width) {
	// Will be implemented when not showing current game state.
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

function missShip(col, row, player) {
	players[player].table[row][col] = miss;
}

function placeShip(shipName, orientation, coordinates) {
	//TODO: Create funciton that places the ship the user chooses
	//TODO: and where they choose it to be
}

function hitShip(col, row, player) {
	let table = players[player].table;
	let cell = table[row][col];
	players[player].ships.forEach((ship) => {
		if (ship.id === cell) {

			ship.hits++;

			if (ship.hits === ship.maxHits) {
				alert(`You have sunken a ${ship.type}!`)
			}
			table[row][col] = hit;
		}
	})
}

function checkIfHit(col, row, player) {
	let cell = players[player].table[row][col];
	if (cell !== 'ocean' && cell !== 'miss' && cell !== 'hit') {
		hitShip(col, row, player);
	}
	else if (cell === ocean) {
		missShip(col, row, player)
	}
	else if (cell === hit) {
		alert('You already hit that part of the ship!')
	}
	else if (cell === miss) {
		alert('You already checked that part of the ocean!')
	}
}

function checkCoordinates() {
	let col = this.cellIndex;
	let row = this.parentNode.rowIndex;
	let player = this.parentElement.parentNode.parentNode.id;

	checkIfHit(col, row, player);

	if (player === 'computer') {
		updateComputerTable();
	}
	else {
		updateUserTable();
	}

}

getGameData();