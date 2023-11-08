import { Module } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { GoogleAuthController } from './google-auth.controller';
import { GoogleStrategy } from './google-strategy';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [
    PassportModule.register({
      session: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [GoogleAuthService, GoogleStrategy, UserService],
  controllers: [GoogleAuthController],
})
export class GoogleAuthModule {}
