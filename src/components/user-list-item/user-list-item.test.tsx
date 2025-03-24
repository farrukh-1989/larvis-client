import { UserListItem, UserListItemProps } from './user-list-item';
import { screen, act, render } from '@testing-library/react';
import { testIds } from './user-list-item.utils';
import { mockWindowMatchMedia } from '@Utils/test-utils';

mockWindowMatchMedia();
const setup = (props: UserListItemProps) => {
  render(<UserListItem {...props} />);
};

const mockGetUser = jest.fn(() => Promise.resolve({ user: 'Alice', user_id: 'Alice' }));
const mockUpdateUser = jest.fn(() => Promise.resolve({ name: 'Alice', password: '5678' }));

jest.mock('@Store/api/user-service', () => ({
  useLazyGetUserQuery: () => [mockGetUser, { data: { user: 'Alice', name: 'Alice' } }],
  useUpdateUserMutation: () => [mockUpdateUser, { isLoading: false }],
}));

describe('User list item rendering tests', () => {
  it('should render list item', async () => {
    await act(async () => setup({ user: { name: 'Alice', user_id: 'Alice' } }));
    const meta = await screen.findByTestId(`${testIds.metaUser}-Alice`);
    const btn = await screen.findByTestId(`${testIds.btnUpdateUser}-Alice`);
    const li = await screen.findByTestId(`${testIds.listUser}-Alice`);

    expect(meta).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
    expect(li).toBeInTheDocument();
  });
});
