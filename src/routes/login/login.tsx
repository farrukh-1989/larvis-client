import { useTokenExists } from '@/hooks/useTokenExists';
import { LoginForm } from '../../features/login-form/login-form';
import { testId } from './login.utils';
import { Space } from 'antd';

import './login.css';
import { Logo } from '@/components/logo/logo';

export const Login = (): React.ReactElement => {
  useTokenExists();

  return (
    <div className="wrapper">
      <Space data-testid={testId} direction="vertical" align="center">
        <Logo />
        <LoginForm />
      </Space>
    </div>
  );
};
