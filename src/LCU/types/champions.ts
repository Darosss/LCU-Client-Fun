export interface ChampionData {
  active: boolean;
  alias: string;
  banVoPath: string;
  baseLoadScreenPath: string;
  baseSplashPath: string;
  botEnabled: boolean;
  chooseVoPath: string;
  disabledQueues: string[];
  freeToPlay: boolean;
  id: number;
  name: string;
  ownership: {
    loyaltyReward: boolean;
    owned: boolean;
    rental: {
      endDate: number;
      purchaseDate: number;
      rented: boolean;
      winCountRemaining: number;
    };
    xboxGPReward: boolean;
  };
  purchased: number;
  rankedPlayEnabled: boolean;
  roles: string[];
  squarePortraitPath: string;
  stingerSfxPath: string;
  title: string;
}

//Need only some things
export interface DataDragonChampionDataResponse {
  data: DataDragonChampionResponseKeyValue;
}
export interface DataDragonChampionDataRequired {
  key: string;
  name: string;
}

export interface DataDragonChampionResponseKeyValue {
  [key: string]: DataDragonChampionDataRequired;
}

export interface DataDragonChampionsJsonFileData {
  id: number;
  name: string;
}
