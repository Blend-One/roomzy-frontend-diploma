import LazyHome from "../pages/Home";
import LazyPublication from "../pages/Publication";

import { ERoles } from "../config/user";

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

export default PATHS;
