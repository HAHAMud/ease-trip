import { authorizationMiddleware } from './authorization';
import { Middleware } from './utils';

export const middlewares: Middleware[] = [
  authorizationMiddleware()
]