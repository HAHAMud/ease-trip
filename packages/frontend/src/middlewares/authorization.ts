import cond from "lodash/cond";
import { HeaderKey, RoutePath } from "./constants";
import { Middleware, NextRequest, middlewareController } from "./utils";

const authGuardPages = [
  RoutePath.HOME,
  RoutePath.PLANNING,
];

const authRouterCheck = cond([
  [
    (_request: NextRequest) => Boolean(middlewareController.headers.get(HeaderKey.AUTHORIZATION)),
    () => middlewareController.next()
  ],
  [
    () => middlewareController.headers.get(HeaderKey.AUTHORIZATION) === null,
    (request) => middlewareController.redirect(new URL(RoutePath.LOGIN, request.url))
  ]
])

export const authorizationMiddleware = (): Middleware => {
  return [
    (request: NextRequest) => {
      return authGuardPages.some((path) => request.nextUrl.pathname === path);
    },
    authRouterCheck
  ]
}
