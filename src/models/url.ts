export { }
// function pad(num) {
//   var s = "0" + num;
//   return s.substr(s.length - 2);
// }

// const makeURLParams = function (mode, tiles) {
//   return JSON.stringify(
//     tiles.map(tile => {
//       const row = (mode === 'ROLL') ? -1 : pad(tile.row);
//       const col = (mode === 'ROLL') ? -1 : pad(tile.col);
//       return `${tile.character}${row}${col}`;
//     }).toString()
//   );
// };

// const makeTilesFromURL = function (tiles) {
//   const newTiles = [];
//   JSON.parse(tiles).split(',').forEach((tile, i) => {
//     const character = tile[0];
//     const row = parseInt(tile[1] + tile[2]);
//     const col = parseInt(tile[3] + tile[4]);
//     newTiles.push(new Tile({ index: i, character, row, col }));
//   });
//   return newTiles;
// };
