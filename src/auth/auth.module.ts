import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entity/auth.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          service: process.env.MAIL_SERVICE,
          port: 587,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
          },
        },
        defaults: {
          from: '"no-reply" <email address>',
        },
        preview: true,
      }),
    }),
  ],
  exports: [TypeOrmModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
