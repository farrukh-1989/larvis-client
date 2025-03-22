import { Acquisitions } from '@/components/acquisitions/acquisitions';
import { testId } from './dashboard.utils';
import { Flex, Layout } from 'antd';

/**
 * Entry route to main dashboard component
 * @returns {React.ReactElement}
 */
export const Dashboard = (): React.ReactElement => {
  return (
    <Flex gap="middle" wrap data-testid={testId}>
      <Layout>
        <Layout.Header></Layout.Header>
        <Layout.Content>
          <Acquisitions />
        </Layout.Content>
        <Layout.Footer></Layout.Footer>
      </Layout>
    </Flex>
  );
};
