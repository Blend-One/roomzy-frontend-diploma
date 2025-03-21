import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Stack, Typography } from "@mui/material";

const NoData: FC = () => {
  const { t } = useTranslation("components");

  return (
    <Stack justifyContent="center" alignItems="center" height="100%">
      <Typography variant="h6">{t("I18N_NO_DATA")}</Typography>
    </Stack>
  );
};

export default NoData;
