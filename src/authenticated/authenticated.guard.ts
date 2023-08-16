import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // console.log('context', context.switchToHttp().getRequest());
    // console.log('token context', context.switchToHttp().getRequest().token);

    // Check and verify authtoken and according to that change the boolean bellow
    return true;
  }
}
