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

/**
 * Controller responsible for handling authentication-related requests.
 */
@Controller('auth')
export class AuthController {
  constructor(
    private authservice: AuthService,
    private jwtService: JwtService,
  ) {}

  /**
   * Handles the POST request to '/auth/signup' and creates a new user.
   * @param userDetails - The user details for signup.
   * @returns The created user without the password.
   */
  @Post('signup')
  async signup(@Body() userDetails: UserT) {
    const hashedPassword = await bcrypt.hash(userDetails.password, 12);
    const userData = { ...userDetails, password: hashedPassword };

    const addUser = await this.authservice.create(userData);
    delete addUser.password;

    return addUser;
  }

  /**
   * Handles the POST request to '/auth/signin' and authenticates a user.
   * @param credential - The user credentials for signin.
   * @param response - The response object to set the JWT token cookie.
   * @returns A success message upon successful signin.
   */
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

  /**
   * Handles the GET request to '/auth/user' and retrieves the authenticated user.
   * @param request - The request object containing the JWT token cookie.
   * @returns The authenticated user without the password.
   * @throws UnauthorizedException if the JWT token is invalid or expired.
   */
  @Get('user')
  async authenticateduser(@Req() request: Request) {
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

  /**
   * Handles the POST request to '/auth/logout' and clears the JWT token from the response cookie.
   * @param response - The response object to clear the JWT token cookie.
   * @returns A success message upon successful logout.
   */
  @Post("/logout")
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie("jwt")

    return {
      message:"Loggedout Successfully"
    }
  }
}
