import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoogleAuthService {
  constructor(private readonly userService: UserService) {}

  async getGoogleUser(code: string) {
    console.log('구글 서비스단 진입');
    console.log(code);
    const getToken: any = await axios
      .post(
        `https://oauth2.googleapis.com/token?client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${process.env.GOOGLE_CALLBACK_URI}`,
      )
      .catch((err) => 'login failed');
    const access_token: string = getToken.data.access_token;
    const { data } = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
    const findUser: UserDto | null = await this.userService.findUserbyEmail(
      data.email,
    );
    if (findUser === null) {
      // 동일한 이메일이 DB에 없을 경우 회원가입
      const userDto: UserDto = new UserDto();
      userDto.userEmail = data.email;
      userDto.profileUrl = data.picture;
      userDto.userNickname = data.name;
      userDto.provider = 'google';
      await this.userService.createUser(userDto);
    } else {
      if (findUser.provider === 'google') {
        // 로그인 로직
        return 'google login success';
      } else {
        return `duplicate email from ${findUser.provider}`;
      }
    }
    return;
  }
}
