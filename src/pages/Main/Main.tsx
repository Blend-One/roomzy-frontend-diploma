import { useTranslation } from "react-i18next";

const Main = () => {
  const { t } = useTranslation("common");
  return <>{t("title")}</>;
};

export default Main;
