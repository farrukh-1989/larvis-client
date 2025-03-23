import { UserListItem } from '@/components/user-list-item/user-list-item';
import { useGetUsersQuery } from '@/store/api/user-service';
import { Card, List } from 'antd';
import { useTranslation } from 'react-i18next';

export const UserList = (): React.ReactElement => {
  /**
   * Get list of users
   */
  const { data } = useGetUsersQuery();

  const { t } = useTranslation();

  return (
    <Card title={t('users.users')} style={{ textAlign: 'start' }}>
      <List>
        {data?.map((u) => (
          <UserListItem key={u.name} user={u} />
        ))}
      </List>
    </Card>
  );
};
