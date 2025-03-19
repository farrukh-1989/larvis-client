import { Card, Form, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';

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

  return (
    <Card>
      <Form name="login" layout="vertical">
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
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
