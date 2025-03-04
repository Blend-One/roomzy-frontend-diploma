import { FC } from "react";
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate } from "react-router";
import { ISpace } from "../../types/space";


const SpaceCard: FC<{ data: ISpace }> = ({ data }) => {
  const navigate = useNavigate()
  const handleNavigate = () => navigate(`space/${data.id}`)

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3, transition: "0.3s", '&:hover': { boxShadow: 6 } }}>
      <CardMedia component="img" height="200" image={data.image} alt={data.title} sx={{ borderTopLeftRadius: 2, borderTopRightRadius: 2 }} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          {data.title}
        </Typography>
        <Typography variant="body1" color="text.primary" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AttachMoneyIcon sx={{ color: "green" }} /> Цена: {data.price} ₽/месяц
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocationOnIcon sx={{ color: "red" }} /> {data.location}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={handleNavigate} sx={{ fontWeight: "bold" }}>
          Подробнее
        </Button>
      </CardActions>
    </Card>
  );
};

export default SpaceCard;
