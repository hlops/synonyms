import _ from 'lodash';

export interface WordResult {
  definition: string;
  partOfSpeech: string;
  also?: string[];
  antonyms?: string[];
  attribute?: string[];
  derivation?: string[];
  examples?: string[];
  hasTypes?: string[];
  similarTo?: string[];
  synonyms?: string[];
  typeOf?: string[];
  usageOf?: string[];
}

export interface WordData {
  word: string;
  pronunciation: string;
  frequency: number;
  results: WordResult[];
}

export class WordUtils {
  public static getWords(data: WordData) {
    return _.chain(data.results)
      .reduce<string[]>((result, value) => {
        if (value.synonyms) {
          if (value.synonyms) result.push(...value.synonyms);
          if (value.also) result.push(...value.also);
          if (value.antonyms) result.push(...value.antonyms);
          if (value.similarTo) result.push(...value.similarTo);
        }
        return result;
      }, [])
      .sort()
      .sortedUniq()
      .value();
  }
}
