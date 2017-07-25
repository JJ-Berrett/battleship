"use strict";

let HEIGHT = 0;
let WIDTH = 0;

function createTable(height, width) {
	HEIGHT = height;
	WIDTH = width;
	// createTableArray(HEIGHT, WIDTH);
	updateTable();
}

function makeTableInteractive() {
	let cells = document.getElementsByTagName("td");
	for (let i = 0; i < cells.length; i++) {
		cells[i].onclick = checkCoordinates;
	}
}

function updateTable() {
	let div = document.getElementById('battleship-container');
	let tableHtml = '<table class="table">';

	for (let i = 0; i < WIDTH; i++) {
		tableHtml += '<tr>';
		for (let j = 0; j < HEIGHT; j++) {
			let cell = table[i][j];

			if (cell !== 'hit' && cell !== 'miss' && cell !== 'ocean')
				tableHtml += '<td class="ship"></td>';
			else if (cell === 'hit')
				tableHtml += '<td class="hit"></td>';
			else if (cell === 'miss')
				tableHtml += '<td class="miss"></td>';
			else
				tableHtml += '<td class="ocean"></td>';
		}

		tableHtml += '</tr>'
	}
	tableHtml += '</table>';

	div.innerHTML = tableHtml;
	makeTableInteractive();
}

function updateCoordinatesDisplay(row, col) {
	let coordinatesDisplay = document.getElementById('coordinates-display');
	coordinatesDisplay.innerHTML = `<p>(${row + 1} , ${col + 1})</p>`;
}

function displayUserInput(shipName) {
	let playerName = document.getElementById('player-name').value;
	let difficulty = '';
	let difficultyBoxes = document.getElementsByClassName('difficulty-checkbox');

	for(let i = 0; difficultyBoxes[i]; i++){
		if(difficultyBoxes[i].checked){
			difficulty = difficultyBoxes[i].value;
			break;
		}
	}

	alert(`Players name is ${playerName}. \nDifficulty: ${difficulty} \nShip to be placed: ${shipName}`)
}