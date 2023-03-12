
import { Alphabet } from ".";

const toAlphabetArray = (letters: string): Alphabet[] => {
  return letters.split('').map(l => {
    return l as Alphabet;
  });
}

const VOWELS = toAlphabetArray('AEIOU'); // 3 - 4
const VOWELS_AND_Y = toAlphabetArray('AEIOUY'); // 3 - 4
const COMMON_CONSONANTS = toAlphabetArray('RSTLN'); // 4 - 5
const CONSONANTS = toAlphabetArray('BCDFGHKMPVW'); // 4 - 5
const UNCOMMON_CONSONANTS = toAlphabetArray('ZYXQJ'); // 0 - 2

const LETTER_TYPE_FREQUENCY: [Alphabet[], number, number][] = [
  [VOWELS, 3, 4],
  [VOWELS_AND_Y, 3, 4],
  [COMMON_CONSONANTS, 4, 6],
  [CONSONANTS, 5, 7],
  [UNCOMMON_CONSONANTS, 0, 2]
];

const getRandomFromArray = (alphabetArray: Alphabet[]): Alphabet => {
  return alphabetArray[
    Math.floor(Math.random() * alphabetArray.length)
  ];
}

export function makeRandomLetterSet(): Alphabet[] {
  const letterSet: Alphabet[] = [];
  LETTER_TYPE_FREQUENCY.forEach(([letterType, min, max]) => {
    const amount = Math.floor(Math.random() * (max - min)) + min;
    for(let i =0; i < amount; ++i) {
      letterSet.push(getRandomFromArray(letterType));
    }
  });
  return letterSet;
}