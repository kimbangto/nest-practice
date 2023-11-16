import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Get('duplicate')
  findUser(@Query() { userEmail }) {
    return this.userService.isEmailDuplicate(userEmail);
  }

  @Post('join')
  createUser(@Body() userDto: UserDto) {
    return this.userService.createUser(userDto);
  }
}
