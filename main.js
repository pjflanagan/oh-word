
// Cube contains all the letters on a cube and can be rolled
// this DOES NOT retain which letter is currently facing up
class Cube {
	constructor(letters) {
		this.letters = letters; // string of letters on the die
	}

	roll() {
		return this.letters[
			Math.floor(Math.random() * this.letters.length)
		];
	}
}

// VALUES are all the values of each letter
const VALUES = {
	'A': 1,
	'B': 3,
	'C': 3,
	'D': 2,
	'E': 1,
	'F': 4,
	'G': 2,
	'H': 4,
	'I': 1,
	'J': 8,
	'K': 5,
	'L': 1,
	'M': 3,
	'N': 1,
	'O': 1,
	'P': 3,
	'Q': 10,
	'R': 1,
	'S': 1,
	'T': 1,
	'U': 1,
	'V': 4,
	'W': 4,
	'X': 8,
	'Y': 4,
	'Z': 10,
	'_': 0,
	'': 0
};

const getValue = function (character) {
	return VALUES[character];
}

// Tile holds a character and an index in the roll
class Tile {
	constructor({ index, character, row, col }) {
		this.index = (index === undefined) ? -1 : index; // index in roll, -1 means not set (empty grid spot)
		this.character = (!!character) ? character : ''; // a character object with letter and value
		this.value = getValue(character);
		this.row = (row === undefined) ? -1 : row;
		this.col = (col === undefined) ? -1 : col;
	}

	isInPlay() {
		return this.row !== -1 && this.col !== -1;
	}

	displayCharacter() {
		if (this.character === '_') {
			return '';
		}
		return this.character;
	}

	displayValue() {
		if (this.value === 0) {
			return '';
		}
		return this.value;
	}
}

const CUBES = [
	new Cube('ZXWTSN'),
	new Cube('QJBNTR'),
	new Cube('HVGDLN'),
	new Cube('FPCMTR'),
	new Cube('KBDGSR'),
	new Cube('WPDSTL'),
	new Cube('FVENLR'),
	new Cube('HMGELR'),
	new Cube('CSAEIO'),
	new Cube('NTAEIO'),
	new Cube('AEIOUY'),
	new Cube('AEIOUY'),
	new Cube('AEIOU_'),
	new Cube('AEIOU_')
];

const makeRollString = function () {
	let rollString = '';
	// if there is no rollString, then make one
	CUBES.forEach(cube => {
		rollString += cube.roll();
	});
	return rollString;
}

// makes the tiles from the roll
const makeTiles = function (rollString) {
	const tiles = [];
	for (let i = 0; i < rollString.length; i++) {
		tiles.push(new Tile({ index: i, character: rollString[i] }))
	}
	return tiles;
};

// returns a default grid
const makeDefaultGrid = function () {
	const grid = [];
	for (let i = 0; i < 14; i++) {
		grid.push([])
		for (let j = 0; j < 14; j++) {
			grid[i].push(new Tile({ row: i, col: j }));
		}
	}
	return grid;
}

// ----------------------------------------------------------------------------- ANGULAR

angular.module('cwc', []).controller('play', ['$scope', '$location', function ($scope, $location) {
	$scope.grid = makeDefaultGrid();
	$scope.tiles = [];
	$scope.selectedTile = -1;

	// ------------------------------------------------------------------------- INIT

	$scope.init = function () {
		const { r } = $location.search();
		console.log(r);
		if (!r || r === '') {
			$scope.newRoll();
		} else {
			$scope.tiles = makeTiles(r);
		}
	}

	$scope.newRoll = function () {
		const rollString = makeRollString();
		$location.search('r', rollString);
		$scope.tiles = makeTiles(rollString); // set the tiles to the new roll
		$scope.grid = makeDefaultGrid(); // reset the grid
	}

	$scope.selectHeaderTile = function (tile) {
		console.log(tile);

		const { row, col } = tile;
		if (tile.isInPlay()) {
			// if this tile is placed, then call it back and set it as selected
			$scope.grid[row][col] = new Tile({ row, col });
			tile.row = -1;
			tile.col = -1;
			$scope.selectedTile = tile;
		} else {
			// if this tile is not placed set the selected tile
			$scope.selectedTile = tile;
		}
	}

	$scope.selectGridTile = function (tile) {
		console.log($scope.selectedTile);
		const { row, col } = tile;
		if (tile.index !== -1) {
			// if there is a tile here -> remove it and set it as selected tile
			$scope.grid[row][col] = new Tile({ row, col });
			tile.row = -1;
			tile.col = -1;
			$scope.selectedTile = tile;
		} else if ($scope.selectedTile !== -1) {
			// if there is no tile here and there is a selected tile -> place that tile here
			$scope.grid[row][col] = $scope.selectedTile;
			$scope.selectedTile.row = row;
			$scope.selectedTile.col = col;
			// unselect this tile
			$scope.selectedTile = -1;
		}
		// otherwise do nothing
	}

	$scope.score = function () {
		let score = 0;
		// if it borders nothing subtract it from the score
		// if it borders something left/right and up/dow then multiply by two and add it
		// if it borders something in just one direction then add it
	}

}]);
