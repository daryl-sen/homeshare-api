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

  public async update(
    updateParams: ClipCreationParams,
    clipId: number
  ): Promise<void> {
    const targetClip = this.getClipByIdQuery(clipId);

    if (!targetClip) {
      throw Error("Target clip not found");
    }

    this.updateClipQuery(updateParams, clipId);
  }

  public async delete(clipId: number): Promise<void> {
    const targetClip = this.getClipByIdQuery(clipId);

    if (!targetClip) {
      throw Error("Target clip not found");
    }

    this.deleteClipQuery(clipId);
  }

  private async getClipsQuery(userId: number): Promise<Clip[]> {
    return camelize(
      await this.runQueryAndReturn(CLIP_QUERIES.READ_CLIPS_BY_USER_ID, [userId])
    ) as Clip[];
  }

  private async getClipByIdQuery(clipId: number): Promise<Clip> {
    const targetClip = camelize(
      await this.runQueryAndReturn(CLIP_QUERIES.READ_CLIP_BY_ID, [clipId])
    ) as Clip[];

    return targetClip[0];
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

  private updateClipQuery(
    updateParams: ClipCreationParams,
    clipId: number
  ): void {
    const { clipName, encryptedContent } = updateParams;
    const modifiedAt = new Date().toISOString();

    this.runQuery(CLIP_QUERIES.UPDATE_CLIP, [
      clipName,
      encryptedContent,
      modifiedAt,
      clipId,
    ]);
  }

  private deleteClipQuery(clipId: number): void {
    this.runQuery(CLIP_QUERIES.DELETE_CLIP, [clipId]);
  }
}
