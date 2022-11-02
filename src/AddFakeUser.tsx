import { FC } from 'react';

import { useMutation } from '@apollo/client';
import * as lodash from 'lodash';

import { RootQueryResult, User } from 'types';
import { ADD_FAKE_USERS_MUTATION, ROOT_QUERY } from './queries';

const AddFakeUser: FC = () => {
  const [addFakeUsers, { loading, error }] = useMutation(
    ADD_FAKE_USERS_MUTATION,
    {
      variables: { count: 1 },
      update: (cache, { data: { addFakeUsers } }) => {
        const data = cache.readQuery<Omit<RootQueryResult, 'me'>>({
          query: ROOT_QUERY,
        });
        console.log(`data: ${JSON.stringify(data)})`);
        console.log(`newFaceUsers: ${JSON.stringify(addFakeUsers)})`);
        if (data !== null && Array.isArray(addFakeUsers)) {
          /*
          eslint-disable @typescript-eslint/restrict-plus-operands,
                         @typescript-eslint/no-unsafe-call,
                         @typescript-eslint/no-unsafe-member-access,
                         @typescript-eslint/no-unsafe-assignment
          */
          // apollo3-cache-persistはキャッシュをイミュータブルにしている。
          // よって、lodashでキャッシュをディープコピーして編集する。
          const newCache = lodash.cloneDeep(data);
          newCache.totalUsers += addFakeUsers.length;
          newCache.allUsers = [...data.allUsers, ...(addFakeUsers as User[])];
          console.log(`updated data: ${JSON.stringify(newCache)})`);
          cache.writeQuery({ query: ROOT_QUERY, data: newCache });
          /*
          eslint-enable @typescript-eslint/restrict-plus-operands,
                         @typescript-eslint/no-unsafe-call,
                         @typescript-eslint/no-unsafe-member-access,
                         @typescript-eslint/no-unsafe-assignment
          */
        }
      },
    }
  );

  if (loading) return <p>Registering fake user...</p>;
  if (error != null) return <p>Raise error: `${JSON.stringify(error)}`</p>;

  return (
    <button onClick={async () => await addFakeUsers()}>Add fake user</button>
  );
};

export default AddFakeUser;
