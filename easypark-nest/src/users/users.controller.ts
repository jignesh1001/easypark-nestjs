/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() body: { username: string; password: string; role?: string }) {
    return this.usersService.create(body.username, body.password, body.role);
  }

  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }
}
