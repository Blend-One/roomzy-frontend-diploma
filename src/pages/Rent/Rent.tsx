import { Button, Grid2, Stack, Typography } from "@mui/material";
import Page from "../../components/Page";
import { useParams } from "react-router";
import { useGetRoomByIdQuery } from "../../services/rooms";
import RoomCard, { IconText } from "../../components/Room/RoomCard";
import NotFound from "../Services/NotFound/NotFound";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import useUserData from "../../hooks/useUserData";

const Rent = () => {
  const { id } = useParams();
  const { data, isError } = useGetRoomByIdQuery(id ?? "");
  const { data: userData } = useUserData();

  if (isError) {
    return <NotFound />;
  }

  return (
    <Page withPadding>
      {data && (
        <Stack spacing={3} mt={4} mb={6}>
          <Typography variant="h2" fontSize={"2rem"} fontWeight={400}>
            Аренда {data.title}
          </Typography>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <RoomCard onlyInfo data={data} />
            </Grid2>
            {userData && (
              <Grid2
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                size={{ xs: 12, sm: 6 }}
              >
                <IconText icon={<AccessibilityIcon />} text={userData.email} />
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Перейти к оплате
                </Button>
              </Grid2>
            )}
          </Grid2>
        </Stack>
      )}
    </Page>
  );
};

export default Rent;
