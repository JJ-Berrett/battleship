
function createTable(height, width) {
	// createTableArray(height, width);
	updateTable(height, width);
}

function updateTable(height, width) {
	let div = document.getElementById('battleship-container');
	let tableHtml = '<table class="table">';

	for (let i = 0; i < width; i++) {
		tableHtml += '<tr>';
		for (let j = 0; j < height; j++) {
				let cell = table[i][j];

				if(cell !== 6 && cell !== 7 && cell !== 0)
					tableHtml += '<td class="ship"></td>';
				else if(cell === 6)
					tableHtml += '<td class="hit"></td>';
				else if(cell === 7)
					tableHtml += '<td class="miss"></td>';
				else
					tableHtml += '<td class="ocean"></td>';
		}

		tableHtml += '</tr>'
	}
	tableHtml += '</table>';

	div.innerHTML = tableHtml;
}