export type User = {
  githubLogin: string;
  name: string;
  avatar: string;
};

export type AllUsers = {
  totalUsers: number;
  allUsers: User[];
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
