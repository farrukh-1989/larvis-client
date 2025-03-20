import { useLoginMutation } from '@/store/api/login-service';
import { isStringValid } from '@/utils/common';
import { AppRoutes } from '@/utils/constants';
import { Card, Form, Input, Button, FormProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

type FieldType = {
  username?: string;
  password?: string;
};

/**
 * Input users username and password as a form
 * Login user and navigate to dashboard
 * Save token in session storage
 * @returns React element
 */
export const LoginForm = (): React.ReactElement => {
  const { t } = useTranslation();
  const [login] = useLoginMutation();
  const n = useNavigate();

  /**
   * Submit the login form
   */
  const handleFormSubmit: FormProps<FieldType>['onFinish'] = (vals) => {
    if (isStringValid(vals.username) && isStringValid(vals.password)) {
      login({ user_id: vals.username as string, password: vals.password as string }).then(() => n(AppRoutes.dashboard));
    }
  };

  return (
    <Card>
      <Form name="login" layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item<FieldType>
          label={t('login.username')}
          name="username"
          rules={[{ required: true, message: t('login.username-warning') }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label={t('login.password')}
          name="password"
          rules={[{ required: true, message: t('login.password-warning') }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" block>
            {t('login.submit')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
