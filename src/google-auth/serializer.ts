import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class GoogleSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  async serializeUser(
    user: User,
    done: (err: any, user?: any) => void,
  ): Promise<any> {
    console.log(user, 'serializeUser');
    const _user = await this.userService.findUserbyEmail(user.userEmail);
    if (!_user) await this.userService.createUser(user);
    const userNo = await this.userService.findUserNobyEmail(user.userEmail);
    const info = { userNo: userNo, isLogin: true };
    done(null, info);
  }

  async deserializeUser(
    payload: any,
    done: (err: any, user?: any) => void,
  ): Promise<any> {
    console.log(payload, 'payload');
    const user = await this.userService.findUserbyUserNo(payload.userNo);
    console.log(user, 'deserializeUser');
    return user ? done(null, user) : done(null, null);
  }
}
