import {
    Body, Controller, Delete, Get, Patch, Path, Post, Query, Route, SuccessResponse, Tags
} from 'tsoa';

import { Clip, ClipCreationResponse } from './clip';
import { ClipCreationParams, ClipsService } from './clipsService';

@Route("clips")
@Tags("Clips")
export class ClipsController extends Controller {
  @Get("{userId}")
  public async getClips(@Query() userId: number): Promise<Clip[]> {
    return new ClipsService().get(userId);
  }

  @SuccessResponse("201", "Created")
  @Post()
  public async createUser(
    @Body() requestBody: ClipCreationParams
  ): Promise<ClipCreationResponse> {
    this.setStatus(201);
    return await new ClipsService().create(requestBody);
  }
}
