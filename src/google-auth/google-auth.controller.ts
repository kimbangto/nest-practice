import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { GoogleAuthGuard } from './google-auth-guard';

@Controller('google-auth')
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Get('login')
  @UseGuards(GoogleAuthGuard)
  googleLogin(@Req() req) {}

  @Get('redirect')
  @UseGuards(GoogleAuthGuard)
  googleRedirect(@Req() req, @Res() res) {
    console.log(req.user);
    return req.user;
  }
}
