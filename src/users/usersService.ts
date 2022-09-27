import snakeCase from 'snake-case-typescript';

import { BaseService } from '../common/baseService';
import USER_QUERIES from '../db/queries/userQueries';
import camelize from '../helpers/camelize';
import { User, UserWithoutPassword } from './user';

export type UserCreationParams = Pick<
  User,
  "userName" | "displayName" | "encryptedPassword" | "isAdmin" | "lastLogin"
>;

export interface UserUpdateParams extends Partial<User> {}

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

    // fetch the newly created user after creation to get the dynamic ID or UUID
    // local fetches are cheap anyway
    return await this.getUserQuery(createParams.userName);
  }

  public async update(userId: number, updateParams: UserUpdateParams) {
    // user name is irrelevant when ID is provided
    const targetUser = await this.getUserQuery("", userId);

    // endpoint only accepts attributes that need to be changed; unchanged attributes will be set to current values
    this.updateUserQuery(userId, updateParams);
  }

  private createUserQuery(params: UserCreationParams): void {
    const { userName, displayName, isAdmin, encryptedPassword } = params;

    // this order MUST be maintained
    this.runQuery(USER_QUERIES.CREATE_USER, [
      userName,
      displayName,
      encryptedPassword,
      isAdmin ? "1" : "0",
      new Date().toISOString(),
    ]);
  }

  private async getUserQuery(
    userName: string,
    userId?: number
  ): Promise<UserWithoutPassword> {
    const fetchedUser: User = camelize(
      await this.runQueryAndReturn(
        !!userId ? USER_QUERIES.READ_USER_BY_ID : USER_QUERIES.READ_USER,
        [!!userId ? userId : userName]
      )
    ) as User;

    return { ...fetchedUser, encryptedPassword: undefined };
  }

  private updateUserQuery(userId: number, params: UserUpdateParams): void {
    const attributesToModify: string[] = [];
    const targetValues: unknown[] = [];

    Object.keys(params).forEach((attribute) => {
      attributesToModify.push(snakeCase(attribute) + "=?");
    });

    Object.values(params).forEach((value) => {
      targetValues.push(value);
    });
    targetValues.push(userId);

    // results in `attr1_name=?, attri2_name=?`, to be used in a prepared statement
    const dynamicUpdateQuery = attributesToModify.join(", ");

    const assembledQuery =
      USER_QUERIES.UPDATE_USER.START +
      dynamicUpdateQuery +
      USER_QUERIES.UPDATE_USER.END;

    this.runQuery(assembledQuery, targetValues);
  }

  // private deleteUserQuery(userId: number): void {
  //   // this order MUST be maintained
  //   const query = this.runQuery(USER_QUERIES.DELETE_USER, [userId]);
  // }
}
