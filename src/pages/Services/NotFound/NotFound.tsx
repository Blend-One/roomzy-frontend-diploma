import { Button, Stack, Typography } from "@mui/material";
import Page from "../../../components/Page";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  const handleGoHome = () => navigate("/");
  const handleGoBack = () => navigate(-1);

  return (
    <Page>
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ height: "100%" }}
      >
        <Stack
          alignItems="center"
          sx={{
            border: (theme) => `1px solid ${theme.palette.primary.main}`,
            padding: 2,
            borderRadius: 2,
          }}
        >
          <Typography variant="h2">404</Typography>
          <Typography>Страница не существует!</Typography>
          <Stack direction={"row"} spacing={1} mt={3}>
            <Button
              sx={{ width: 150 }}
              onClick={handleGoHome}
              variant="contained"
            >
              На главную
            </Button>
            <Button
              sx={{ width: 150 }}
              onClick={handleGoBack}
              variant="outlined"
            >
              Назад
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Page>
  );
};

export default NotFound;
