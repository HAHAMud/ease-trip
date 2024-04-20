import { authorizationMiddleware } from './authorization';
import { Middleware, middlewareController } from './utils';

export const middlewares: Middleware[] = [authorizationMiddleware(), [() => true, () => middlewareController.next()]];
