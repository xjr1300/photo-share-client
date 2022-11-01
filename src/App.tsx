import { FC } from 'react';
import AuthorizedUser from 'AuthorizedUser';
import Users from 'Users';

const App: FC = () => (
  <>
    <AuthorizedUser />
    <Users />
  </>
);

export default App;
