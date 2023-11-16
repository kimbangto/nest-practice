import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async isEmailDuplicate(userEmail: string) {
    const result: string | null = (
      await this.userRepository.findOneBy({ userEmail: userEmail })
    )?.userEmail;
    if (result) return true;
    return false;
  }

  async findUserbyUserNo(userNo: number) {
    return await this.userRepository.findOneBy({ userNo: userNo });
  }

  async findUserbyEmail(userEmail: string) {
    return await this.userRepository.findOneBy({ userEmail: userEmail });
  }

  async findUserNobyEmail(userEmail: string) {
    return (await this.userRepository.findOneBy({ userEmail: userEmail }))
      .userNo;
  }

  async createUser(userDto: UserDto) {
    return this.userRepository.save(userDto);
  }

  async login(user) {
    console.log(user);
  }
}
