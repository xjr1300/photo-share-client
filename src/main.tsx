import React from 'react';
import ReactDOM from 'react-dom/client';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import App from 'App';

const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
