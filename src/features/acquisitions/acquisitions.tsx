import { testId } from './acquisitions.utils';
import { HistogramChart } from '../../components/histogram-chart/histogram-chart';

export const Acquisitions = (): React.ReactElement => {
  return (
    <div data-testid={testId}>
      <HistogramChart />
    </div>
  );
};
