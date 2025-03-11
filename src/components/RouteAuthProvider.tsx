import { useEffect, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import useUserData from "../hooks/useUserData";
import App from "../App";
import LazyNotFound from "../pages/Services/NotFound";
import { getAllProtectedRoutes, getAvailableRoutes } from "../router";

const RouteAuthProvider = () => {
  const { isAuthenticated } = useUserData();
  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: "/",
          element: <App />,
          errorElement: <LazyNotFound />,
          children: getAvailableRoutes(),
        },
      ]),
    [isAuthenticated]
  );

  useEffect(() => {
    const routsList = getAllProtectedRoutes();

    if (
      !isAuthenticated &&
      routsList.some((r) => r === router.state.location.pathname)
    ) {
      router.navigate("/login");
    }
  }, [isAuthenticated, router]);

  return <RouterProvider router={router} />;
};

export default RouteAuthProvider;
