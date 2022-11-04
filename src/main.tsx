/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from 'apollo-utilities';
import { LocalStorageWrapper, persistCacheSync } from 'apollo3-cache-persist';
import { OperationDefinitionNode } from 'graphql';
import { createClient } from 'graphql-ws';
import { BrowserRouter } from 'react-router-dom';

import App from 'App';

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });
const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000/graphql',
  })
);

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext((context: { headers: any }) => ({
    headers: {
      ...context.headers,
      authorization: localStorage.getItem('token'),
    },
  }));

  return forward(operation);
});

const httpAuthLink = authLink.concat(httpLink);

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(
      query
    ) as OperationDefinitionNode;

    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpAuthLink
);

const cache = new InMemoryCache();

persistCacheSync({
  cache,
  storage: new LocalStorageWrapper(localStorage),
});

if (localStorage['apollo-cache-persist'] !== undefined) {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument */
  const cacheData = JSON.parse(localStorage['apollo-cache-persist']);
  cache.restore(cacheData);
  /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument */
}

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Strictモードにおいて、開発モードではコンポーネントが2回レンダリングされる。
// AuthorizedUserコンポーネントでGitHubからアクセス・トークンを取得する際、
// コードが正常に渡されず、`Bad Credentials`が返却される。
// 開発モードで正常に動作するか確認するためには、以下のコードをアンコメントして、
// 上記のコードをコメントアウトする。
// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <BrowserRouter>
//     <ApolloProvider client={client}>
//       <App />
//     </ApolloProvider>
//   </BrowserRouter>
// );
