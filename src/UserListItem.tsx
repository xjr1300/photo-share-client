import { FC } from 'react';

type Props = {
  name: string;
  avatar: string;
};

const UserListItem: FC<Props> = ({ name, avatar }) => (
  <li>
    <img src={avatar} width={48} height={48} alt="" />
    {name}
  </li>
);

export default UserListItem;
