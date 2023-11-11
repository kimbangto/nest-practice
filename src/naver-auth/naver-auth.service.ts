import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class NaverAuthService {
  constructor(private readonly userService: UserService) {}

  async getNaverUser(code: string) {
    const getToken: any = await axios
      .post(
        `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&code=${code}&state=${process.env.NAVER_STATE}  
    `,
      )
      // .post('https://nid.naver.com/oauth2.0/token', {
      //   grant_type: 'authorization_code',
      //   code: code,
      //   client_id: process.env.NAVER_CLIENT_ID,
      //   client_secret: process.env.NAVER_CLIENT_SECRET,
      //   state: process.env.NAVER_STATE,
      // })
      .catch((err) => 'cannot get token');
    console.log(getToken);

    const access_token: string = getToken.data.access_token;

    const { data } = await axios.get('https://openapi.naver.com/v1/nid/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const user = data.response;
    const findUser: UserDto | null = await this.userService.findUserbyEmail(
      user.email,
    );
    if (findUser === null) {
      const userDto: UserDto = new UserDto();
      userDto.userEmail = user.email;
      userDto.profileUrl = user.profile_image;
      userDto.userNickname = user.name;
      userDto.provider = 'naver';
      await this.userService.createUser(userDto);
    } else {
      if (findUser.provider === 'naver') {
        // 로그인 로직
        return 'naver login success';
      } else {
        return `duplicate email from ${findUser.provider}`;
      }
    }
  }
}
