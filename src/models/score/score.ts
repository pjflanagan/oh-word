import { getClusterScore } from "./cluster";
import { Tile } from "../tile";
import { validateWords, WordValidationResults } from "./words";


export type Score = WordValidationResults & {
  clusterTileIds: number[];
  totalScore: number;
}

export const NO_SCORE: Score = {
  errorTileIds: [],
  clusterTileIds: [],
  wordLengthScores: [],
  totalScore: 0,
}

export function getScore(tiles: Tile[]): Score {
  const { score: clusterScore, largestCluster } = getClusterScore(tiles);
  const { errorTileIds, wordLengthScores } = validateWords(tiles.filter(t => largestCluster.includes(t.id)));

  const totalWordLengthScore = wordLengthScores.reduce((accum, wordScore) => wordScore.score + accum, 0);

  return {
    clusterTileIds: largestCluster,
    errorTileIds,
    wordLengthScores,
    totalScore: clusterScore + totalWordLengthScore,
  }
}