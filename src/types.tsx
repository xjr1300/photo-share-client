export type User = {
  githubLogin: string;
  name: string;
  avatar: string;
};

export type RootQueryResult = {
  totalUsers: number;
  allUsers: User[];
  me: User;
};

export type AddFakeUsersInput = {
  count: number;
};

export type AddFakeUsersResult = User[];

export type GitHubAuthInput = {
  code: string;
};

export type GitHubAuthResult = {
  githubAuth: {
    token: string;
  };
};
