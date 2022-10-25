import {
    Body, Controller, Delete, Get, Patch, Path, Post, Query, Res, Response, Route, Security,
    SuccessResponse, Tags, TsoaResponse
} from 'tsoa';

import { LoginService } from '../login/loginService';
import { UserCreationResponse, UserWithoutPassword } from './user';
import {
    UserCreationParams, UserLoginParams, UsersService, UserUpdateParams
} from './usersService';

interface ValidateErrorJSON {
  message: "Validation failed";
  details: { [name: string]: unknown };
}

@Route("users")
@Tags("Users")
export class UsersController extends Controller {
  @Response<ValidateErrorJSON>(404, "Not Found")
  @Security("jwt")
  @Get()
  public async getUser(
    @Query() userName: string
  ): Promise<UserWithoutPassword> {
    return await new UsersService().get(userName);
  }

  @Response<ValidateErrorJSON>(422, "Unprocessable Entity")
  @SuccessResponse("201", "Created")
  @Post()
  public async createUser(
    @Body() requestBody: UserCreationParams,
    @Res() unprocessableEntityResponse: TsoaResponse<422, { reason: string }>
  ): Promise<UserCreationResponse | void> {
    try {
      return await new UsersService().create(requestBody);
    } catch (e) {
      return unprocessableEntityResponse(422, {
        reason: "Unable to create user",
      });
    }
  }

  @Response<ValidateErrorJSON>(401, "Forbidden")
  @SuccessResponse("201", "Login successful")
  @Post("/login")
  public async loginUser(
    @Body() requestBody: UserLoginParams
  ): Promise<string> {
    const targetUserId = await new UsersService().validateLogin(
      requestBody.userName,
      requestBody.encryptedPassword
    );
    return await new LoginService().getJwt(targetUserId, false);
  }

  @Response<ValidateErrorJSON>(422, "Unprocessable Entity")
  @Security("jwt")
  @SuccessResponse("200", "Modified")
  @Patch("{userId}")
  public async updateUser(
    @Path() userId: number,
    @Body() requestBody: UserUpdateParams
  ): Promise<void> {
    return await new UsersService().update(userId, requestBody);
  }

  @Response<ValidateErrorJSON>(422, "Unprocessable Entity")
  @Security("jwt")
  @SuccessResponse("200", "Deleted")
  @Delete("{userId}")
  public async deleteUser(@Path() userId: number): Promise<void> {
    return await new UsersService().delete(userId);
  }
}
