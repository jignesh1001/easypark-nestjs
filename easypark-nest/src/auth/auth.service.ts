/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    // eslint-disable-next-line prettier/prettier
    constructor(private usersService: UsersService) { }

    // eslint-disable-next-line prettier/prettier
    async validateUser(username: string, password: string) {
        // eslint-disable-next-line prettier/prettier
        const user = await this.usersService.findByUsername(username);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
