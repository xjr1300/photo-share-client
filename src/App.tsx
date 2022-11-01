import { FC } from 'react';

import { gql } from 'apollo-boost';
import { useApolloClient, useQuery } from 'react-apollo';

const title = import.meta.env.VITE_APP_TITLE;

const query = gql`
  {
    totalUsers
    totalPhotos
  }
`;

type TotalCount = {
  totalUsers: number;
  totalPhotos: number;
};

const App: FC = () => {
  const { loading, error, data } = useQuery<TotalCount>(query);
  const client = useApolloClient();

  if (loading) return <span>Loading...</span>;

  console.log('cache:', client.extract());

  return (
    <div className="App">
      <h1>{title}</h1>
      <div>{JSON.stringify(data)}</div>
      {error?.graphQLErrors.map(({ message }, i) => (
        <span key={i}>{message}</span>
      ))}
    </div>
  );
};

export default App;
