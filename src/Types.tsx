export interface EraStatus {
  status: ActiveEra;
}

export interface ActiveEra {
  id: number,
  era: number,
  hash: string,
  block: number,
  date: string,
  points: number
}

export interface Report { 
  eraId: number,
  stakeTotal: number,
  stakeOwn: number,
  points: number,
  rewards: number,
  commission: number,
  blocksCount: number
}