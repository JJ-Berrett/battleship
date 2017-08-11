"use strict";

let HEIGHT = 0;
let WIDTH = 0;

function createTable(height, width) {
	HEIGHT = height;
	WIDTH = width;
	// createTableArray(HEIGHT, WIDTH);
	updateComputerTable();
	updateUserTable();
	let userName = localStorage.getItem('username');
	document.getElementById('playerName').innerHTML = userName + "'s Grid";
}


function makeTableInteractive(id) {
	let div = document.getElementById(id);
	let cells = div.getElementsByTagName("td");
	for (let i = 0; i < cells.length; i++) {
		cells[i].onclick = checkCoordinates;
	}
}


function updateComputerTable() {
	let div = document.getElementById('computer-grid');
	let tableHtml = '<table class="table" align="center" id="computer">';

	for (let i = 0; i < WIDTH; i++) {
		tableHtml += '<tr>';
		for (let j = 0; j < HEIGHT; j++) {
			let cell = players.computer.table[i][j];

			if (cell !== 'hit' && cell !== 'miss' && cell !== 'ocean')
				tableHtml += '<td class="ocean"></td>';
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
	makeTableInteractive('computer');
}

function updateUserTable() {
	let div = document.getElementById('user-grid');
	let tableHtml = '<table class="table" align="center" id ="user">';

	for (let i = 0; i < WIDTH; i++) {
		tableHtml += '<tr>';
		for (let j = 0; j < HEIGHT; j++) {
			let cell = players.user.table[i][j];

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
}

function play() {
	let userName = document.getElementById('username').value;
	localStorage.setItem('username', userName);
	document.location.href = 'views/game.html';
}


function clearStorage() {
	localStorage.clear();
	document.getElementById('playerName').innerHTML = "No player name in local storage";
}