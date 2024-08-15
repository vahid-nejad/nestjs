import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    // This will trigger the validate() method of the LocalStrategy.
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    // The logIn() method is added automatically by Passport
    await super.logIn(request);
    return result;
  }
}
