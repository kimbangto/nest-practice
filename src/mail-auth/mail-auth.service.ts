import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { randomUUID } from 'crypto';
import { mailTemplate } from './mailTemplate';
import { MailAuthDto } from './dto/mail-auth.dto';
import { MailAuth } from './entity/auth.entity';

@Injectable()
export class MailAuthService {
  constructor(
    @InjectRepository(MailAuth)
    private mailAuthRepository: Repository<MailAuth>,
    private readonly mailerService: MailerService,
  ) {}

  async sendAuthCode(mailAuthDto: MailAuthDto) {
    const code: string = randomUUID();
    mailAuthDto.authCode = code;
    mailAuthDto.authEffectiveDate = new Date(
      new Date().setMinutes(new Date().getMinutes() + 30),
    );
    const queryResult = await this.mailAuthRepository.save(mailAuthDto);

    await this.mailerService.sendMail(
      mailTemplate(mailAuthDto.userEmail, code),
    );

    return queryResult;
  }

  async checkAuthCode(mailAuthDto: MailAuthDto) {
    const userEmail: string = mailAuthDto.userEmail;
    const result: MailAuth = await this.mailAuthRepository.findOne({
      where: { userEmail },
    });
    const effectiveDate: Date = result.authEffectiveDate;
    const now: Date = new Date();
    if (now < effectiveDate) {
      this.mailAuthRepository.update(
        { userEmail: userEmail },
        { authStatus: 'success' },
      );
      return '이메일 인증이 완료되었습니다.';
    } else {
      return '이메일 인증 유효기간이 만료되었습니다. 이메일 인증을 다시 진행해주세요.';
    }
  }
}
