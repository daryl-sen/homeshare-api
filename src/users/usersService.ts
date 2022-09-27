import { BaseService } from '../common/baseService';
import USER_QUERIES from '../db/queries/userQueries';
import { User } from './user';

// A post request should not contain an id.
export type UserCreationParams = Pick<
  User,
  "userName" | "displayName" | "encryptedPassword" | "isAdmin" | "lastLogin"
>;

export class UsersService extends BaseService {
  constructor() {
    super();
  }

  public async get(userName: string): Promise<Omit<User, "encryptedPassword">> {
    const fetchedUser = this.getUserQuery(userName);

    return fetchedUser;
  }

  public async create(createParams: UserCreationParams): Promise<User> {
    const query = this.createUserQuery(createParams);

    // fetch the newly created user after creation
    return await this.getUserQuery(createParams.userName);
  }

  // public edit(updateParams: UserCreationParams) {
  //   try {
  //     this.editUserQuery(updateParams);
  //   } catch (e) {
  //     console.log(e);
  //   }

  //   return {
  //     id: Math.floor(Math.random() * 10000), // Random
  //     ...updateParams,
  //   };
  // }

  private createUserQuery(params: UserCreationParams): void {
    const { userName, displayName, isAdmin, encryptedPassword } = params;

    // this order MUST be maintained
    const query = this.runQuery(USER_QUERIES.CREATE_USER, [
      userName,
      displayName,
      encryptedPassword,
      isAdmin ? "1" : "0",
      new Date().toISOString(),
    ]);
  }

  private async getUserQuery(userName: string): Promise<User> {
    const fetchedUser: User = (await this.runQueryAndReturn(
      USER_QUERIES.READ_USER,
      [userName]
    )) as User;

    return { ...fetchedUser, encryptedPassword: "" };
  }

  // private editUserQuery(params: UserCreationParams): void {
  //   const { userName, displayName, isAdmin, encryptedPassword } = params;

  //   // this order MUST be maintained
  //   const query = this.runQuery(USER_QUERIES.UPDATE_USER, [
  //     userName,
  //     displayName,
  //     encryptedPassword,
  //     isAdmin ? "1" : "0",
  //     new Date().toISOString(),
  //   ]);
  // }

  // private deleteUserQuery(userId: number): void {
  //   // this order MUST be maintained
  //   const query = this.runQuery(USER_QUERIES.DELETE_USER, [userId]);
  // }
}
