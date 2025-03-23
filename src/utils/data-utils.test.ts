import { Acquisition } from '@/types/acquisitions.type';
import { generateDayOfWeekData, generateHourlyData } from './data-utils';

describe('Data formation tests', () => {
  it('should create correct length of data with given dataset', () => {
    const sample: Acquisition[] = [{ timestamp: 1742772667, ore_sites: 32 }];
    const d = generateHourlyData(sample);
    expect(d.length).toBe(sample[0].ore_sites);

    // should have paresed correct hour
    expect(d[12].hour).toBe(1);
  });

  it('should create correct length of data with given dataset', () => {
    const sample: Acquisition[] = [{ timestamp: 1742772667, ore_sites: 32 }];
    const d = generateDayOfWeekData(sample);
    expect(d.length).toBe(sample[0].ore_sites);

    // should have paresed correct hour
    expect(d[12].day).toBe(1);
  });
});
