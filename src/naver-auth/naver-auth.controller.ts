import { Controller, Post, Body } from '@nestjs/common';
import { NaverAuthService } from './naver-auth.service';

@Controller('naver-auth')
export class NaverAuthController {
  constructor(private readonly naverAuthService: NaverAuthService) {}

  @Post('login')
  async naverLogin(@Body() body) {
    return await this.naverAuthService.getNaverUser(body.code);
  }
}
