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

  async findUser(userEmail: string) {
    return await this.userRepository.findBy({ userEmail: userEmail });
  }

  async createUser(userDto: UserDto) {
    return this.userRepository.save(userDto);
  }

  async login() {}
}
