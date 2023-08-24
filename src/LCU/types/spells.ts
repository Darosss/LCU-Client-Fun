export interface DataDragonSpellsDataResponse {
  data: DataDragonSpellsResponseKeyValue;
}
export interface DataDragonSpellsDataRequired {
  key: string;
  name: string;
  modes: string[];
  summonerLevel: number;
}

export interface DataDragonSpellsResponseKeyValue {
  [key: string]: DataDragonSpellsDataRequired;
}

export interface DataDragonSpellsJsonFileData {
  id: number;
  name: string;
  modes: string[];
  summonerLevel: number;
}
