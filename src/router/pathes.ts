import { ERoles } from "../config/user";

import LazyMain from "../pages/Main";
import LazyPublication from "../pages/Publication";
import LazyLogin from "../pages/Services/Login";
import LazyRegistration from "../pages/Services/Registration";

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
    path: "/publication/:id",
    element: LazyPublication,
    children: [
      {
        path: "/publication/create",
        element: LazyPublication,
      },
    ],
  },
];

export default PATHS;
