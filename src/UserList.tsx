import { FC } from 'react';

import { User } from 'types';
import UserListItem from 'UserListItem';

type Props = {
  count?: number;
  users?: User[];
  refetchUsers?: () => void;
};

const UserList: FC<Props> = ({
  count = 0,
  users = [],
  refetchUsers = () => undefined,
}) => (
  <div>
    <p>{count}</p>
    <button onClick={() => refetchUsers()}>Refresh Users</button>
    <ul>
      {users.map((user) => (
        <UserListItem
          key={user.githubLogin}
          name={user.name}
          avatar={user.avatar}
        />
      ))}
    </ul>
  </div>
);

export default UserList;
