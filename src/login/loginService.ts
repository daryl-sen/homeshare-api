import * as jwt from 'jsonwebtoken';

import { APP_SECRET_KEY } from '../../authentication';
import { BaseService } from '../common/baseService';

export class LoginService extends BaseService {
  constructor() {
    super();
  }

  public async getJwt(userId: number, isUserAdmin: boolean) {
    return jwt.sign(
      {
        userId,
        isUserAdmin,
      },
      APP_SECRET_KEY,
      { expiresIn: "5m" }
    );
  }
}
