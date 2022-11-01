import { FC } from 'react';
import { useMutation } from '@apollo/client';

import { AddFakeUsersInput, AddFakeUsersResult } from 'types';
import { ADD_FAKE_USERS_MUTATION, ROOT_QUERY } from './queries';

const AddFakeUser: FC = () => {
  const [addFakeUsers, { loading, error }] = useMutation<
    AddFakeUsersResult,
    AddFakeUsersInput
  >(ADD_FAKE_USERS_MUTATION, {
    variables: { count: 1 },
    refetchQueries: [{ query: ROOT_QUERY }],
  });

  if (loading) return <p>Registering fake user...</p>;
  if (error != null) return <p>Raise error: `${JSON.stringify(error)}`</p>;

  return (
    <button onClick={async () => await addFakeUsers()}>Add fake user</button>
  );
};

export default AddFakeUser;
