import {
    Body, Controller, Delete, Get, Patch, Path, Post, Query, Res, Response, Route, SuccessResponse,
    Tags, TsoaResponse
} from 'tsoa';

import { Clip, ClipCreationResponse } from './clip';
import { ClipCreationParams, ClipsService } from './clipsService';

// TODO: this is repeated in users controller
interface ValidateErrorJSON {
  message: "Validation failed";
  details: { [name: string]: unknown };
}

@Route("clips")
@Tags("Clips")
export class ClipsController extends Controller {
  // get clips belonging to user, use userID
  @Get("{userId}")
  public async getClips(@Query() userId: number): Promise<Clip[]> {
    return new ClipsService().get(userId);
  }

  @SuccessResponse("201", "Created")
  @Post()
  public async createClip(
    @Body() requestBody: ClipCreationParams
  ): Promise<ClipCreationResponse> {
    this.setStatus(201);
    return await new ClipsService().create(requestBody);
  }

  @Response<ValidateErrorJSON>(422, "Unprocessable Entity")
  @SuccessResponse("200", "Modified")
  @Patch("{clipId}")
  public async updateClip(
    @Path() clipId: number,
    @Body() requestBody: ClipCreationParams,
    @Res() clipNotFoundResponse: TsoaResponse<404, { reason: string }>
  ): Promise<void> {
    try {
      await new ClipsService().update(requestBody, clipId);
      this.setStatus(201);
      return;
    } catch (e) {
      return clipNotFoundResponse(404, {
        reason: "The target clip does not exist",
      });
    }
  }

  @Response<ValidateErrorJSON>(422, "Unprocessable Entity")
  @SuccessResponse("200", "Deleted")
  @Delete("{clipId}")
  public async deleteClip(
    @Path() clipId: number,
    @Res() userNotFoundResponse: TsoaResponse<404, { reason: string }>
  ): Promise<void> {
    try {
      await new ClipsService().delete(clipId);
      this.setStatus(200);
      return;
    } catch (e) {
      return userNotFoundResponse(404, {
        reason: "The target clip does not exist",
      });
    }
  }
}
