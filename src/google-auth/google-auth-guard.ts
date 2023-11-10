import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext) {
    console.log('googleAuthGuard, canActivate');

    const result = (await super.canActivate(context)) as boolean;

    console.log(result, 'googleAuthGuard');

    if (result) {
      const req = context.switchToHttp().getRequest();
      await super.logIn(req);
    }
    return result;
  }
}
