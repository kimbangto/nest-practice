import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MailAuthService } from './mail-auth.service';
import { MailAuthDto } from './dto/mail-auth.dto';

@Controller('mail-auth')
export class MailAuthController {
  constructor(private readonly mailAuthService: MailAuthService) {}

  @Post('send')
  sendAuthCode(@Body() mailAuthDto: MailAuthDto) {
    return this.mailAuthService.sendAuthCode(mailAuthDto);
  }

  @Get('check')
  checkAuthCode(@Query() mailAuthDto: MailAuthDto) {
    return this.mailAuthService.checkAuthCode(mailAuthDto);
  }
}
