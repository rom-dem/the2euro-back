export interface CoinData {
  country: string;
  year: number;
  issuingVolume: number;
  feature: string;
  description: string;
  image: string;
  id: string;
  owner: string;
}

export type CoinsData = CoinData[];
