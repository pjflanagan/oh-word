
import { Grid, GRID_SIZE, UNSET } from '.';

export type Alphabet = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z' | ' ';

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
  'G': 3,
  'H': 4,
  'I': 1,
  'J': 8,
  'K': 6,
  'L': 2,
  'M': 4,
  'N': 2,
  'O': 2,
  'P': 3,
  'Q': 10,
  'R': 1,
  'S': 1,
  'T': 1,
  'U': 2,
  'V': 5,
  'W': 6,
  'X': 8,
  'Y': 4,
  'Z': 10,
  ' ': 0
};

type SurroundingTiles = {
  up: Tile;
  down: Tile;
  left: Tile;
  right: Tile;
  total: number;
}

export class Tile {
  private row: number;
  private col: number;
  private id: number;
  private character: Alphabet;
  private value: number;

  constructor(tileData: TileConstructorType) {
    this.id = (tileData.id !== undefined) ? tileData.id : UNSET; // id in roll, UNSET means not set (empty grid spot)
    this.character = (tileData.character !== undefined) ? tileData.character : ' '; // a character object with letter and value
    this.value = VALUES[this.character];
    this.row = (tileData.row !== undefined) ? tileData.row : UNSET;
    this.col = (tileData.col !== undefined) ? tileData.col : UNSET;

  }

  getId(): number {
    return this.id;
  }

  getCharacter(): string {
    return this.character;
  }

  getValue(): number {
    return this.value;
  }

  getLocation() {
    return {
      row: this.row,
      col: this.col
    }
  }

  isSet(): boolean {
    return this.id !== UNSET;
  }

  isEmpty() {
    return this.id === UNSET;
  }

  isPlaced() {
    return this.row !== UNSET && this.col !== UNSET;
  }

  getDisplayCharacter(): string {
    return this.character;
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

  getSurroundingTiles(grid: Grid) {
    const up = (this.row > 0) ? grid[this.row - 1][this.col] : EmptyTile;
    const down = (this.row < GRID_SIZE - 1) ? grid[this.row + 1][this.col] : EmptyTile;
    const left = (this.col > 0) ? grid[this.row][this.col - 1] : EmptyTile;
    const right = (this.col < GRID_SIZE - 1) ? grid[this.row][this.col + 1] : EmptyTile;
    const total = [up, down, left, right]
      .map(tile => tile.isSet() ? 1 : 0)
      .reduce((count, existingTiles) => count + existingTiles, 0 as number);

    return {
      up,
      down,
      left,
      right,
      total,
      exists: {
        up: up.isSet(),
        down: down.isSet(),
        left: left.isSet(),
        right: right.isSet(),
      }
    }
  }

  isDoubled(grid: Grid): boolean {
    const { up, down, left, right } = this.getSurroundingTiles(grid).exists;
    return (up || down) && (left || right);
  }
}

export const EmptyTile = new Tile({});