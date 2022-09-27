export interface User {
  id: number;
  userName: string;
  displayName: string;
  encryptedPassword: string;
  lastLogin: string;
  isAdmin: boolean;
}

export type UserWithoutPassword = Omit<User, "encryptedPassword"> & {
  encryptedPassword: undefined;
};
