import { Stack } from "@mui/material";
import { FC } from "react";
import CustomTitle from "../common/CustomTitle";
import useUserData from "../../hooks/useUserData";
import { useTranslation } from "react-i18next";

const RentData: FC = () => {
  const { isAuthenticated } = useUserData();
  const { t } = useTranslation("users");

  return (
    <>
      {isAuthenticated && (
        <Stack spacing={3} direction="row">
          <CustomTitle
            link="/account/publications"
            text={t("I18N_USER_MY_ADS")}
          />
          <CustomTitle
            link="/account/rentals"
            text={t("I18N_USER_MY_RENTALS")}
          />
        </Stack>
      )}
    </>
  );
};

export default RentData;
