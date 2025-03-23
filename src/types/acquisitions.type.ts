export type Acquisition = {
  timestamp: number;
  ore_sites: number;
  x?: number;
};

export type AcquisitionsResponse = Array<Acquisition>;
