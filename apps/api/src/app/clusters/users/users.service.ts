import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findOne(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ email });
  }

  async create(dto: UserDto): Promise<User> {
    dto.password = await hash(dto.password, 8);
    const user = this.usersRepository.create(dto);
    await this.usersRepository.persistAndFlush(user);
    return user;
  }
}
