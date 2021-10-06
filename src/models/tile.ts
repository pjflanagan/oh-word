
import { UNSET } from '.';

export type Alphabet = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z' | '_' | '';

type TileConstructorType = {
  id?: number;
  character?: Alphabet;
  row?: number;
  col?: number;
}

type GridCoords = {
  row: number;
  col: number;
}

export type TileType = GridCoords & {
  id: number;
  character: Alphabet;
  value: number;
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

export const Tile = {
  makeTile: (tile: TileConstructorType): TileType => {
    const id = (tile.id !== undefined) ? tile.id : UNSET; // id in roll, UNSET means not set (empty grid spot)
    const character = (tile.character !== undefined) ? tile.character : ''; // a character object with letter and value
    const value = VALUES[character];
    const row = (tile.row !== undefined) ? tile.row : UNSET;
    const col = (tile.col !== undefined) ? tile.col : UNSET;
    return { id, character, value, row, col };
  },
  isPlaced: (tile: TileType): boolean => {
    return tile.row !== UNSET && tile.col !== UNSET;
  },
  getDisplayCharacter: (tile: TileType): string => {
    return tile.character === '_' ? '' : tile.character;
  },
  getDisplayValue: (tile: TileType): string | number => {
    return tile.value === 0 ? '' : tile.value;
  },
  makeUnplacedTile: (tile: TileType): TileType => {
    return {
      ...tile,
      row: UNSET,
      col: UNSET,
    };
  },
  makePlacedTile: (tile: TileType, { row, col }: GridCoords): TileType => {
    return {
      ...tile,
      row,
      col
    };
  },
};

export const EmptyTile = Tile.makeTile({});

