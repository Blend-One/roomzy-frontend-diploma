import { IBaseSearchParams } from "./pagination";

export interface IDictionary {
  id: string;
  nameRU: string;
  nameEN: string;
  nameKZ: string;
}

export interface IDictionaryListWithId extends IBaseSearchParams {
  dictionaryId: string;
}
