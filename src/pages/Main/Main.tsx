import { Grid2 as Grid, Paper, TextField } from "@mui/material";
import Page from "../../components/Page";

const Main = () => {
  return (
    <Page withPadding>
      <Paper elevation={2} sx={{padding: "16px", margin: "16px"}}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3, xl: 2 }}>
          <TextField sx={{width: "100%"}} label="name" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3, xl: 2 }}>
          <TextField sx={{width: "100%"}} label="name" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3, xl: 2 }}> 
          <TextField sx={{width: "100%"}} label="name" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3, xl: 2 }}> 
          <TextField sx={{width: "100%"}} label="name" />
        </Grid>
      </Grid>
      </Paper>
    </Page>
  );
};

export default Main;
