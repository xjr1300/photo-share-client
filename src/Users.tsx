import { FC } from 'react';
import { useQuery, useSubscription } from '@apollo/client';

// 循環参照が気になるため、src/queries.tsxでROOT_QUERYを定義
import { NewPhoto, NewUser, RootQueryResult } from 'types';
import UserList from './UserList';
import { LISTEN_FOR_PHOTOS, LISTEN_FOR_USERS, ROOT_QUERY } from './queries';

const Users: FC = () => {
  // コンポーネントがマウントされたとき、ユーザーをリストで取得する。
  const { loading, data, refetch } = useQuery<RootQueryResult>(ROOT_QUERY);
  // 登録されるユーザーを購読することで、上記で取得したデータのキャッシュを更新する。
  // キャシュを更新することで、UIが再レンダリングされる。
  useSubscription<NewUser>(LISTEN_FOR_USERS, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      const data = client.readQuery<RootQueryResult>({ query: ROOT_QUERY });
      if (data?.allUsers != null && subscriptionData?.data?.newUser != null) {
        data.totalUsers += 1;
        data.allUsers = [...data.allUsers, subscriptionData.data.newUser];
      }
      client.writeQuery({ query: ROOT_QUERY, data });
    },
  });
  useSubscription<NewPhoto>(LISTEN_FOR_PHOTOS, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      const data = client.readQuery<RootQueryResult>({ query: ROOT_QUERY });
      if (data?.allPhotos != null && subscriptionData?.data?.newPhoto != null) {
        data.totalPhotos += 1;
        data.allPhotos = [...data.allPhotos, subscriptionData.data.newPhoto];
      }
      client.writeQuery({ query: ROOT_QUERY, data });
    },
  });

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
