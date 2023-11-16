import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { GoogleAuthModule } from './google-auth/google-auth.module';
import { MailAuthModule } from './mail-auth/mail-auth.module';
import { KakaoAuthModule } from './kakao-auth/kakao-auth.module';
import { NaverAuthModule } from './naver-auth/naver-auth.module';

@Module({
  imports: [
    // 설정 모듈 //
    ConfigModule.forRoot(), // .env 파일 인식 위한 모듈
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    // - 설정 모듈 //

    // 개발 모듈 //
    UserModule,
    GoogleAuthModule,
    MailAuthModule,
    KakaoAuthModule,
    NaverAuthModule,
    // - 개발 모듈 //
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
