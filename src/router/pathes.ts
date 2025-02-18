import LazyHome from "../pages/Home";
import LazyPublication from "../pages/Publication";

import { ERoles } from "../config/user";

export interface IRoute {
  element: React.FunctionComponent<object>;
  path: string;
  role?: ERoles;
  children?: Array<IRoute>;
}

const PATHES: Array<IRoute> = [
  {
    path: "home",
    element: LazyHome,
  },
  {
    path: "publication",
    element: LazyPublication,
  },
];

export default PATHES;
