import { useEffect, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import useUserData from "../hooks/useUserData";
import App from "../App";
import LazyNotFound from "../pages/Services/NotFound";
import { getAllProtectedRoutes, getAvailableRoutes } from "../router";
import { useAppDispatch } from "../redux/hooks";
import { setRedirectPath } from "../redux/slices/auth";

const RouteAuthProvider = () => {
  const { isAuthenticated } = useUserData();
  const dispatch = useAppDispatch();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isAuthenticated]
  );

  useEffect(() => {
    const routsList = getAllProtectedRoutes();
    const isAllowedRout =
      !isAuthenticated &&
      routsList.some((r) => r === router.state.location.pathname);

    if (isAllowedRout) {
      dispatch(setRedirectPath(router.state.location.pathname));
      router.navigate("/login");
    }
  }, [dispatch, isAuthenticated, router]);

  return <RouterProvider router={router} />;
};

export default RouteAuthProvider;
