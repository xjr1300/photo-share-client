export type User = {
  githubLogin: string;
  name: string;
  avatar: string;
};

export type NewUser = {
  newUser: User;
};

export type Photo = {
  id: string;
  name: string;
  url: string;
};

export type NewPhoto = {
  newPhoto: Photo;
};

export type RootQueryResult = {
  totalUsers: number;
  allUsers: User[];
  totalPhotos: number;
  allPhotos: Photo[];
  me: User;
};

export type GitHubAuthInput = {
  code: string;
};

export type GitHubAuthResult = {
  githubAuth: {
    token: string;
  };
};
