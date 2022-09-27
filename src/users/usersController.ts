import {
    Body, Controller, Delete, Get, Patch, Path, Post, Query, Route, SuccessResponse
} from 'tsoa';

import { User, UserWithoutPassword } from './user';
import { UserCreationParams, UsersService } from './usersService';

@Route("users")
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
  ): Promise<UserWithoutPassword> {
    this.setStatus(201);
    return new UsersService().create(requestBody);
  }

  // @SuccessResponse("200", "Modified")
  // @Patch("{userId}")
  // public async updateUser(
  //   @Body() requestBody: UserCreationParams
  // ): Promise<void> {
  //   this.setStatus(201);
  //   new UsersService().create(requestBody);
  //   return;
  // }

  // @SuccessResponse("200", "Deleted")
  // @Delete("{userId}")
  // public async deleteUser(@Path() userId: number): Promise<void> {
  //   this.setStatus(201);
  //   // new UsersService().delete(userId);
  //   return;
  // }
}
