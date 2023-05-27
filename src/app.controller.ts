import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Request() req): any {
    // TODO: return JWT access token
    return this.authService.login(req.user);
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  getHello(@Request() req): string {
    // TODO: require an Bearer token, validate token
    return req.user;
  }
}
