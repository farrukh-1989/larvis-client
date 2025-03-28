import { Acquisitions } from '@/features/acquisitions/acquisitions';
import { testId } from './dashboard.utils';
import { Button, Col, Flex, Layout, Row } from 'antd';
import { UserList } from '@/features/user-list/user-list';
import { Logo } from '@/components/logo/logo';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { clearSessionStorage } from '@/services/session-storage-service';
import { AppRoutes } from '@/utils/constants';

import './dashboard.css';
/**
 * Entry route to main dashboard component
 * @returns {React.ReactElement}
 */
export const Dashboard = (): React.ReactElement => {
  const { t } = useTranslation();
  const n = useNavigate();

  const handleSignoutUser = () => {
    clearSessionStorage();
    n(AppRoutes.login);
  };

  return (
    <div className="app-wrapper" data-testid={testId}>
      <Flex gap="middle">
        <Layout style={{ backgroundColor: 'transparent' }}>
          <Layout.Header>
            <Row justify={'space-between'} align={'middle'}>
              <Logo />
              <Button onClick={handleSignoutUser}>{t('common.signout')}</Button>
            </Row>
          </Layout.Header>
          <Layout.Content style={{ boxSizing: 'border-box', padding: '24px' }}>
            <Row gutter={12}>
              <Col span={14} xs={24} lg={14} style={{ marginBottom: '12px' }}>
                <Acquisitions />
              </Col>
              <Col span={10} xs={24} lg={10}>
                <UserList />
              </Col>
            </Row>
          </Layout.Content>
          <Layout.Footer style={{ backgroundColor: 'transparent' }}></Layout.Footer>
        </Layout>
      </Flex>
    </div>
  );
};
