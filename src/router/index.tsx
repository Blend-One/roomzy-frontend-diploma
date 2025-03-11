import { RouteObject } from "react-router";
import { getTokenData } from "../redux/slices/auth/utils";
import PATHS, { IRoute } from "./pathes";

export const getAvailableRoutes = (): RouteObject[] => {
  const accessToken = localStorage.getItem("accessToken");
  const data = accessToken ? getTokenData(accessToken) : undefined;
  const routeObjects: Array<RouteObject> = [];

  PATHS.forEach((route) => {
    if (
      route.allowedRoles?.some((role) => data?.role === role) ||
      !route.allowedRoles
    ) {
      routeObjects.push(getRouteObject(route));

      if (route.children) {
        route.children.forEach((child) => {
          if (
            child.allowedRoles?.some((role) => data?.role === role) ||
            !child.allowedRoles
          ) {
            routeObjects.push(getRouteObject(child));
          }
        });
      }
    }
  });

  return routeObjects;
};

export const getAllProtectedRoutes = (): string[] => {
  const protectedRoutePaths: string[] = [];

  const addProtectedRoutePaths = (routes: IRoute[]) => {
    routes.forEach((route) => {
      if (route.allowedRoles) {
        protectedRoutePaths.push(route.path);
      }
      if (route.children) {
        addProtectedRoutePaths(route.children);
      }
    });
  };
  addProtectedRoutePaths(PATHS);

  return protectedRoutePaths;
};

const getRouteObject = (route: IRoute): RouteObject => {
  const Component = route.element;
  const entry: RouteObject = {
    path: route.path,
    element: <Component />,
  };
  return entry;
};
