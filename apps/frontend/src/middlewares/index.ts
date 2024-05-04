import { authorizationMiddleware } from './authorization';
import { Middleware, middlewareController } from './utils';

export const middlewares: Middleware[] = [
  [
    (req) => new RegExp('/((?!api|_next/static|_next/image|favicon.ico).*)').test(req.url),
    () => middlewareController.next(),
  ],
  [(req) => req.headers.has('next-router-prefetch'), () => middlewareController.next()],
  [(req) => req.headers.get('purpose') === 'prefetch', () => middlewareController.next()],
  authorizationMiddleware(),
  [() => true, () => middlewareController.next()],
];
