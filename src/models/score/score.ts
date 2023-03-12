import { getClusterScore } from "./cluster";
import { Tile } from "../tile";
import { getWordLengthScores, WordLengthScore, getWordsFromTiles } from "./words";


export type Score = {
  clusterTileIds: number[];
  totalScore: number;
  errorTileIds: number[];
  wordLengthScores: WordLengthScore[];
}

export const NO_SCORE: Score = {
  errorTileIds: [],
  clusterTileIds: [],
  wordLengthScores: [],
  totalScore: 0,
}

export function getScore(tiles: Tile[]): Score {
  const { score: clusterScore, largestCluster } = getClusterScore(tiles);
  const largestClusterTiles = tiles.filter(t => largestCluster.includes(t.getId()!));
  const wordTileDirections = getWordsFromTiles(largestClusterTiles);
  const wordLengthScores = getWordLengthScores(wordTileDirections);

  const totalWordLengthScore = wordLengthScores.reduce((accum, wordScore) => wordScore.score + accum, 0);

  const errorTileIds: number[] = [];

  return {
    clusterTileIds: largestCluster,
    errorTileIds,
    wordLengthScores,
    totalScore: errorTileIds.length === 0 ? clusterScore + totalWordLengthScore : 0,
  }
}