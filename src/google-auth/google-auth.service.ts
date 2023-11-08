import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoogleAuthService {
  constructor(private readonly userService: UserService) {}

  async googleRedirect(user) {
    const result = await this.userService.findUser(user.userEmail);
    if (result.length === 0) return this.userService.createUser(user);
    else return this.userService.login();
  }
}
