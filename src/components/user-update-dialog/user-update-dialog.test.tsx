import { UserUpdateDialog, UserUpdateDialogProps } from './user-update-dialog';
import { act, render, screen } from '@testing-library/react';
import { testId } from './user-update-dialog.utils';
import { mockWindowMatchMedia } from '@Utils/test-utils';

mockWindowMatchMedia();
const setup = (props: UserUpdateDialogProps) => {
  render(<UserUpdateDialog {...props} />);
};

const mockClose = jest.fn();
const mockUpdateUser = jest.fn();

jest.mock('../../store/api/user-service', () => ({
  useUpdateUserMutation: () => [mockUpdateUser, { isLoading: false }],
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

    const updatebtn = await screen.findByTestId(`${testId}-update-btn`);
    expect(updatebtn).toBeDisabled();
  });
});
