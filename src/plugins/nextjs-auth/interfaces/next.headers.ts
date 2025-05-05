/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| babl.one :: /interfaces/next.headers.ts    
//|| Read Only Headers
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

export interface ReadonlyHeaders {
      get(name: string): string | null;
      getAll?(name: string): string[];
      has?(name: string): boolean;
      entries?(): IterableIterator<[string, string]>;
      keys?(): IterableIterator<string>;
      values?(): IterableIterator<string>;
      forEach(callbackfn: (value: string, key: string, parent: ReadonlyHeaders) => void, thisArg?: any): void;
      [Symbol.iterator](): IterableIterator<[string, string]>;
}