import {
  Body,
  Controller,
  Post,
  BadRequestException,
  Res,
  Get,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserT } from 'src/auth/types';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authservice: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('signup')
  async signup(@Body() userDetails: UserT) {
    const hashedPassword = await bcrypt.hash(userDetails.password, 12);
    const userData = { ...userDetails, password: hashedPassword };

    const addUser = await this.authservice.create(userData);
    delete addUser.password;

    return addUser;
  }

  // @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(
    @Body() credential,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    const user = await this.authservice.findOne({
      username: credential.username,
    });

    if (!user) {
      throw new BadRequestException('No such user with the username');
    }

    if (!(await bcrypt.compare(credential.password, user.password))) {
      throw new BadRequestException('Password is not matching');
    }

    const jwtToken = await this.jwtService.signAsync({ id: user.id });

    response.cookie('jwt', jwtToken, { httpOnly: true });

    return { message: 'Successfully Loggedin' };
  }

  @Get('user')
  async Authenticateduser(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      const userData = await this.jwtService.verifyAsync(cookie);

      if (!userData) {
        throw new UnauthorizedException();
      }

      const user = await this.authservice.findOne({ id: userData.id });
      delete user.password;

      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
