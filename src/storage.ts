import Keyv from 'keyv';
import KeyvFile from 'keyv-file';
import _ from 'lodash';
import fetch from 'node-fetch';
import { WordData, WordUtils } from './wordData';

export class Storage {
  private store: Keyv<WordData>;
  private fetchQueu: _.Dictionary<Promise<WordData>> = {};

  constructor(filename = '.store') {
    this.store = new Keyv<WordData>({
      store: new KeyvFile({
        filename,
      }),
    });
  }

  public get(word: string): Promise<WordData> {
    return this._get(word, true);
  }

  public set(data: WordData): Promise<true> {
    const map = WordUtils.getWords(data).map((word) =>
      this._get(word, false).then((d) => {
        console.log('loaded: ', d.word);
      })
    );
    return Promise.all<Promise<any>>([this.store.set(data.word, data), ...map]).then(() => true);
  }

  private _get(word: string, loadSimilar: boolean): Promise<WordData> {
    return (
      this.fetchQueu[word] ||
      this.store.get(word).then((data) => {
        if (!data) {
          return (
            this.fetchQueu[word] ||
            (this.fetchQueu[word] = this.fetch(word).then((data) => {
              return this._set(data, loadSimilar).then(() => {
                delete this.fetchQueu[word];
                return data;
              });
            }))
          );
        }
        return data;
      })
    );
  }

  private _set(data: WordData, loadSimilar: boolean): Promise<true> {
    if (loadSimilar) {
      const map = WordUtils.getWords(data).map((word) =>
        this._get(word, false).then((d) => {
          console.log('loaded: ', d.word);
        })
      );
      return Promise.all<Promise<any>>([this.store.set(data.word, data), ...map]).then(() => true);
    } else {
      return this.store.set(data.word, data);
    }
  }

  // noinspection JSMethodCanBeStatic
  private fetch(word: string): Promise<WordData> {
    var when = '2021-02-26T11:11:53.097Z';
    var encrypted = '8cfdb18be722919be89707beee58bfb8aeb52e0930f690b8';
    return fetch(
      `https://www.wordsapi.com/mashape/words/${encodeURIComponent(word)}?when=${when}&encrypted=${encrypted}`,
      {
        headers: {},
      }
    ).then((response) => response.json());
  }
}
