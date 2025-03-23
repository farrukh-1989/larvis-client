import { testId } from './acquisitions.utils';
import { HistogramChart } from '../../components/histogram-chart/histogram-chart';
import Card from 'antd/es/card/Card';
import { useTranslation } from 'react-i18next';

export const Acquisitions = (): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <div data-testid={testId}>
      <Card title={t('acquisitions.acquisitions')} style={{ textAlign: 'left' }}>
        <HistogramChart />
      </Card>
    </div>
  );
};
