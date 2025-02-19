import { ERoles } from "./user";

interface AppConfigType {
  roles: typeof ERoles;
};

const AppConfig: AppConfigType = {
  roles: ERoles,
};

export default AppConfig;
