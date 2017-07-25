'use strict';

let missileImg = '';
let heightToMove = 700;
let missileTop = 0;
let margin = 10;
let timeout = 100;

function moveMissile() {
	missileImg = document.getElementById("missile-img");
	setTimeout(move, timeout);
}

function move() {
	missileTop += 20;
	missileImg.style.top = missileTop + "px";

	if (missileTop < heightToMove - missileImg.height - margin) {
		setTimeout(move, timeout);
	}
	else {
		missileImg.style.display = 'none';
	}
}