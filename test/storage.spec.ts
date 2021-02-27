import * as fs from 'fs';
import { Storage } from '../src/storage';

const TEST_VALUE1 = Object.freeze({ word: 'test' });

describe('Storage', () => {
  let store: Storage;

  beforeEach(() => {
    const filename = '.test';
    if (fs.existsSync(filename)) {
      fs.rmSync(filename);
    }
    store = new Storage(filename);
  });

  describe('', () => {
    it('should ', (done) => {
      const spyFetch = jest
        .spyOn(store as any, 'fetch')
        .mockReturnValue(new Promise((resolve) => setTimeout(resolve, 50, TEST_VALUE1)));
      Promise.all([store.get('test'), store.get('test'), store.get('test')]).then((values) => {
        expect(values[0]).toBe(TEST_VALUE1);
        expect(spyFetch).toBeCalledTimes(1);
        done();
      });
    });
  });
});
