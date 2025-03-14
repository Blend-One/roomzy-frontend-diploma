import { ERoles } from "../config/user";

import LazyMain from "../pages/Main";
import LazyPublication from "../pages/Publication";
import LazyLogin from "../pages/Services/Login";
import LazyRegistration from "../pages/Services/Registration";
import LazyAccount from "../pages/Account";
import LazyMyPublications from "../pages/Account/MyPublications";
import LazyMyRentals from "../pages/Account/MyRentals";

interface IBaseRoute {
  element: React.FunctionComponent<object>;
  path: string;
  allowedRoles?: Array<ERoles>;
}

export interface IRoute extends IBaseRoute {
  children?: Array<IBaseRoute>;
}

const PATHS: Array<IRoute> = [
  {
    path: "/",
    element: LazyMain,
  },
  {
    path: "/login",
    element: LazyLogin,
  },
  {
    path: "/registration",
    element: LazyRegistration,
  },
  {
    path: "/account",
    element: LazyAccount,
    allowedRoles: [ERoles.USER, ERoles.MANAGER],
    children: [
      {
        path: "/account/publications",
        element: LazyMyPublications,
        allowedRoles: [ERoles.USER, ERoles.MANAGER],
      },
      {
        path: "/account/rentals",
        element: LazyMyRentals,
        allowedRoles: [ERoles.USER, ERoles.MANAGER],
      },
    ],
  },
  {
    path: "/publication/:id",
    element: LazyPublication,
    children: [
      {
        path: "/publication/create",
        element: LazyPublication,
        allowedRoles: [ERoles.USER, ERoles.MANAGER],
      },
    ],
  },
];

export default PATHS;
