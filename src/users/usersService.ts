import snakeCase from 'snake-case-typescript';

import { BaseService } from '../common/baseService';
import USER_QUERIES from '../db/queries/userQueries';
import camelize from '../helpers/camelize';
import { User, UserCreationResponse, UserWithoutPassword } from './user';

export type UserCreationParams = Pick<
  User,
  "userName" | "displayName" | "encryptedPassword" | "isAdmin" | "lastLogin"
>;

export interface UserUpdateParams extends Partial<User> {}

export class UsersService extends BaseService {
  constructor() {
    super();
  }

  public async get(userName: string): Promise<UserWithoutPassword | undefined> {
    return await this.getUserQuery(userName);
  }

  public async create(
    createParams: UserCreationParams
  ): Promise<UserCreationResponse> {
    const query = this.createUserQuery(createParams);

    return query;
  }

  public async update(userId: number, updateParams: UserUpdateParams) {
    // user name is irrelevant when ID is provided
    const targetUser = await this.getUserQuery("", userId);

    if (!targetUser) {
      throw Error("Target user not found");
    }

    // endpoint only accepts attributes that need to be changed; unchanged attributes will be set to current values
    this.updateUserQuery(userId, updateParams);
  }

  public async delete(userId: number) {
    const targetUser = await this.getUserQuery("", userId);

    if (!targetUser) {
      throw Error("Target user not found");
    }

    this.deleteUserQuery(userId);
  }

  private async createUserQuery(
    params: UserCreationParams
  ): Promise<UserCreationResponse> {
    const { userName, displayName, isAdmin, encryptedPassword } = params;

    // this order MUST be maintained
    const newUserDataArray = (await this.runQueryAndReturn(
      USER_QUERIES.CREATE_USER,
      [
        userName,
        displayName,
        encryptedPassword,
        isAdmin,
        new Date().toISOString(),
      ]
    )) as UserCreationResponse[];

    return newUserDataArray[0];
  }

  private async getUserQuery(
    userName: string,
    userId?: number
  ): Promise<UserWithoutPassword | undefined> {
    const fetchedUsers = (await this.runQueryAndReturn(
      !!userId ? USER_QUERIES.READ_USER_BY_ID : USER_QUERIES.READ_USER,
      [!!userId ? userId : userName]
    )) as User[];

    if (fetchedUsers.length === 0) {
      return undefined;
    }

    return { ...fetchedUsers[0], encryptedPassword: undefined };
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

  private async deleteUserQuery(userId: number) {
    this.runQuery(USER_QUERIES.DELETE_USER, [userId]);
  }
}
