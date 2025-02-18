import { createBrowserRouter, RouteObject } from "react-router";
import App from "../App";
import LazyNotFound from "../pages/Services/NotFound";
import AppConfig from "../config";
import { IRoute } from "./pathes";

const getAvailableRoutes = (): RouteObject[] => {
    const accessToken = localStorage.getItem("accessToken");
    const data = accessToken ? getTokenData(accessToken) : undefined;
    const routeObjects: Array<RouteObject> = [];

    const routes: IRoute[] = [
    {
      path: "/qwerty",
      role: AppConfig.Roles.ADMIN,
      element: App,
    },
  ];

  return [
    {
      path: "/qwerty",
      element: <App />,
    },
  ];
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
