import {
    Body, Controller, Delete, Get, Patch, Path, Post, Query, Res, Response, Route, SuccessResponse,
    Tags, TsoaResponse
} from 'tsoa';

import { UserCreationResponse, UserWithoutPassword } from './user';
import { UserCreationParams, UsersService, UserUpdateParams } from './usersService';

interface ValidateErrorJSON {
  message: "Validation failed";
  details: { [name: string]: unknown };
}

@Route("users")
@Tags("Users")
export class UsersController extends Controller {
  @Response<ValidateErrorJSON>(404, "Not Found")
  @Get()
  public async getUser(
    @Query() userName: string,
    @Res() notFoundResponse: TsoaResponse<404, { reason: string }>
  ): Promise<UserWithoutPassword> {
    const fetchedUser = await new UsersService().get(userName);

    if (!fetchedUser) {
      return notFoundResponse(404, { reason: "User not found" });
    }

    return fetchedUser;
  }

  @Response<ValidateErrorJSON>(422, "Unprocessable Entity")
  @SuccessResponse("201", "Created")
  @Post()
  public async createUser(
    @Body() requestBody: UserCreationParams
  ): Promise<UserCreationResponse> {
    this.setStatus(201);
    return await new UsersService().create(requestBody);
  }

  @Response<ValidateErrorJSON>(422, "Unprocessable Entity")
  @SuccessResponse("200", "Modified")
  @Patch("{userId}")
  public async updateUser(
    @Path() userId: number,
    @Body() requestBody: UserUpdateParams,
    @Res() userNotFoundResponse: TsoaResponse<404, { reason: string }>
  ): Promise<void> {
    try {
      await new UsersService().update(userId, requestBody);
      this.setStatus(201);
      return;
    } catch (e) {
      return userNotFoundResponse(404, {
        reason: "The target user does not exist",
      });
    }
  }

  @Response<ValidateErrorJSON>(422, "Unprocessable Entity")
  @SuccessResponse("200", "Deleted")
  @Delete("{userId}")
  public async deleteUser(
    @Path() userId: number,
    @Res() userNotFoundResponse: TsoaResponse<404, { reason: string }>
  ): Promise<void> {
    try {
      await new UsersService().delete(userId);
      this.setStatus(200);
      return;
    } catch (e) {
      return userNotFoundResponse(404, {
        reason: "The target user does not exist",
      });
    }
  }
}
