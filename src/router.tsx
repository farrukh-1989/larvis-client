import { Route, Routes } from 'react-router';
import { Login } from '@Routes/login/login';
import { Dashboard } from '@Routes/dashboard/dashboard';

export const Router = (): React.ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};
