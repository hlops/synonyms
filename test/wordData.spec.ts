import { WordData, WordUtils } from '../src/wordData';
import { Storage } from '../src/storage';

describe('', () => {
  it('should ', () => {
    expect(
      WordUtils.getWords({
        word: 'test',
        results: [{ synonyms: ['s1', 's2'], also: ['s2', 's3'] }],
      } as WordData)
    ).toStrictEqual(['s1', 's2', 's3']);
  });
});
