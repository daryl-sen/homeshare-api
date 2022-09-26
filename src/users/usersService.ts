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

  public get(id: number, name?: string): User {
    const query = this.runQuery(USER_QUERIES.READ_USER, [`${id}`]);
    console.log(query);

    return {
      id,
      userName: "user name",
      displayName: "display name",
      encryptedPassword: "password",
      isAdmin: false,
      lastLogin: new Date().toISOString(),
    };
  }

  public create(userCreationParams: UserCreationParams): User {
    try {
      const query = this.createUserQuery(userCreationParams);
    } catch (e) {
      console.log(e);
    }

    return {
      id: Math.floor(Math.random() * 10000), // Random
      ...userCreationParams,
    };
  }

  private createUserQuery(params: UserCreationParams): void {
    const { userName, displayName, isAdmin, encryptedPassword, lastLogin } =
      params;

    // this order MUST be maintained
    const query = this.runQuery(USER_QUERIES.CREATE_USER, [
      userName,
      displayName,
      encryptedPassword,
      isAdmin ? "1" : "0",
      new Date().toISOString(),
    ]);

    console.log("creating", query);
  }
}
