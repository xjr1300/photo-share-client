import { FC } from 'react';
import { useQuery } from '@apollo/client';

// 循環参照が気になるため、src/queries.tsxでROOT_QUERYを定義
import { RootQueryResult } from 'types';
import UserList from './UserList';
import { ROOT_QUERY } from './queries';

const Users: FC = () => {
  // QueryコンポーネントをHookに変更
  const { loading, data, refetch } = useQuery<RootQueryResult>(ROOT_QUERY);

  return (
    <>
      <p>loading users...{loading ? 'yes' : 'no'}</p>
      {!loading && (
        <UserList
          count={data?.totalUsers}
          users={data?.allUsers}
          refetchUsers={refetch}
        />
      )}
    </>
  );
};

export default Users;
