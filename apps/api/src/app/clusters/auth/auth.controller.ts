import { Controller, Post, Request, UseGuards } from '@nestjs/common';

import { Public } from '../../core/decorates/public.decorator';
import { LocalAuthGuard } from '../../core/guards/auth/local-auth.guard';
import { AuthenticatedRequest, AuthTokensResponse } from './auth.model';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/sign-in')
  signIn(@Request() request: AuthenticatedRequest): AuthTokensResponse {
    return this.authService.signIn(request.user);
  }
}
