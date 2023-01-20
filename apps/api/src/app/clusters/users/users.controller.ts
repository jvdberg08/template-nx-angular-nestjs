import { Body, Controller, Post } from '@nestjs/common';

import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('users')
  createUser(@Body() dto: UserDto): Promise<User> {
    return this.usersService.create(dto);
  }
}
