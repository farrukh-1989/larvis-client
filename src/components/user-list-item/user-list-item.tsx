import { useLazyGetUserQuery } from '@Store/api/user-service';
import { User } from '@/types/users.api.type';
import { Avatar, Button, List } from 'antd';
import { useTranslation } from 'react-i18next';
import { UserUpdateDialog } from '../user-update-dialog/user-update-dialog';
import { useState } from 'react';
import { testIds } from './user-list-item.utils';

export type UserListItemProps = {
  user?: User;
};

export const UserListItem = (props: UserListItemProps): React.ReactElement => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [getUser, { data: userData }] = useLazyGetUserQuery();

  const handleCloseDialog = () => setIsModalOpen(false);

  /**
   * Get the user and try to change password
   */
  const handleGetUserAndChangePwd = () => {
    setIsModalOpen(true);
    getUser({ user_id: props.user?.user_id ?? '' });
  };
  return (
    <>
      <List.Item
        data-testid={`${testIds.listUser}-${userData?.name}`}
        actions={[
          <Button
            size="small"
            onClick={handleGetUserAndChangePwd}
            data-testid={`${testIds.btnUpdateUser}-${userData?.name}`}
          >
            {t('users.update-user')}
          </Button>,
        ]}
      >
        <List.Item.Meta
          data-testid={`${testIds.metaUser}-${userData?.name}`}
          avatar={<Avatar>{props.user?.name.charAt(0)}</Avatar>}
          title={props.user?.name}
          description="Astronaut"
        />
      </List.Item>
      <UserUpdateDialog isOpen={isModalOpen} user={userData} onCloseDialog={handleCloseDialog} />
    </>
  );
};
