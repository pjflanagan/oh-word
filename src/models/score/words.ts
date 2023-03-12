import { GRID_SIZE, makeGridFromTiles } from "models/grid";
import { Tile } from "models/tile";

export type WordTileDirections = {
  word: string;
  direction: 'vertical' | 'horizontal';
  tileIds: number[]
};

// returns array of words and the tileIds that make that word
function getWordsFromTiles(tiles: Tile[]): WordTileDirections[] {
  const grid = makeGridFromTiles(tiles);
  const horizontalWords: WordTileDirections[] = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    let currentWord = '';
    let wordTileIds = [];
    for (let c = 0; c < GRID_SIZE; c++) {
      if (!grid[r][c].isEmpty()) {
        currentWord += grid[r][c].getCharacter();
        wordTileIds.push(grid[r][c].getId());
      }
      if (currentWord !== '' && (c === GRID_SIZE -1 || grid[r][c].isEmpty())) {
        horizontalWords.push({
          word: currentWord,
          direction: 'horizontal',
          tileIds: wordTileIds
        });
        wordTileIds = [];
        currentWord = '';
      }
    }
  }
  const verticalWords: WordTileDirections[] = [];
  for (let c = 0; c < GRID_SIZE; c++) {
    let currentWord = '';
    let wordTileIds = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      if (!grid[r][c].isEmpty()) {
        currentWord += grid[r][c].getCharacter();
        wordTileIds.push(grid[r][c].getId());
      }
      if (currentWord !== '' && (r === GRID_SIZE -1 || grid[r][c].isEmpty())) {
        verticalWords.push({
          word: currentWord,
          direction: 'vertical',
          tileIds: wordTileIds
        });
        wordTileIds = [];
        currentWord = '';
      }
    }
  }
  return [...horizontalWords, ...verticalWords];
}

export type WordLengthScore = {
  lastLetterTile: number;
  direction: 'vertical' | 'horizontal';
  score: number
};

const WORD_LENGTH_SCORES = [0, 0, 0, 1, 2, 3, 6, 9, 12, 16, 25];

function getWordLengthScores(wordTileDirections: WordTileDirections[]): WordLengthScore[] {
  return wordTileDirections.map(({ word, direction, tileIds }) => {
    return {
      lastLetterTile: tileIds[tileIds.length - 1],
      direction,
      score: WORD_LENGTH_SCORES[word.length],
    };
  }).filter(({ score }) => score !== 0);
}

export type WordValidationResults = {
  errorTileIds: number[];
  wordLengthScores: WordLengthScore[];
}

export function validateWords(tiles: Tile[]): WordValidationResults {
  const wordTileDirections = getWordsFromTiles(tiles);
  const wordLengthScores = getWordLengthScores(wordTileDirections);
  console.log(wordLengthScores);
  return {
    errorTileIds: [],
    wordLengthScores,
  }
}