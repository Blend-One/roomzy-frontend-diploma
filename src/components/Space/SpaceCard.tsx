import { FC } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Stack,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BusinessIcon from "@mui/icons-material/Business";
import HomeIcon from "@mui/icons-material/Home";
import SecurityIcon from "@mui/icons-material/Security";
import { useNavigate } from "react-router";
import { ISpace } from "../../types/space";
import { getRentTypeCompare } from "../../utils/compare";

const SpaceCard: FC<{ data: ISpace }> = ({ data }) => {
  const navigate = useNavigate();
  const handleNavigate = () => navigate(`space/${data.id}`);

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": { boxShadow: 6 },
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: "100%",
          height: 200,
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
        }}
        image={data.image}
        alt={data.title}
      />
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Stack spacing={1}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            {data.title}
          </Typography>
          <Typography
            variant="body1"
            color="text.primary"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <AttachMoneyIcon sx={{ color: "green" }} /> Цена: {data.price} ₸/{" "}
            {getRentTypeCompare(data.paymentType)}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <LocationOnIcon sx={{ color: "red" }} /> {data.street},{" "}
            {data.building}
          </Typography>
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            {data.isCommercial ? (
              <>
                <BusinessIcon sx={{ color: "blue" }} /> Коммерческое помещение
              </>
            ) : (
              <>
                <HomeIcon sx={{ color: "green" }} /> Жилое помещение
              </>
            )}
          </Typography>
          {data.hasDeposit && (
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <SecurityIcon sx={{ color: "orange" }} /> Требуется депозит
            </Typography>
          )}
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={handleNavigate}
          sx={{ fontWeight: "bold", width: "100%" }}
        >
          Подробнее
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="warning"
          onClick={handleNavigate}
          sx={{ fontWeight: "bold", width: "100%" }}
        >
          В избранное
        </Button>
      </CardActions>
    </Card>
  );
};

export default SpaceCard;
