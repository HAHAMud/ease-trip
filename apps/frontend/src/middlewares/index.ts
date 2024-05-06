import { authGuardPages, authRouterCheck } from './authorization';
import { HeaderKey } from './constants';
import { cond, Middleware, middlewareController } from './utils';

export const middlewares: Middleware[] = [
  [
    (request) => /^\/api/.test(new URL(request.url).pathname),
    (request) => {
      const token = request.cookies.get('token')?.value || '';
      return middlewareController.next({
        headers: {
          [HeaderKey.AUTHORIZATION]: `Bearer ${token}`,
        },
      });
    },
  ],
  [(request) => request.headers.has('next-router-prefetch'), () => middlewareController.next()],
  [(request) => request.headers.get('purpose') === 'prefetch', () => middlewareController.next()],
  [
    (request) => {
      return authGuardPages.some((path) => request.nextUrl.pathname === path);
    },
    authRouterCheck,
  ],
  [() => true, () => middlewareController.next()],
];

export const middlewareHandler = cond(middlewares);
