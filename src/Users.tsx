/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react';
import { useQuery } from 'react-apollo';

// 循環参照が気になるため、src/queries.tsxでROOT_QUERYを定義
import { ROOT_QUERY } from './queries';

type User = {
  githubLogin: string;
  name: string;
  avatar: string;
};

type AllUsers = {
  totalUsers: number;
  allUsers: User[];
};

const Users: FC = () => {
  // QueryコンポーネントをHookに変更
  const { loading, error, data } = useQuery<AllUsers>(ROOT_QUERY);

  return <p>Users are loading: {loading ? 'yes' : 'no'}</p>;
};

export default Users;
