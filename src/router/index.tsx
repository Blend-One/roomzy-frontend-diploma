import { createBrowserRouter, RouteObject } from "react-router";
import App from "../App";
import LazyNotFound from "../pages/Services/NotFound";
import { getTokenData } from "../redux/slices/auth/utils";
import PATHS, { IRoute } from "./pathes";

const getAvailableRoutes = (): RouteObject[] => {
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

const getRouteObject = (route: IRoute): RouteObject => {
  const Component = route.element;
  const entry: RouteObject = {
    path: route.path,
    element: <Component />,
  };
  return entry;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <LazyNotFound />,
    children: getAvailableRoutes(),
  },
]);

export default router;
