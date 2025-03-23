import { DayOfWeek, HistogramData } from '@/utils/data-utils';
import { DataDistribution } from '../histogram-types/histogram-types';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const getBinNumber = (selectedDistribution: DataDistribution) => {
  if (selectedDistribution === 'hourly') {
    return 23;
  }
  return 7;
};

export const getBinField = (selectedDistribution: DataDistribution) => {
  if (selectedDistribution === 'hourly') {
    return 'hour';
  }
  return 'day';
};

export const formatTick = (val: number, selectedDistribution: DataDistribution) => {
  if (selectedDistribution === 'hourly') {
    return `${val}`;
  }
  return days[val];
};

const makeInitial = (sd: DataDistribution): Record<string, any> => {
  let ds: Record<string, number> = {};
  if (sd === 'hourly') {
    for (let x = 0; x <= 24; x++) {
      ds[String(x)] = 0;
    }
  }
  if (sd === 'dow') {
    for (let x = 0; x <= 7; x++) {
      ds[String(x)] = 0;
    }
  }
  return ds;
};
