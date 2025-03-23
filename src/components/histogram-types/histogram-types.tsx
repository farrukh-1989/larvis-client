import { Button, Space } from 'antd';
import { useTranslation } from 'react-i18next';

export type DataDistribution = 'hourly' | 'dow';

type HistogramTypesProps = {
  selected: DataDistribution;
  onSelectHistogramType: (dd: DataDistribution) => void;
};

export const HistogramTypes = ({ selected, onSelectHistogramType }: HistogramTypesProps): React.ReactElement => {
  const { t } = useTranslation();

  const handleSetHourly = () => onSelectHistogramType('hourly');
  const handleSetDow = () => onSelectHistogramType('dow');

  return (
    <Space.Compact>
      <Button type={selected === 'hourly' ? 'primary' : 'default'} onClick={handleSetHourly}>
        {t('acquisitions.hourly')}
      </Button>
      <Button type={selected === 'dow' ? 'primary' : 'default'} onClick={handleSetDow}>
        {t('acquisitions.dow')}
      </Button>
    </Space.Compact>
  );
};
