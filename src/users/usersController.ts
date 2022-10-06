import {
    Body, Controller, Delete, Get, Patch, Path, Post, Query, Route, SuccessResponse, Tags
} from 'tsoa';

import { User, UserCreationResponse, UserWithoutPassword } from './user';
import { UserCreationParams, UsersService, UserUpdateParams } from './usersService';

@Route("users")
@Tags("Users")
export class UsersController extends Controller {
  @Get("{userId}")
  public async getUser(
    @Query() userName: string
  ): Promise<UserWithoutPassword> {
    return new UsersService().get(userName);
  }

  @SuccessResponse("201", "Created")
  @Post()
  public async createUser(
    @Body() requestBody: UserCreationParams
  ): Promise<UserCreationResponse> {
    this.setStatus(201);
    return await new UsersService().create(requestBody);
  }

  @SuccessResponse("200", "Modified")
  @Patch("{userId}")
  public async updateUser(
    @Query() userId: number,
    @Body() requestBody: UserUpdateParams
  ): Promise<void> {
    this.setStatus(201);
    new UsersService().update(userId, requestBody);
    return;
  }

  @SuccessResponse("200", "Deleted")
  @Delete("{userId}")
  public async deleteUser(@Path() userId: number): Promise<void> {
    this.setStatus(200);
    new UsersService().delete(userId);
    return;
  }
}
