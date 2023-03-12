export interface CoinData {
  country: string;
  year: number;
  issuingVolume: number;
  feature: string;
  description: string;
  image: string;
}

export type CoinsData = CoinData[];
