import { useGetAcquisitionsQuery } from '@/store/api/acquisitions-service';
import { generateHourlyData, generateDayOfWeekData } from '@/utils/data-utils';
import { Histogram } from '@ant-design/charts';
import { Col, Row } from 'antd';
import { useMemo } from 'react';

export const HistogramChart = (): React.ReactElement => {
  // fetch the data
  const { data: acquisitions } = useGetAcquisitionsQuery();

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

  return (
    <Row>
      <Col span={12}>
        <Histogram data={hourly ?? []} binField={'hour'} binNumber={24} />
      </Col>
      <Col span={12}>
        <Histogram data={dayOfWeek ?? []} binField={'day'} binNumber={7} />
      </Col>
      <Col span={12}>
        <Histogram data={hourly ?? []} binField={'hour'} binNumber={24} />
      </Col>
      <Col span={12}>
        <Histogram data={hourly ?? []} binField={'hour'} binNumber={24} />
      </Col>
    </Row>
  );
};
