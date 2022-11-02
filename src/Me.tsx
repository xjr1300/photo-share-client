import { FC } from 'react';
import { useQuery } from '@apollo/client';
import { RootQueryResult } from 'types';
import CurrentUser from 'CurrentUser';
import { ROOT_QUERY } from './queries';

type Props = {
  logout: () => void;
  requestCode: () => void;
  signingIn: boolean;
};

const Me: FC<Props> = ({
  logout = () => undefined,
  requestCode = () => undefined,
  signingIn = false,
}) => {
  const { loading, data, error } = useQuery<RootQueryResult>(ROOT_QUERY);
  console.log(`data: ${JSON.stringify(data)}`);

  if (!signingIn) {
    return (
      <button onClick={requestCode} disabled={signingIn}>
        Sign In with GitHub
      </button>
    );
  }

  if (error != null) {
    return <p>{`Error: ${JSON.stringify(error)}`}</p>;
  }

  if (loading) {
    return <p>loading...</p>;
  }

  return <CurrentUser {...(data as RootQueryResult).me} logout={logout} />;
};

export default Me;
