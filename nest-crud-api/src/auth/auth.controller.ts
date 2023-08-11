import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}
  // path: auth/signup
  @Post('signup')
  signup() {
    return this.authservice.signup();
  }

  // path: auth/signin
  @Post('signupin')
  signin() {
    return this.authservice.signin();
  }
}
