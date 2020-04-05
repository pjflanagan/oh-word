
// ----------------------------------------------------------------------------- ANGULAR

angular.module('cwc', []).config(['$locationProvider', function ($locationProvider) {
	$locationProvider.html5Mode(true);
}]);

angular.module('cwc', []).controller('play', ['$scope', '$location', function ($scope, $location) {
	$scope.grid = makeDefaultGrid();
	$scope.tiles = [];
	$scope.selectedTile = new Tile({});

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
		});
	}

	$scope.selectGridTile = function (tile) {
		const { row, col } = tile;
		$scope.replace({ row, col, tile });
	}

	$scope.replace = function ({ row, col, tile }) {
		$scope.grid[row][col] = $scope.selectedTile;
		$scope.selectedTile.place({ row, col });
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
		if (mode === 'SCORE' && $scope.selectedTile.index !== -1) {
			// if you wanna share score and the selected tile is -1, it wont work
			return;
		}
		$scope.makeURLParams(mode).then(function () {
			document.getElementById('text').value = window.location;
			document.getElementById('text').select();
			document.execCommand('copy');
			alert('URL Copied');
		});
	}

}]);
