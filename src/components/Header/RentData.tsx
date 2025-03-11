import { Stack } from "@mui/material";
import { FC } from "react";
import CustomTitle from "../common/CustomTitle";
import useUserData from "../../hooks/useUserData";

const RentData: FC = () => {
  const { isAuthenticated } = useUserData();
  return (
    <>
      {isAuthenticated && (
        <Stack spacing={3} direction="row">
          <CustomTitle link="/navigate" text="Мои объявления" />
          <CustomTitle link="/navigate" text="Моя аренда" />
        </Stack>
      )}
    </>
  );
};

export default RentData;
