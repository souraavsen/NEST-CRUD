import { Injectable } from '@nestjs/common';
import { NotAcceptableException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './entities/user.entity';
// import { UsersService } from 'src/users/users.service';

@Injectable({})
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(userDetails: CreateUserDto) {
    const isUserExist = await this.userRepository.findOneBy({
      username: userDetails.username,
    });

    if (!isUserExist) return this.userRepository.save(userDetails);
    else {
      throw new NotAcceptableException('Username or Email already exist');
    }
  }

  async findOne(reqUsername: any): Promise<User> {
    return await this.userRepository.findOneBy(reqUsername);
  }
}
