import LazyHome from "../pages/Home";
import LazyPublication from "../pages/Publication";

import { ERoles } from "../config/user";

export interface IRoute {
  element: React.FunctionComponent<object>;
  path: string;
  allowedRoles?: Array<ERoles>;
  children?: Array<{
    element: React.FunctionComponent<object>;
    path: string;
    allowedRoles?: Array<ERoles>;
  }>;
}

const PATHES: Array<IRoute> = [
  {
    path: "home",
    element: LazyHome,
  },
  {
    path: "/publication",
    element: LazyPublication,
    children: [
      {
        path: "/publication/create",
        element: LazyPublication,
      },
    ],
  },
];

export default PATHES;
