import { ReactTyped } from 'react-typed';

export const Logo = (): React.ReactElement => {
  return (
    <div>
      <ReactTyped strings={['Larvis__']} typeSpeed={40} style={{ fontSize: '24px', fontWeight: 'bold' }} />
    </div>
  );
};
