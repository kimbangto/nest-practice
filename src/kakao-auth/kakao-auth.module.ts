import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { KakaoAuthController } from './kakao-auth.controller';
import { UserService } from 'src/user/user.service';
import { KakaoAuthService } from './kakao-auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, KakaoAuthService],
  controllers: [KakaoAuthController],
})
export class KakaoAuthModule {}
