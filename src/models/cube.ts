
import { Alphabet } from ".";

// TODO: turn this into one method of generating rolls
// but then come up with my own
// Cube contains all the letters on a cube and can be rolled
// this DOES NOT retain which letter is currently facing up

type Cube = Alphabet[];

export function makeCubeRollString(): Alphabet[] {
  const roll: Alphabet[] = [];
  CUBES.forEach((cube: Cube) => {
    roll.push(rollCube(cube));
  });
  return roll;
}

const makeCube = (letters: string): Cube => {
  return letters.split('').map(l => {
    return l as Alphabet;
  });
}

const rollCube = (cube: Cube): Alphabet => {
  return cube[
    Math.floor(Math.random() * cube.length)
  ];
}

export const CUBES = [
  makeCube('ZXWTSN'),
  makeCube('QJBNTR'),
  makeCube('HVGDLN'),
  makeCube('FPCMTR'),
  makeCube('KBDGSR'),
  makeCube('WPDSTL'),
  makeCube('FVENLR'),
  makeCube('HMGELR'),
  makeCube('CSAEIO'),
  makeCube('NTAEIO'),
  makeCube('AEIOUY'),
  makeCube('AEIOUY'),
  makeCube('AEIOU_'),
  makeCube('AEIOU_')
];
