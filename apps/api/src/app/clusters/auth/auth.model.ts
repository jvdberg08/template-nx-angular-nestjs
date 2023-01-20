import { Request } from 'express';

import { User } from '../users/user.entity';

export interface AuthTokensResponse {
  accessToken: string;
  accessTokenExpires: number;
}

export type AuthenticatedRequest = Request & { user: User };

export interface JwtPayload {
  sub: number;
  email: string;
  name: string;
}
