import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send')
  sendAuthCode(@Body() authDto: AuthDto) {
    return this.authService.sendAuthCode(authDto);
  }

  @Get('check')
  checkAuthCode(@Query() authDto: AuthDto) {
    return this.authService.checkAuthCode(authDto);
  }
}
