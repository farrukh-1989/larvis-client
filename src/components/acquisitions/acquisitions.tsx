import { useGetAcquisitionsQuery } from '@/store/api/acquisitions-service';
import { testId } from './acquisitions.utils';

export const Acquisitions = (): React.ReactElement => {
  const { data } = useGetAcquisitionsQuery();

  //   console.log(data, isLoading);

  return <div data-testid={testId} />;
};
