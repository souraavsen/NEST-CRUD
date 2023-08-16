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
    const isUserExist = this.userRepository.findOneBy({
      username: userDetails.username,
    });
    if (!isUserExist) return this.userRepository.save(userDetails);
    else {
      throw new NotAcceptableException();
    }
  }

  async findOne(reqUsername: string): Promise<User> {
    return this.userRepository.findOneBy({ username: reqUsername });
  }
}
