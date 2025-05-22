/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async create(username: string, password: string, role: string = 'user') {
    const hashed = await bcrypt.hash(password, 10);
    const user = this.usersRepo.create({ username, password: hashed, role });
    return this.usersRepo.save(user);
  }

  async findByUsername(username: string) {
    return this.usersRepo.findOne({ where: { username } });
  }

  async findAll() {
    return this.usersRepo.find();
  }
}
