import { WordTileDirections } from "./words";

const PRELOADED_WORD_LENGTH = 5;

export class ValidatorCache {

  private validWords: string[]; // TODO: can this be alphabetized for faster search?
  private invalidWords: string[];

  constructor() {
    // TODO: preload validWords (1 - 5 letter words)
    this.validWords = [];
    this.invalidWords = [];
  }

  validateUsingCache(word: string): boolean | undefined {
    // if the word is valid, return true
    if (this.validWords.includes(word)) {
      return true;
    }
    // if the word is not valid, and the length <= 5
    // or if it is a known invalid word, return true
    if (word.length <= PRELOADED_WORD_LENGTH || this.invalidWords.includes(word)) {
      return false;
    }
    // otherwise we don't know and will have to load it into cache
    return undefined;
  }

  async loadNewWordsToCache(words: string[]): Promise<void> {
    // send a backend request using the word array
    // cache the results in valid and invalidWords
    // return an array of results
  }
}

const validatorCache = new ValidatorCache();

type ValidatedWordTileDirections = WordTileDirections & {
  isValid: boolean;
}

export const Validator = {
  validate: async (wordTileDirections: WordTileDirections[]): Promise<ValidatedWordTileDirections[]> => {
    // validate words using cache
    const cacheValidatedWords = wordTileDirections.map(w => ({
      ...w,
      isValid: validatorCache.validateUsingCache(w.word)
    }));
    // filter the ones that are true | false
    // filter the ones that are undefined, and send them to validatorCache.loadNewWordsToCache()
    // call validateUsingCache on the new words
    // combine the already validated words with the newly validated words and return
    return cacheValidatedWords as ValidatedWordTileDirections[];
  }
} 