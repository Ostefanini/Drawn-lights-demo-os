import { UserListHighscore } from '@drawn-lights-game/shared';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository.js';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async findAll(): Promise<UserListHighscore[]> {
    const users = await this.usersRepository.findAll();
    const data: UserListHighscore[] = users.map((user) => ({
      nickname: user.nickname,
      nbCombinationsFound: user._count.combinations,
    }));
    return data;
  }
}
