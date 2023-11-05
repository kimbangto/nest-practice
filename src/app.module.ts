import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/entity/auth.entity';

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
      entities: [User, Auth],
      synchronize: true,
    }),
    // - 설정 모듈 //

    // 개발 모듈 //
    UserModule,
    AuthModule,
    // - 개발 모듈 //
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
