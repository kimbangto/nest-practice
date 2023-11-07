import { Module } from '@nestjs/common';
import { MailAuthController } from './mail-auth.controller';
import { MailAuthService } from './mail-auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailAuth } from './entity/auth.entity';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    TypeOrmModule.forFeature([MailAuth]),
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
  providers: [MailAuthService],
  controllers: [MailAuthController],
})
export class MailAuthModule {}
