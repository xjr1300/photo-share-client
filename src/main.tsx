import React from 'react';
import ReactDOM from 'react-dom/client';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

import App from 'App';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
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
