import { useGetAcquisitionsQuery } from '@/store/api/acquisitions-service';
import { generateHourlyData, generateDayOfWeekData } from '@/utils/data-utils';
import { Card } from 'antd';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataDistribution, HistogramTypes } from '../histogram-types/histogram-types';
import { formatTick, getBinField, getBinNumber } from './histogram-chart.utils';
import { VictoryAxis, VictoryChart, VictoryHistogram, VictoryTheme } from 'victory';

export const HistogramChart = (): React.ReactElement => {
  // fetch the data
  const { data: acquisitions } = useGetAcquisitionsQuery();
  const [selectedDistribution, setSelectedDistribution] = useState<DataDistribution>('hourly');
  const { t } = useTranslation();

  const handleSelectDistribution = (dist: DataDistribution) => setSelectedDistribution(dist);

  /**
   * Generate hourly buckets
   */
  const hourly = useMemo(() => {
    if (acquisitions) {
      return generateHourlyData(acquisitions);
    }
  }, [acquisitions]);

  /**
   * Generate day of week buckets
   */
  const dayOfWeek = useMemo(() => {
    if (acquisitions) {
      return generateDayOfWeekData(acquisitions);
    }
  }, [acquisitions]);

  const data = selectedDistribution === 'hourly' ? hourly : dayOfWeek;

  return (
    <Card
      title={t('acquisitions.acquisitions')}
      style={{ textAlign: 'left' }}
      extra={[<HistogramTypes selected={selectedDistribution} onSelectHistogramType={handleSelectDistribution} />]}
    >
      <Card.Meta description={t('acquisitions.description-acquisitions')} />
      <VictoryChart theme={VictoryTheme.clean} padding={24} height={180}>
        <VictoryHistogram
          data={data}
          x={getBinField(selectedDistribution)}
          binSpacing={2}
          bins={getBinNumber(selectedDistribution)}
          style={{
            data: {
              fill: () => '#b75f21',
            },
          }}
        />
        <VictoryAxis
          tickCount={getBinNumber(selectedDistribution)}
          tickFormat={(date: number) => formatTick(date, selectedDistribution)}
          style={{
            tickLabels: {
              fontSize: 6,
            },
          }}
        />
        <VictoryAxis dependentAxis style={{ tickLabels: { fontSize: 6 } }} />
      </VictoryChart>
    </Card>
  );
};
