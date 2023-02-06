import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const can: boolean = <boolean>await super.canActivate(context);
    const req: any = context.switchToHttp().getRequest();
    await super.logIn(req);
    return can;
  }
}
