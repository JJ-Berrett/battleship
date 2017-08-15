'use strict';

let players; 
let request;

function getGameData() {
	request = new XMLHttpRequest();
	request.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			players = this.responseText;
			let div = document.getElementById('json');
			div.innerHTML = players;
		}
	};
	request.open("GET", "../js/game.json", true);
	request.send();

}
