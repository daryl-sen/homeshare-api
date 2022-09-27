import { BaseService } from '../common/baseService';
import USER_QUERIES from '../db/queries/userQueries';
import camelize from '../helpers/camelize';
import { User, UserWithoutPassword } from './user';

export type UserCreationParams = Pick<
  User,
  "userName" | "displayName" | "encryptedPassword" | "isAdmin" | "lastLogin"
>;

export class UsersService extends BaseService {
  constructor() {
    super();
  }

  public async get(userName: string): Promise<UserWithoutPassword> {
    return await this.getUserQuery(userName);
  }

  public async create(
    createParams: UserCreationParams
  ): Promise<UserWithoutPassword> {
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

  private async createUserQuery(params: UserCreationParams): Promise<void> {
    const { userName, displayName, isAdmin, encryptedPassword } = params;

    // this order MUST be maintained
    await this.runQuery(USER_QUERIES.CREATE_USER, [
      userName,
      displayName,
      encryptedPassword,
      isAdmin ? "1" : "0",
      new Date().toISOString(),
    ]);
  }

  private async getUserQuery(userName: string): Promise<UserWithoutPassword> {
    const fetchedUser: User = camelize(
      await this.runQueryAndReturn(USER_QUERIES.READ_USER, [userName])
    ) as User;

    return { ...fetchedUser, encryptedPassword: undefined };
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
