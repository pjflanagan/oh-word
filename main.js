
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
		this.place({ row, col });
		this.angle = (Math.random() * 6) - 3;
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

	unplace() {
		this.row = -1;
		this.col = -1;
	}

	place({ row, col }) {
		this.row = (row === undefined) ? -1 : row;
		this.col = (col === undefined) ? -1 : col;

		if (this.index >= 0) {
			const deg = Math.random() * 6 - 3;
			this.style = { transform: `rotate(${deg}deg)` };
		} else this.style = '';
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
	for (let row = 0; row < 14; row++) {
		grid.push([])
		for (let col = 0; col < 14; col++) {
			grid[row].push(new Tile({ row, col }));
		}
	}
	return grid;
}

const makeGridFromTiles = function (tiles) {
	const grid = makeDefaultGrid();
	tiles.forEach(tile => {
		const { row, col } = tile;
		grid[row][col] = tile;
		tile.place({ row, col });
	});
	return grid;
};

const makeRandomGrid = function (tiles) {
	const grid = makeDefaultGrid();
	tiles.forEach(tile => {
		let placed = false;
		while (!placed) {
			const row = Math.floor(Math.random() * 14);
			const col = Math.floor(Math.random() * 14);
			if (grid[row][col].index === -1) {
				grid[row][col] = tile;
				tile.place({ row, col });
				placed = true;
			}
		}
	});
	return grid;
}

function pad(num) {
	var s = "0" + num;
	return s.substr(s.length - 2);
}

const makeURLParams = function (mode, tiles) {
	return JSON.stringify(
		tiles.map(tile => {
			const row = (mode === 'ROLL') ? -1 : pad(tile.row);
			const col = (mode === 'ROLL') ? -1 : pad(tile.col);
			return `${tile.character}${row}${col}`;
		})
	);
};

const makeTilesFromURL = function (tiles) {
	const newTiles = [];
	JSON.parse(tiles).forEach((tile, i) => {
		const character = tile[0];
		const row = parseInt(tile[1] + tile[2]);
		const col = parseInt(tile[3] + tile[4]);
		newTiles.push(new Tile({ index: i, character, row, col }));
	});
	return newTiles;
};

// ----------------------------------------------------------------------------- ANGULAR

angular.module('cwc', []).config(['$locationProvider', function ($locationProvider) {
	$locationProvider.html5Mode(true);
}]);

angular.module('cwc', []).controller('play', ['$scope', '$location', function ($scope, $location) {
	$scope.grid = makeDefaultGrid();
	$scope.tiles = [];
	$scope.selectedTile = -1;

	$scope.init = function () {
		// if there are no tiles then don't place them
		// if there are tiles, then place them as they say
		const { tiles, mode } = $location.search();
		// TODO: if the mode is random, run random grid, otherwise leave them as is
		if (!tiles || tiles.length === 0) {
			$scope.newRoll();
		} else {
			$scope.tiles = makeTilesFromURL(tiles);
			if (mode === 'SCORE') {
				$scope.grid = makeGridFromTiles($scope.tiles);
			} else {
				$scope.grid = makeRandomGrid($scope.tiles); // reset the grid
			}
		}
	}

	$scope.newRoll = function () {
		const rollString = makeRollString();
		$scope.tiles = makeTiles(rollString); // set the tiles to the new roll
		$scope.grid = makeRandomGrid($scope.tiles); // reset the grid

		$scope.makeURLParams();
	}

	$scope.makeURLParams = async function (mode = 'SCORE') {
		$location.search({
			tiles: makeURLParams(mode, $scope.tiles),
			mode
		});
	}

	$scope.selectHeaderTile = function (tile) {
		const { row, col } = tile;
		if (tile.isInPlay()) {
			// if this tile is placed, then call it back and set it as selected
			$scope.unplace({ tile, row, col })
		} else {
			// if this tile is not placed set the selected tile
			$scope.selectedTile = tile;
		}
	}

	$scope.selectGridTile = function (tile) {
		const { row, col } = tile;
		if (tile.index !== -1) {
			// if there is a tile here -> remove it and set it as selected tile
			$scope.unplace({ tile, row, col });
		} else if ($scope.selectedTile !== -1) {
			// if there is no tile here and there is a selected tile -> place that tile here
			$scope.place({ row, col });
		}
		// otherwise do nothing
	}

	$scope.place = function ({ row, col }) {
		$scope.grid[row][col] = $scope.selectedTile;
		$scope.selectedTile.place({ row, col });
		// unselect this tile
		$scope.selectedTile = -1;

		$scope.makeURLParams();
	}

	$scope.unplace = function ({ tile, row, col }) {
		$scope.grid[row][col] = new Tile({ row, col });
		tile.unplace();
		$scope.selectedTile = tile;

		$scope.makeURLParams();
	}

	$scope.score = function () {
		const largestCluster = getLargestCluster($scope.grid, $scope.tiles);
		const grid = $scope.grid;
		let scoreLargestCluster = 0;
		let scoreOthers = 0;
		$scope.tiles.forEach(tile => {
			if (largestCluster.includes(tile.index)) {
				// if this is in the largest cluster then determine how much it is worth
				if (tile.row === -1 || tile.col === -1) {
					// if this tile is not on the board then don't look for its neighbors
					return;
				}

				// get the tiles around it
				const up = (tile.row > 0 && grid[tile.row - 1][tile.col].index !== -1) ? true : false;
				const down = (tile.row < 13 && grid[tile.row + 1][tile.col].index !== -1) ? true : false;
				const left = (tile.col > 0 && grid[tile.row][tile.col - 1].index !== -1) ? true : false;
				const right = (tile.col < 13 && grid[tile.row][tile.col + 1].index !== -1) ? true : false;

				// if it is in a up down word, add it's score
				if (up || down) {
					scoreLargestCluster += tile.value;
				}

				// if it is in a right left word, add it's score too
				if (right || left) {
					scoreLargestCluster += tile.value;
				}
			} else {
				// if it isn't in the largest cluster then add it's score to the others
				scoreOthers += tile.value;
			}
		});
		return scoreLargestCluster - scoreOthers;
	}

	$scope.displayScore = function () {
		const score = $scope.score();
		return (score < 0) ? 0 : score;
	}

	$scope.styleGridTile = function (tile) {
		let className = '';
		if (tile.index === -1) {
			className += 'empty ';
			// we have selected a tile and can place it on a square
			if ($scope.selectedTile !== -1) {
				className += 'selectable ';
			}
			return className;
		}
		if (tile.index !== -1) {
			return 'real selectable';
		}
	}

	$scope.copyURL = function (mode) {
		$scope.makeURLParams(mode).then(function () {
			document.getElementById('text').value = window.location;
			document.getElementById('text').select();
			document.execCommand('copy');
			alert('URL Copied');
		});
	}

}]);

const getLargestCluster = function (grid, tiles) {
	const clusters = makeClusters(grid, tiles);
	let largestCluster = [];
	clusters.forEach(cluster => {
		if (cluster.length > largestCluster.length) {
			largestCluster = cluster;
		}
	});
	return largestCluster;
}

const makeClusters = function (grid, tiles) {
	let untrackedTiles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
	const clusters = [];
	while (untrackedTiles.length > 0) {
		const tile = tiles[untrackedTiles[0]];
		if (tile.row === -1 || tile.col === -1) {
			// if it hasn't been played then it can be considered an individual cluster
			clusters.push([tile.index]);
			untrackedTiles.shift()
		} else {
			// otherwise it is on the board, so try and make a cluster from it
			let cluster = makeCluster(grid, tile, []);
			cluster = Array.from(new Set(cluster));
			clusters.push(cluster);
			untrackedTiles = untrackedTiles.filter(index => !cluster.includes(index));
		}
	}
	return clusters;
}

const makeCluster = function (grid, tile, cluster) {
	// if there is no index, then this is not a tile
	if (tile.index === -1 || tile.character === '') {
		return [];
	}

	// add this index to the cluster
	cluster.push(tile.index);

	// get the surrounding tiles
	const up = (tile.row > 0) ? grid[tile.row - 1][tile.col] : { index: -1 };
	const down = (tile.row < 13) ? grid[tile.row + 1][tile.col] : { index: -1 };
	const left = (tile.col > 0) ? grid[tile.row][tile.col - 1] : { index: -1 };
	const right = (tile.col < 13) ? grid[tile.row][tile.col + 1] : { index: -1 };

	// add the sub clusters to this cluster if they are not already
	if (!cluster.includes(up.index)) {
		cluster.concat(makeCluster(grid, up, cluster));
	}
	if (!cluster.includes(down.index)) {
		cluster.concat(makeCluster(grid, down, cluster));
	}
	if (!cluster.includes(left.index)) {
		cluster.concat(makeCluster(grid, left, cluster));
	}
	if (!cluster.includes(right.index)) {
		cluster.concat(makeCluster(grid, right, cluster));
	}

	return cluster;
}

