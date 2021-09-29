
import { Alphabet } from ".";

// Cube contains all the letters on a cube and can be rolled
// this DOES NOT retain which letter is currently facing up
export class CubeModel {

  letters: Alphabet[];

  constructor(letters: string) {
    this.letters = letters.split('').map(l => {
      return l as Alphabet;
    });
  }

  roll(): Alphabet {
    return this.letters[
      Math.floor(Math.random() * this.letters.length)
    ];
  }
}

export const CUBES = [
  new CubeModel('ZXWTSN'),
  new CubeModel('QJBNTR'),
  new CubeModel('HVGDLN'),
  new CubeModel('FPCMTR'),
  new CubeModel('KBDGSR'),
  new CubeModel('WPDSTL'),
  new CubeModel('FVENLR'),
  new CubeModel('HMGELR'),
  new CubeModel('CSAEIO'),
  new CubeModel('NTAEIO'),
  new CubeModel('AEIOUY'),
  new CubeModel('AEIOUY'),
  new CubeModel('AEIOU_'),
  new CubeModel('AEIOU_')
];
