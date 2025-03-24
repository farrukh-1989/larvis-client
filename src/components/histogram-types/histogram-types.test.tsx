import { DataDistribution, HistogramTypes, HistogramTypesProps } from './histogram-types';
import { render, act, screen, fireEvent } from '@testing-library/react';
import { testIds } from './histogram-types.utils';

const mockSelectHistogramType = jest.fn();
const selectedHistogramType: DataDistribution = 'hourly';

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (i18nKey: string) => i18nKey,
      // or with TypeScript:
      //t: (i18nKey: string) => i18nKey,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));

const setup = async (props: HistogramTypesProps) => {
  render(<HistogramTypes {...props} />);
};

describe('Histogram types component tests', () => {
  it('should call method to update chart mode to hourly', async () => {
    await act(() => setup({ onSelectHistogramType: mockSelectHistogramType, selected: selectedHistogramType }));
    const hourly = await screen.findByTestId(testIds.btnHourly);
    expect(hourly).toBeInTheDocument();
    fireEvent.click(hourly);
    expect(mockSelectHistogramType).toHaveBeenCalled();
  });

  it('should call method to update chart mode to dow', async () => {
    await act(() => setup({ onSelectHistogramType: mockSelectHistogramType, selected: selectedHistogramType }));
    const dow = await screen.findByTestId(testIds.btnDow);
    expect(dow).toBeInTheDocument();
    fireEvent.click(dow);
    expect(mockSelectHistogramType).toHaveBeenCalled();
  });
});
