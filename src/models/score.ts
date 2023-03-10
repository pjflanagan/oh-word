import { getClusterScore } from "./cluster";
import { Tile } from "./tile";

export type Score = {
  errorTileIds: number[];
  clusterTileIds: number[];
  wordLengthScores: [number, 'bottom' | 'right', number][];
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
  // const errorTileIds = getSpellingErrors();

  return {
    errorTileIds: [],
    clusterTileIds: largestCluster,
    wordLengthScores: [],
    totalScore: clusterScore,
  }
}