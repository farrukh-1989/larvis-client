import { useTokenExists } from '@/hooks/useTokenExists';
import { LoginForm } from '../../features/login-form/login-form';
import { testId } from './login.utils';
import { Flex } from 'antd';

export const Login = (): React.ReactElement => {
  useTokenExists();

  return (
    <Flex data-testid={testId} gap="middle" vertical flex={100}>
      <LoginForm />
    </Flex>
  );
};
