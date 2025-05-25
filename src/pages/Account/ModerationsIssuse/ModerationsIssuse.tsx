import { Card, CardContent, CardMedia, Grid2, Typography } from "@mui/material";
import { useParams } from "react-router";
import Page from "../../../components/Page";
import { useGetRentIssuesModeratorListQuery } from "../../../services/rentIssues";
import NoData from "../../../components/NoData";

const ModerationsIssuse = () => {
  const { id } = useParams();
  const { data } = useGetRentIssuesModeratorListQuery({ rentId: id ?? "" });

  return (
    <Page withPadding>
      {!data && <NoData withBackButton/>}
      {data && (
        <Grid2 marginTop={6} spacing={2} container>
          {data.map((row) => (
            <Grid2 key={row.id}>
              <Card>
                <CardMedia
                  sx={{
                    width: "500px",
                    height: "300px",
                    objectFit: "cover",
                  }}
                  image={`https://roomzy.danielkaziev.com/api/images/rooms/controversial_issues/${row.imageId}`}
                  title={row.id}
                />
                <CardContent>
                  <Typography gutterBottom variant="body2" component="div">
                    {row.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
          {/* <Grid2 size={{ xs: 12 }}>
                  <Stack direction="row" justifyContent="flex-end" spacing={2}>
                    <Button
                      onClick={handleRejectRentByLandlord}
                      variant="outlined"
                      color="error"
                    >
                      Одобрить
                    </Button>
                    <Button
                      onClick={handleRejectRentByLandlord}
                      variant="outlined"
                      color="error"
                    >
                      Отклонить
                    </Button>
                  </Stack>
                </Grid2> */}
        </Grid2>
      )}
    </Page>
  );
};

export default ModerationsIssuse;
