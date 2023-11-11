import { Module } from '@nestjs/common';
import { NaverAuthController } from './naver-auth.controller';
import { NaverAuthService } from './naver-auth.service';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [NaverAuthService, UserService],
  controllers: [NaverAuthController],
})
export class NaverAuthModule {}
