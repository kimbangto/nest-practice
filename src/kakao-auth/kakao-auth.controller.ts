import { Controller, Post, Req, Body } from '@nestjs/common';
import axios from 'axios';
import { UserService } from 'src/user/user.service';
import { KakaoAuthService } from './kakao-auth.service';

@Controller('kakao-auth')
export class KakaoAuthController {
  constructor(
    private readonly kakaoAuthService: KakaoAuthService,
    private readonly userService: UserService,
  ) {}
  @Post('login')
  async kakaoLogin(@Body() body) {
    console.log('카카오 컨트롤러 진입');
    return this.kakaoAuthService.getKakaoUser(body.access_token);
  }
}
