import assert from 'assert';

import { makeTilesFromTileString, getScore } from '.'; // getLargestCluster

type TestData = [string, number];

describe('models/score.ts', function () {
  describe('makeClusters', function () {
    const td: TestData[] = [
      ['D0902-E0802-O0702-D0602-N0502-R0402-E0302-W0202-C1002-N1102-L1202-A1302-_0102-E0002', 20],
      ['R1100-C0303-S1103-E1101-_0907-A0807-X0304-O0403-I0404-N0504-W0405-H0305-L0503-U0505', 44],
      ['T0406-S0507-T0506-F0407-G0606-M0607-R0605-T0505-E0608-A0706-E0705-O0707-E0708-I0203', 37],
      ['T0406-S0507-T0506-F0407-G0606-M0607-R0605-T0505-E0608-A0706-E0705-O0707-E0708-I0405', 40],
    ];

    td.forEach(([tileString, expectedScore]) => {
      const tiles = makeTilesFromTileString(tileString);
      it(`should return ${expectedScore} for ${tileString}`, function () {
        assert.equal(getScore(tiles), expectedScore);
      });
    });
  });
});

