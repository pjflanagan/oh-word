
import { Game } from '.';

export type Alphabet = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z' | '_' | '';

type GridCoords = {
  row?: number;
  col?: number;
}

type TileModelConstructor = GridCoords & {
  index?: number;
  character?: Alphabet;
}

// VALUES are all the values of each letter
export const VALUES = {
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

// Tile holds a character and an index in the roll
export class TileModel {

  index: number;
  character: Alphabet;
  value: number;
  row: number;
  col: number;
  // angle: number;

  constructor({ index, character, row, col }: TileModelConstructor) {
    this.index = index || -1; // index in roll, -1 means not set (empty grid spot)
    this.character = (!!character) ? character : ''; // a character object with letter and value
    this.value = !!character ? Game.getValue(character) : 0;
    this.row = row || -1;
    this.col = col || -1;
    // this.angle = (Math.random() * 6) - 3;
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

  place({ row, col }: GridCoords) {
    this.row = row || -1;
    this.col = col || -1;

    // if (this.index >= 0) {
    //   const deg = Math.random() * 6 - 3;
    //   this.style = { transform: `rotate(${deg}deg)` };
    // } else this.style = '';
  }
}

export const EmptyTile = new TileModel({});

