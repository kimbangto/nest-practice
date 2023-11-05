import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entity/auth.entity';
import { AuthDto } from './dto/auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private readonly mailerService: MailerService,
  ) {}

  async sendAuthCode(authDto: AuthDto) {
    const code: string = randomUUID();
    authDto.authCode = code;
    // authDto.authEffectiveDate = new Date().setMinutes(new Date().getMinutes() + 30);
    const queryResult = await this.authRepository.save(authDto);

    await this.mailerService.sendMail({
      from: '일기에게', // 보내는 사람
      to: authDto.userEmail, // 받는 주소
      subject: '[📕일기에게] 이메일 확인 인증링크입니다.', // 이메일 제목
      html: `<h3>아래 링크를 클릭하여 이메일 주소 인증을 완료해 주세요.</h3>
          <p>🚨가입중인 사람이 본인이 아니라면 절대 링크를 클릭하지 말아주세요!🚨</p>
          <p>클릭해서 이메일 인증하기 👉 <a href="http://localhost:4000/auth/check?userEmail=${authDto.userEmail}&authCode=${code}" target="_blank">메일 인증하기</a></p>
          <p>이 링크는 30분간 유효합니다.</p>
          <p>문의주실 곳 👉 ${process.env.MAIL_USER}</p>
            `, // 이메일 내용
    });

    return queryResult;
  }

  async checkAuthCode(authDto: AuthDto) {
    const userEmail: string = authDto.userEmail;
    const result: Auth = await this.authRepository.findOne({
      where: { userEmail },
    });
    const effectiveDate: Date = result.authEffectiveDate;
    const now: Date = new Date();
    if (now < effectiveDate) {
      // console.log('유효기간 안 넘음');
      return this.authRepository.update(
        { userEmail: userEmail },
        { authStatus: 'success' },
      );
    } else {
      // console.log('유효기간 넘음');
      return 'Effective date expire.';
    }
  }
}
