import { AcquisitionsResponse } from '@/types/acquisitions.type';
import { fromUnixTime, format } from 'date-fns';

export type HistogramData = {
  hour: number; // x times ore_sites acquired at that hour
};

export type DayOfWeek = {
  day: string;
};

export type Pagination = {
  hasNext?: boolean;
  harPrevious?: boolean;
};

/**
 * Group data timestamps into hours
 *
 */
export const generateHourlyData = (acq: AcquisitionsResponse): Array<HistogramData> => {
  let data: Array<HistogramData> = [];

  acq.forEach((a) => {
    const hours = fromUnixTime(a.timestamp).getHours();
    const sites = Array(a.ore_sites).fill({ hour: hours });
    data = [...data, ...sites];
  });
  return data;
};

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const generateDayOfWeekData = (acq: AcquisitionsResponse): Array<DayOfWeek> => {
  let data: Array<DayOfWeek> = [];
  acq.forEach((a) => {
    const day = fromUnixTime(a.timestamp).getDay();
    const sites = Array(a.ore_sites).fill({ day });
    data = [...data, ...sites];
  });
  return data;
};
