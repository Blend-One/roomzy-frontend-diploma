import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";

interface NoDataProps {
  withBackButton?: boolean;
}

const NoData: FC<NoDataProps> = ({withBackButton}) => {
  const { t } = useTranslation("components");
  const navigation = useNavigate();

  return (
    <Stack justifyContent="center" alignItems="center" height="100%">
      <Typography variant="h6">{t("I18N_NO_DATA")}</Typography>
      {withBackButton && (
        <Button
          variant="outlined"
          onClick={() => navigation(-1)}
          sx={{ marginTop: 2 }}
        >
          Назад
        </Button>
      )}
    </Stack>
  );
};

export default NoData;
