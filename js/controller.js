"use strict";

let HEIGHT = 0;
let WIDTH = 0;

function createTable(height, width) {
	HEIGHT = height;
	WIDTH = width;
	// createTableArray(HEIGHT, WIDTH);
	updateComputerTable();
	updateUserTable();
}


function makeTableInteractive() {
	let cells = document.getElementsByTagName("td");
	for (let i = 0; i < cells.length; i++) {
		cells[i].onclick = checkCoordinates;
	}
}

function updateComputerTable() {
	let div = document.getElementById('computer');
	let tableHtml = '<table class="table" id="computer">';

	for (let i = 0; i < WIDTH; i++) {
		tableHtml += '<tr>';
		for (let j = 0; j < HEIGHT; j++) {
			let cell = players.computer.table[i][j];

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
	makeTableInteractive(players.computer.table);
}

function updateUserTable() {
	let div = document.getElementById('user');
	let tableHtml = '<table class="table" id ="user">';

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
	makeTableInteractive();
}

// function updateCoordinatesDisplay(row, col) {
// 	let coordinatesDisplay = document.getElementById('coordinates-display');
// 	coordinatesDisplay.innerHTML = `<p class="container">(${row + 1} , ${col + 1})</p>`;
//
// }

// function displayUserInput(shipName) {
// 	let playerName = document.getElementById('player-name').value;
// 	let difficulty = '';
// 	let difficultyBoxes = document.getElementsByClassName('difficulty-checkbox');
//
// 	for (let i = 0; difficultyBoxes[i]; i++) {
// 		if (difficultyBoxes[i].checked) {
// 			difficulty = difficultyBoxes[i].value;
// 			break;
// 		}
// 	}
//
// 	alert(`Players name is ${playerName}. \nDifficulty: ${difficulty} \nShip to be placed: ${shipName}`)
// }

// function login() {
// 	const username = document.getElementById('username').value;
// 	const password = document.getElementById('password').value;
// 	const data = `userName=${username}&password=${password}`;
// 	const localRequest = new XMLHttpRequest();
//
// 	localRequest.open('POST', 'http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php', false);
// 	localRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
// 	localRequest.send(data);
//
// 	console.log(localRequest.status);
//
// 	if (localRequest.status === 200) {
// 		let response = JSON.parse(localRequest.responseText);
//
// 		if(response.result === 'valid'){
// 			let loginInfo = `${response.userName} ${response.timestamp}`;
// 			localStorage.setItem('cs2550timestamp', loginInfo);
// 			document.location.href = '../views/game.html';
//
// 		}
// 		else{
// 			document.getElementById('wrong-password').style.display = "inherit";
// 		}
//
// 	}
// 	else {
// 		document.getElementById('wrong-password').style.display = "inherit";
// 		document.getElementById('wrong-password').innerHTML = "Can't connect to server!";
// 	}
// }

// function getUserInfo() {
// 	let userInfo = localStorage.getItem('cs2550timestamp');
// 	if(userInfo){
// 		document.getElementById('user-info').innerHTML = userInfo;
// 	}
// 	else{
// 		document.getElementById('user-info').innerHTML = 'Nothing in Local Storage!';
// 	}
//
// }

// function clearStorage() {
// 	localStorage.clear();
// 	getUserInfo()
// }