import { RoutePath } from './constants';
import { NextRequest, middlewareController, cond } from './utils';

export const authGuardPages = [RoutePath.HOME, RoutePath.PLANNING];

export const authRouterCheck = cond([
  [(request: NextRequest) => Boolean(request.cookies.get('token')?.value), () => middlewareController.next()],
  [() => true, (request) => middlewareController.redirect(new URL(RoutePath.LOGIN, request.url))],
]);
