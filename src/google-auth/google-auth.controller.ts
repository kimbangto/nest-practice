import { Controller, Get, UseGuards, Req, Res, Post } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { GoogleAuthGuard } from './google-auth-guard';
import axios from 'axios';

@Controller('google-auth')
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Get('login')
  @UseGuards(GoogleAuthGuard)
  googleLogin(@Req() req) {
    console.log('controller, login');
  }

  @Get('redirect')
  @UseGuards(GoogleAuthGuard)
  async googleRedirect(@Req() req) {
    console.log('controller, redirect');

    return 'success';
    // return this.googleAuthService.googleRedirect(req.user);
  }

  @Post('get-user')
  async getUser(@Req() req) {
    const accessToken: string = await req.body;
    const result = await axios.get(
      'https://www.googleapis.com/auth/userinfo.profile?access_token=' +
        accessToken,
    );
    console.log(result);
  }
}
