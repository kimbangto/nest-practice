import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class KakaoAuthService {
  constructor(private readonly userService: UserService) {}

  async getKakaoUser(code: string) {
    const getToken: any = await axios
      .post(
        'https://kauth.kakao.com/oauth/token',
        {
          grant_type: 'authorization_code',
          client_id: process.env.KAKAO_REST_API_KEY,
          redirect_uri: process.env.KAKAO_CALLBACK_URI,
          code: code,
          client_secret: process.env.KAKAO_CLIENT_SECRET,
        },
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      )
      .catch((err) => 'login failed');

    const access_token: string = getToken.data.access_token;

    const { data } = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const user = data.kakao_account;
    const findUser: UserDto | null = await this.userService.findUserbyEmail(
      user.email,
    );
    if (findUser === null) {
      const userDto: UserDto = new UserDto();
      userDto.userEmail = user.email;
      userDto.profileUrl = user.profile.profile_image_url;
      userDto.userNickname = user.profile.nickname;
      userDto.provider = 'kakao';
      await this.userService.createUser(userDto);
    } else {
      if (findUser.provider === 'kakao') {
        // 로그인 로직
        return 'kakao login success';
      } else {
        return `duplicate email from ${findUser.provider}`;
      }
    }
  }
}
