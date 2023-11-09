import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { GoogleAuthGuard } from './google-auth-guard';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

@Controller('google-auth')
export class GoogleAuthController {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly userService: UserService,
  ) {}

  @Get('login')
  @UseGuards(GoogleAuthGuard)
  googleLogin(@Req() req) {
    console.log(req);
  }

  @Get('redirect')
  @UseGuards(GoogleAuthGuard)
  async googleRedirect(@Req() req) {
    console.log(req);

    return '허허 시팔';
    // return this.googleAuthService.googleRedirect(req.user);
  }
}
