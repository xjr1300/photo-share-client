import { FC } from 'react';

type Props = {
  name: string;
  avatar: string;
  logout: () => void;
};

const CurrentUser: FC<Props> = ({ name, avatar, logout = () => undefined }) => (
  <div>
    <img src={avatar} width={48} height={48} alt="" />
    <h1>{name}</h1>
    <button onClick={logout}>logout</button>
  </div>
);

export default CurrentUser;
