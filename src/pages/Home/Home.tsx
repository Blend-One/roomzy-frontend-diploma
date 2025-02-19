import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation("common");
  return <>{t("title")}</>
};

export default Home;
