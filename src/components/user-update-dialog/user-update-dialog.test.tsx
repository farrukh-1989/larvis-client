import { UserUpdateDialog, UserUpdateDialogProps } from './user-update-dialog';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { testIds } from './user-update-dialog.utils';
import { mockWindowMatchMedia } from '@Utils/test-utils';

mockWindowMatchMedia();
const setup = (props: UserUpdateDialogProps) => {
  render(<UserUpdateDialog {...props} />);
};

const mockClose = jest.fn();
const mockUpdateUser = jest.fn(() => Promise.resolve({ name: 'Alice', password: '5678' }));
const mockGetUser = jest.fn(() => Promise.resolve({ user: 'Alice', user_id: 'Alice' }));

jest.mock('../../store/api/user-service', () => ({
  useUpdateUserMutation: () => [mockUpdateUser, { isLoading: false }],
  useLazyGetUserQuery: () => [mockGetUser, { data: { user: 'Alice', user_id: 'Alice' } }],
}));

describe('User update dialog tests', () => {
  it('should disable update button when fields are empty', async () => {
    await act(async () => {
      setup({
        isOpen: true,
        onCloseDialog: mockClose,
        isLoading: false,
        user: { name: 'Alice', password: '1234' },
      });
    });

    const updatebtn = await screen.findByTestId(`${testIds.btnUpdate}`);
    expect(updatebtn).toBeDisabled();
  });

  it('should call update method when required fields are present', async () => {
    await act(async () => {
      setup({
        isOpen: true,
        onCloseDialog: mockClose,
        isLoading: false,
        user: { name: 'Alice', password: '1234' },
      });
    });

    const nameInput = await screen.findByTestId(`${testIds.inputName}`);
    fireEvent.change(nameInput, { target: { value: 'Alice new' } });
    const oldPwdInput = await screen.findByTestId(`${testIds.inputOldPwd}`);
    fireEvent.change(oldPwdInput, { target: { value: '1234' } });
    const newPwdInput = await screen.findByTestId(`${testIds.inputNewPwd}`);
    fireEvent.change(newPwdInput, { target: { value: '5678' } });

    const updatebtn = await screen.findByTestId(`${testIds.btnUpdate}`);
    expect(updatebtn).toBeEnabled();

    await act(async () => {
      fireEvent.click(updatebtn);
    });

    expect(mockUpdateUser).toHaveBeenCalled();
  });

  it('should display message instead of fields and call close method', async () => {
    await act(async () => {
      setup({
        isOpen: true,
        onCloseDialog: mockClose,
        isLoading: false,
        user: { name: 'Alice', password: '' },
      });
    });

    const invalidMsg = await screen.findByTestId(`${testIds.msgInvalidUser}`);
    expect(invalidMsg).toBeInTheDocument();
    const closeBtn = await screen.findByTestId(`${testIds.btnClose}`);
    fireEvent.click(closeBtn);
    expect(mockClose).toHaveBeenCalled();
  });
});
