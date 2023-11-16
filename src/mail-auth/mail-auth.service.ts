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
    await this.mailAuthRepository.save(mailAuthDto).catch((err) => {
      console.log(err);
      return 'create fail';
    });
    await this.mailerService
      .sendMail(mailTemplate(mailAuthDto.userEmail, code))
      .catch((err) => {
        console.log(err);
        this.mailAuthRepository.delete(mailAuthDto.userEmail);
        return 'mail send fail';
      });
    await this.mailAuthRepository
      .save(mailAuthDto)
      .catch((err) => 'send update fail');
    return 'ready';
  }

  async authorize(mailAuthDto: MailAuthDto) {
    const userEmail: string = mailAuthDto.userEmail;
    const result: MailAuth = await this.mailAuthRepository.findOne({
      where: { userEmail },
    });
    if (mailAuthDto.authCode !== result.authCode) return 'code does not match';
    const effectiveDate: Date = result.authEffectiveDate;
    const now: Date = new Date();
    if (now < effectiveDate) {
      this.mailAuthRepository
        .update({ userEmail: userEmail }, { authStatus: 'success' })
        .catch((err) => {
          return 'update check fail';
        });
      return 'success';
    } else {
      return 'expire auth date';
    }
  }
}
