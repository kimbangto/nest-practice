import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class KakaoAuthService {
  constructor(private readonly userService: UserService) {}
  async getKakaoUser(access_token: string) {
    console.log('카카오 서비스 진입');

    const { data } = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const findUser: UserDto | null = await this.userService.findUserbyEmail(
      data.kakao_account.email,
    );
    if (findUser === null) {
      console.log('회원가입 진행');
      const userDto: UserDto = new UserDto();
      userDto.userEmail = data.kakao_account.email;
      userDto.profileUrl = data.kakao_account.profile.profile_image_url;
      userDto.userNickname = data.kakao_account.profile.nickname;
      userDto.provider = 'kakao';
      await this.userService.createUser(userDto);
    } else {
      console.log(findUser);
      if (findUser.provider === 'kakao') {
        // 로그인 로직
      } else {
        return `duplicate email from ${findUser.provider}`;
      }
    }
    // 로그인 로직 만들기 //
  }
}
