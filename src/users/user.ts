export interface User {
  id: number;
  userName: string;
  displayName: string;
  encryptedPassword: string;
  lastLogin: string;
  isAdmin: boolean;
}
