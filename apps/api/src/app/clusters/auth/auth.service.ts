import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { environment } from '../../../environments/environment';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { AuthTokensResponse } from './auth.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOne(email);
    if (user !== null && (await compare(password, user.password))) {
      return user;
    }
    return null;
  }

  signIn(user: User): AuthTokensResponse {
    const payload = { email: user.email, sub: user.id, name: user.name };
    return {
      accessToken: this.jwtService.sign(payload),
      accessTokenExpires: new Date().getTime() + environment.jwtExpire,
    };
  }
}
