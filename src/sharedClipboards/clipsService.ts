// import snakeCase from 'snake-case-typescript';

import { BaseService } from '../common/baseService';
import CLIP_QUERIES from '../db/queries/clipQueries';
import camelize from '../helpers/camelize';
import { Clip } from './clip';

export type CipCreationParams = Pick<
  Clip,
  "clipName" | "encryptedContent" | "userId" | "createdAt" | "modifiedAt"
>;

export class ClipsService extends BaseService {
  constructor() {
    super();
  }

  public async getByUserId(userId: number): Promise<Clip[]> {
    return await this.getClipsQuery(userId);
  }

  private async getClipsQuery(userId: number): Promise<Clip[]> {
    return camelize(
      await this.runQueryAndReturn(CLIP_QUERIES.READ_CLIPS_BY_USER_ID, [userId])
    ) as Clip[];
  }
}
