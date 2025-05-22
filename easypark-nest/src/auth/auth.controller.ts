import { Controller, Post, Body, Session, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
    @Session() session: Record<string, any>
  ) {
    // eslint-disable-next-line prettier/prettier
    const user = await this.authService.validateUser(body.username, body.password);
    if (user) {
      session.user = user;
      return { message: 'Login successful', user };
    }
    return { message: 'Invalid credentials' };
  }

  @Post('logout')
  logout(@Session() session: Record<string, any>) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    session.destroy(() => {});
    return { message: 'Logged out' };
  }

  @Get('me')
  me(@Session() session: Record<string, any>) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return session.user || { message: 'Not logged in' };
  }
}
