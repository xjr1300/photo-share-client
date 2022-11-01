export type User = {
  githubLogin: string;
  name: string;
  avatar: string;
};

export type AllUsers = {
  totalUsers: number;
  allUsers: User[];
};
