import {
  Body,
  Controller,
  Post,
  BadRequestException,
  Res,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserT } from 'src/auth/types';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

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
    return this.authservice.create(userData);
  }

  // @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(
    @Body() credential,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    const user = await this.authservice.findOne(credential.email);

    if (!user || !(await bcrypt.compare(credential.password, user.password))) {
      throw new BadRequestException();
    }

    const jwtToken = await this.jwtService.signAsync({ id: user.id });
    const { password, ...rest } = user;

    response.cookie('jet_token', jwtToken, { httpOnly: true });

    return { message: 'Successfully Loggedin', ...rest };
  }
}
