import { User } from './user/user.model';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from './auth/constants';

export function generateUserToken(user: User) {
  return jwt.sign(
    { sub: user.id, username: user.username },
    jwtConstants.secret,
  );
}
