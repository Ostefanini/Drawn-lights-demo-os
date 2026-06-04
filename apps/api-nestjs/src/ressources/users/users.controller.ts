import { UserListHighscore } from '@drawn-lights-game/shared';
import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  public async findAll(): Promise<UserListHighscore[]> {
    return await this.usersService.findAll();
  }
}
