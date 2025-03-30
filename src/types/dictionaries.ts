import { IBaseSearchParams } from "./pagination";

export interface IDictionary {
  id: string;
  name: string;
  // Have to be stored in the dictionary table
  // nameRU: string;
  // nameEN: string;
  // nameKZ: string;
}

export interface IDictionaryListWithId extends IBaseSearchParams {
  cityId: string;
}
