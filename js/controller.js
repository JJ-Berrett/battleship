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
function deactivateTableInteraction(id) {
	let div = document.getElementById(id);
	let cells = div.getElementsByTagName("td");
	for (let i = 0; i < cells.length; i++) {
		cells[i].onclick = null;
	}
}


function updateComputerTable() {
	let div = document.getElementById('computer-grid');
	let tableHtml = '<table class="table" align="center" id="computer">';
	let table = getFromStorage('computer').table;

	for (let i = 0; i < WIDTH; i++) {
		tableHtml += '<tr>';
		for (let j = 0; j < HEIGHT; j++) {
			let cell = table[i][j];

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
	let table = getFromStorage('user').table;
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
}

function play() {
	let userName = document.getElementById('username').value;
	localStorage.setItem('username', userName);
	document.location.href = 'views/game.html';
}
function gameOver() {
	localStorage.clear();
	document.getElementById('playerName').innerHTML = "Game Over";
	document.getElementById('turn').innerHTML = "Game Over";
	document.getElementById('computerName').innerHTML = "Game Over";
	deactivateTableInteraction('computer');
	playWinner();
	setTimeout(function () {
		document.location.href = '../index.html';
	}, 8000);
}
