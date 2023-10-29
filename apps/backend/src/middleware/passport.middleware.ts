import { Injectable, type NestMiddleware } from '@nestjs/common';

import type { Request, Response, NextFunction, Handler } from 'express';
import passport from 'passport';

@Injectable()
export class PassportMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    (passport.session() as Handler)(req, res, next);
  }
}
