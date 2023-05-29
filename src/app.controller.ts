import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { GetCurrentUserById } from './utils/get-user-by-id.decorator';
import { JwtAuthGuard } from './utils/guards/jwt-guard.guard';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getHello(@GetCurrentUserById() userId: number): string {
    console.log(
      '🚀 ~ file: app.controller.ts:11 ~ AppController ~ getHello ~ req:',
      userId,
    );
    return this.appService.getHello(userId);
  }
}
