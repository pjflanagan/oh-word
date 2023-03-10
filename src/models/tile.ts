
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

export class Tile {
  row: number;
  col: number;
  id: number;
  character: Alphabet;
  value: number;

  constructor(tileData: TileConstructorType) {
    this.id = (tileData.id !== undefined) ? tileData.id : UNSET; // id in roll, UNSET means not set (empty grid spot)
    this.character = (tileData.character !== undefined) ? tileData.character : ''; // a character object with letter and value
    this.value = VALUES[this.character];
    this.row = (tileData.row !== undefined) ? tileData.row : UNSET;
    this.col = (tileData.col !== undefined) ? tileData.col : UNSET;

  }

  isEmpty() {
    return this.character === '';
  }

  isPlaced() {
    return this.row !== UNSET && this.col !== UNSET;
  }

  getDisplayCharacter(): string {
    return this.character === '_' ? '' : this.character;
  }

  getDisplayValue(): string | number {
    return this.value === 0 ? '' : this.value;
  }

  unplaceTile(): Tile {
    this.row = UNSET;
    this.col = UNSET;
    return this;
  }

  placeTile({ row, col }: GridCoords): Tile {
    this.row = row;
    this.col = col;
    return this;
  }
}

export const EmptyTile = new Tile({});