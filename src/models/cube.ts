
import { Alphabet } from ".";

// Cube contains all the letters on a cube and can be rolled
// this DOES NOT retain which letter is currently facing up
// TODO: remove class, make this functions

export type Cube = Alphabet[];

export const makeCube = (letters: string): Cube => {
  return letters.split('').map(l => {
    return l as Alphabet;
  });
}

export const rollCube = (cube: Cube): Alphabet => {
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
