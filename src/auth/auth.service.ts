import { Injectable } from '@nestjs/common';
import { NotAcceptableException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './entities/user.entity';

/**
 * The `AuthService` class is responsible for handling user authentication and registration.
 * It uses the `User` entity and the `UserRepository` to interact with the database.
 */
@Injectable({})
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Creates a new user by saving the user details to the database.
   * If a user with the same username already exists, it throws a `NotAcceptableException`.
   * @param userDetails The details of the user to be created.
   * @returns The created user object.
   */
  async create(userDetails: CreateUserDto) {
    const isUserExist = await this.userRepository.findOneBy({
      username: userDetails.username,
    });

    if (!isUserExist) return this.userRepository.save(userDetails);
    else {
      throw new NotAcceptableException('Username or Email already exist');
    }
  }

  /**
   * Finds a user in the database based on the provided username.
   * @param reqUsername The username of the user to be found.
   * @returns The found user object.
   */
  async findOne(reqUsername: any): Promise<User> {
    return await this.userRepository.findOneBy(reqUsername);
  }
}
