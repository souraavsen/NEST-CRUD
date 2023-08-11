import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signup() {
    return { msg: 'Signed Up' };
  }

  signin() {
    return { msg: 'Signed In' };
  }
}
