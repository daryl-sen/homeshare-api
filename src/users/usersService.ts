import snakeCase from 'snake-case-typescript';

import { BaseService } from '../common/baseService';
import USER_QUERIES from '../db/queries/userQueries';
import { AuthenticationError, NotFoundError } from '../errors';
import camelize from '../helpers/camelize';
import { User, UserCreationResponse, UserWithoutPassword } from './user';

export type UserCreationParams = Pick<
  User,
  "userName" | "displayName" | "encryptedPassword" | "isAdmin" | "lastLogin"
>;

export type UserLoginParams = Pick<User, "userName" | "encryptedPassword">;

export interface UserUpdateParams extends Partial<User> {}

export class UsersService extends BaseService {
  constructor() {
    super();
  }

  public async get(userName: string): Promise<UserWithoutPassword> {
    const targetUser = await this.getUserWithoutPassword(userName);

    if (!targetUser) {
      throw new NotFoundError("User not found");
    }

    return targetUser;
  }

  public async create(
    creationParams: UserCreationParams
  ): Promise<UserCreationResponse> {
    return await this.createUserQuery(creationParams);
  }

  public async update(userId: number, updateParams: UserUpdateParams) {
    // user name is irrelevant when ID is provided
    const targetUser = await this.getUserQuery("", userId);

    if (!targetUser) {
      throw new NotFoundError("Target user not found");
    }

    // endpoint only accepts attributes that need to be changed; unchanged attributes will be set to current values
    this.updateUserQuery(userId, updateParams);
  }

  public async delete(userId: number) {
    const targetUser = await this.getUserQuery("", userId);

    if (!targetUser) {
      throw new NotFoundError("Target user not found");
    }

    this.deleteUserQuery(userId);
  }

  public async validateLogin(
    userName: string,
    password: string
  ): Promise<number> {
    const targetUser = await this.getUserQuery(userName);

    if (targetUser.encryptedPassword !== this.hashPassword(password)) {
      throw new AuthenticationError("Incorrect password");
    }

    return targetUser.id;
  }

  private hashPassword(password: string) {
    // TODO: hash password
    return password;
  }

  private async createUserQuery(
    params: UserCreationParams
  ): Promise<UserCreationResponse> {
    const { userName, displayName, isAdmin, encryptedPassword } = params;

    // this order MUST be maintained
    return (await this.runQueryAndReturn(USER_QUERIES.CREATE_USER, [
      userName,
      displayName,
      this.hashPassword(encryptedPassword),
      isAdmin,
      new Date().toISOString(),
    ])) as UserCreationResponse;
  }

  private async getUserQuery(userName: string, userId?: number): Promise<User> {
    const fetchedUsers = (await this.runQueryAndReturn(
      !!userId ? USER_QUERIES.READ_USER_BY_ID : USER_QUERIES.READ_USER,
      [!!userId ? userId : userName]
    ).then(camelize)) as User[];

    return fetchedUsers[0];
  }

  private async getUserWithoutPassword(
    userName: string,
    userId?: number
  ): Promise<UserWithoutPassword | undefined> {
    const fetchedUser = await this.getUserQuery(userName, userId);

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

  private deleteUserQuery(userId: number) {
    this.runQuery(USER_QUERIES.DELETE_USER, [userId]);
  }
}
