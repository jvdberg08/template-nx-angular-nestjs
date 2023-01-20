import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { environment } from '../../../../environments/environment';
import { User } from '../../users/user.entity';
import { UsersService } from '../../users/users.service';
import { JwtPayload } from '../auth.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: environment.jwtSecret,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.usersService.findOne(payload.email);
    if (user === null) {
      throw new NotFoundException(
        'User to which the access token belongs has been deleted.'
      );
    }
    return user;
  }
}
