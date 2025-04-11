import { ERoomStatus } from "./room";
import { ERoles } from "./user";

interface AppConfigType {
  ROLES: typeof ERoles;
  ROOM_STATUS: typeof ERoomStatus;
}

const AppConfig: AppConfigType = {
  ROLES: ERoles,
  ROOM_STATUS: ERoomStatus,
};

export default AppConfig;
