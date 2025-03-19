import { Link } from 'react-router';
import { testId } from './dashboard.utils';

/**
 * Entry route to main dashboard component
 * @returns {React.ReactElement}
 */
export const Dashboard = (): React.ReactElement => {
  return (
    <div data-testid={testId}>
      This is the dashboard
      <Link to={'/'}>Back to login page</Link>
    </div>
  );
};
