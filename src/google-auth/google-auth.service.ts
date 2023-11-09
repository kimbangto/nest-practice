import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoogleAuthService {
  constructor(private readonly userService: UserService) {}

  async googleRedirect(user) {}
}
