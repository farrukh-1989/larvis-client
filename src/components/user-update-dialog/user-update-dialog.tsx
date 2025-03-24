import { useUpdateUserMutation } from '@Store/api/user-service';
import { GetUserResponse } from '@Types/users.api.type';
import { isStringValid } from '../../utils/common';
import { isPwdChangeValid } from '../../utils/user-utils';
import { Button, Col, Input, Modal, notification, Row } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { testIds } from './user-update-dialog.utils';

export type UserUpdateDialogProps = {
  isOpen: boolean;
  isLoading?: boolean;
  user?: GetUserResponse;
  onCloseDialog: () => void;
};

// If the user is the logged in user they receive password in response (weird)
// use it to confirm password change
// otherwise display message that user is not logged in user and pwd cannot be changed
export const UserUpdateDialog = ({
  isLoading,
  isOpen,
  user,
  onCloseDialog,
}: UserUpdateDialogProps): React.ReactElement | null => {
  const { t } = useTranslation();
  const [name, setName] = useState<string>(user?.name ?? '');
  const [oldPwd, setOldPwd] = useState<string>('');
  const [newPwd, setNewPwd] = useState<string>('');
  const [validationMsg, setValidationMsg] = useState<string>('');
  const [updateUser, { isLoading: updatingUser }] = useUpdateUserMutation();
  const [noti, contextHolder] = notification.useNotification({});

  useEffect(() => {
    return () => {
      setValidationMsg('');
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  const canChangePwd = isOpen && !isLoading && user && user?.password?.trim().length > 0;
  const isUpdateDisabled =
    (newPwd.length <= 3 || oldPwd.length <= 3 || updatingUser) && (name === user?.name || !isStringValid(name));

  /**
   * Validate if old pwd and users pwd are same
   * If not, then throw error
   * otherwise make POST req
   */
  const handleValidatePwdChange = () => {
    setValidationMsg('');
    const v = isPwdChangeValid(oldPwd, user);
    if (!v.valid) {
      setValidationMsg(v.reason ?? '');
    } else {
      updateUser({ name: name, password: newPwd, user_id: user?.name })
        .then(() => {
          noti.info({
            message: t('users.updated'),
            description: t('users.updated-description', { name: user?.name }),
            placement: 'topRight',
          });
          onCloseDialog();
        })
        .catch(() => {
          noti.error({
            message: 'users.update-failed',
            description: t('users.update-failed-description', { name: user?.name }),
            placement: 'topRight',
          });
        });
    }
  };

  const renderFooter = (): React.ReactElement => {
    return (
      <>
        {contextHolder}
        <Button onClick={onCloseDialog} data-testid={testIds.btnClose}>
          {t('common.cancel')}
        </Button>
        {canChangePwd && (
          <Button
            type="primary"
            disabled={isUpdateDisabled}
            onClick={handleValidatePwdChange}
            data-testid={testIds.btnUpdate}
          >
            {t('users.update-user')}
          </Button>
        )}
      </>
    );
  };

  const handleOldPwChange = (e: ChangeEvent<HTMLInputElement>) => setOldPwd(e.target.value);
  const handleNewPwChange = (e: ChangeEvent<HTMLInputElement>) => setNewPwd(e.target.value);
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);

  return (
    <Modal
      loading={isLoading}
      open={isOpen}
      onCancel={onCloseDialog}
      onClose={onCloseDialog}
      title={t('users.update-user')}
      footer={renderFooter}
    >
      {!canChangePwd && <p data-testid={testIds.msgInvalidUser}>{t('users.cant-change-pwd', { name: user?.name })}</p>}
      {canChangePwd && (
        <Row gutter={8}>
          <Col span={24}>
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
              data-testid={testIds.inputName}
            />
          </Col>
          <Col span={24} style={{ marginTop: '12px' }}>
            <Input
              type="password"
              placeholder="Current password"
              value={oldPwd}
              onChange={handleOldPwChange}
              data-testid={testIds.inputOldPwd}
            />
          </Col>
          <Col span={24} style={{ marginTop: '12px' }}>
            <Input
              type="password"
              placeholder="New password"
              value={newPwd}
              onChange={handleNewPwChange}
              data-testid={testIds.inputNewPwd}
            />
          </Col>
          <p>{validationMsg}</p>
        </Row>
      )}
    </Modal>
  );
};
