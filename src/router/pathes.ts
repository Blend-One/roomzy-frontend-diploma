import { ERoles } from "../config/user";

import LazyMain from "../pages/Main";
import LazyPublication from "../pages/Publication";
import LazyLogin from "../pages/Services/Login";
import LazyRegistration from "../pages/Services/Registration";
import LazyAccount from "../pages/Account";
import LazyMyPublications from "../pages/Account/MyPublications";
import LazyMyRentals from "../pages/Account/MyRentals";
import LazyPublicationCreate from "../pages/Publication/PublicationCreate";
import LazyModerations from "../pages/Account/Moderations";
import LazyRent from "../pages/Rent";
import LazyRoomTypes from "../pages/Account/RoomTypes";
import LazyRoomTypesCreate from "../pages/Account/RoomTypes/RoomTypesCreate";
import LazyRoomTypesEdit from "../pages/Account/RoomTypes/RoomTypesEdit";
import LazyControlRent from "../pages/Rent/ControlRent";
import LazyRentRequests from "../pages/Account/MyPublications/RentRequests";
import LazyRentIssues from "../pages/Account/MyPublications/RentIssues";
import LazyCreateRentIssues from "../pages/Rent/CreateRentIssues";
import LazyRentIssuesLandlord from "../pages/Account/MyRentals/RentIssues";
import LazyPhotoModeration from "../pages/Account/PhotoModeration";
import LazyModerationsIssuse from "../pages/Account/ModerationsIssuse";

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
        allowedRoles: [ERoles.USER],
      },
      {
        path: "/account/rentals",
        element: LazyMyRentals,
        allowedRoles: [ERoles.USER],
      },
      {
        path: "/account/moderations",
        element: LazyModerations,
        allowedRoles: [ERoles.MANAGER],
      },
      {
        path: "/account/photo/moderations",
        element: LazyPhotoModeration,
        allowedRoles: [ERoles.MANAGER],
      },
      {
        path: "/account/room-types",
        element: LazyRoomTypes,
        allowedRoles: [ERoles.MANAGER],
      },
      {
        path: "/account/room-types/create",
        element: LazyRoomTypesCreate,
        allowedRoles: [ERoles.MANAGER],
      },
      {
        path: "/account/room-types/:id/edit",
        element: LazyRoomTypesEdit,
        allowedRoles: [ERoles.MANAGER],
      },
    ],
  },
  {
    path: "/rent/:id",
    element: LazyRent,
    allowedRoles: [ERoles.USER],
  },
  {
    path: "/rent/:id/status",
    element: LazyControlRent,
    allowedRoles: [ERoles.USER],
  },
  {
    path: "/rent/:id/issues",
    element: LazyRentIssues,
    allowedRoles: [ERoles.USER, ERoles.MANAGER],
  },
  {
    path: "/rent/:id/landlord/issues",
    element: LazyRentIssuesLandlord,
    allowedRoles: [ERoles.USER],
  },
  {
    path: "/rent/:id/moderator/issues",
    element: LazyModerationsIssuse,
    allowedRoles: [ERoles.MANAGER],
  },
  {
    path: "rent/:id/create-issues",
    element: LazyCreateRentIssues,
    allowedRoles: [ERoles.USER],
  },
  {
    path: "/rent/:id/requests",
    element: LazyRentRequests,
    allowedRoles: [ERoles.USER],
  },
  {
    path: "/publications/:id",
    element: LazyPublication,
    children: [
      {
        path: "/publications/create",
        element: LazyPublicationCreate,
        allowedRoles: [ERoles.USER, ERoles.MANAGER],
      },
    ],
  },
];

export default PATHS;
