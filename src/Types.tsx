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
