import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Post('join')
  createUser(@Body() userDto: UserDto) {
    console.log('컨트롤러 진입');
    console.log(userDto);
    return this.userService.createUser(userDto);
  }
}
