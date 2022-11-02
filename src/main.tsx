import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  concat,
} from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

import App from 'App';

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token') ?? '';

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token,
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
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
