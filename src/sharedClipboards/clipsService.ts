// import snakeCase from 'snake-case-typescript';

import { BaseService } from '../common/baseService';
import CLIP_QUERIES from '../db/queries/clipQueries';
import camelize from '../helpers/camelize';
import { Clip, ClipCreationResponse } from './clip';

export type ClipCreationParams = Pick<
  Clip,
  "clipName" | "encryptedContent" | "userId"
>;

export class ClipsService extends BaseService {
  constructor() {
    super();
  }

  public async get(userId: number): Promise<Clip[]> {
    return await this.getClipsQuery(userId);
  }

  public async create(
    creationParams: ClipCreationParams
  ): Promise<ClipCreationResponse> {
    return await this.createClipQuery(creationParams);
  }

  private async getClipsQuery(userId: number): Promise<Clip[]> {
    return camelize(
      await this.runQueryAndReturn(CLIP_QUERIES.READ_CLIPS_BY_USER_ID, [userId])
    ) as Clip[];
  }

  private async createClipQuery(
    creationParams: ClipCreationParams
  ): Promise<ClipCreationResponse> {
    const { clipName, encryptedContent, userId } = creationParams;
    const createdAt = new Date().toISOString();
    const modifiedAt = createdAt;

    return (await this.runQueryAndReturn(CLIP_QUERIES.CREATE_CLIP, [
      userId,
      clipName,
      encryptedContent,
      modifiedAt,
      createdAt,
    ])) as ClipCreationResponse;
  }
}
