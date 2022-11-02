import { FC, useState, useEffect, useCallback } from 'react';

import {
  useMutation,
  ApolloCache,
  InMemoryCache,
  FetchResult,
  useApolloClient,
} from '@apollo/client';
import { GITHUB_AUTH_MUTATION, ROOT_QUERY } from 'queries';
import { useNavigate } from 'react-router-dom';

import { GitHubAuthInput, GitHubAuthResult, RootQueryResult } from 'types';
import Me from 'Me';

const AuthorizedUser: FC = () => {
  const [signingIn, setSigningIn] = useState(false);
  const navigate = useNavigate();
  const client = useApolloClient();
  const [githubAuth] = useMutation<GitHubAuthResult, GitHubAuthInput>(
    GITHUB_AUTH_MUTATION
  );

  const authorizationComplete = useCallback(
    (
      _: ApolloCache<InMemoryCache>,
      { data }: FetchResult<GitHubAuthResult>
    ): void => {
      if (data != null) {
        localStorage.setItem('token', data.githubAuth.token);
      }
      // navigate(to, { replace?: To, state?: any, relative?: RelativeRoutingType })
      // to:
      //  遷移先のURL。`navigate(-1)`は履歴スタックの1つ前のページに遷移する。
      // state:
      //  遷移先に渡す状態。
      // replace:
      //  通常navigateは、ユーザーが前のページに戻るために、[戻る]ボタンをクリックするように、
      //  履歴スタックに新しいエントリーを追加する。
      //  `replace: true`にした場合、履歴スタックの現在のエントリを新しいURLに置き換える。
      //  例として、ユーザーが[購入]ボタンをクリックしたが、最初にログインする必要があった場合、
      //  ユーザーがログインした後で、ログイン画面を望ましい支払い画面に置き換えることができる。
      //  ユーザーが[戻る]ボタンをクリックしても、ユーザーはログインページを再び見ることはない。
      navigate('/', { replace: true });
    },
    [navigate]
  );

  useEffect(() => {
    if (window.location.search.match(/code=/) != null) {
      setSigningIn(true);
      const code = window.location.search.replace('?code=', '');
      const auth = async () => {
        await githubAuth({
          variables: { code },
          update: authorizationComplete,
          refetchQueries: [{ query: ROOT_QUERY }],
        });
      };
      void auth();
    }
  }, [setSigningIn, githubAuth, navigate, authorizationComplete]);

  const requestCode = () => {
    const clientId = import.meta.env.VITE_CLIENT_ID;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user`;
  };

  const logout = () => {
    setSigningIn(false);
    localStorage.removeItem('token');
    const data = client.readQuery<Omit<RootQueryResult, 'me'>>({
      query: ROOT_QUERY,
    });
    if (data !== null) {
      client.writeQuery({ query: ROOT_QUERY, data });
    }
  };

  return <Me logout={logout} requestCode={requestCode} signingIn={signingIn} />;
};

export default AuthorizedUser;
