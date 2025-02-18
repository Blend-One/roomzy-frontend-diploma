import { ERoles } from "./user";

type AppConfigType = {
  Roles: typeof ERoles;
};

const AppConfig: AppConfigType = {
  Roles: ERoles,
};

export default AppConfig;
