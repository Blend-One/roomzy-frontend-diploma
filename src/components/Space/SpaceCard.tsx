import { FC } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Stack,
  styled,
  SxProps,
  Theme,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BusinessIcon from "@mui/icons-material/Business";
import HomeIcon from "@mui/icons-material/Home";
import SecurityIcon from "@mui/icons-material/Security";
import LayersIcon from "@mui/icons-material/Layers";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import { useNavigate } from "react-router";
import { ISpace } from "../../types/space";
import { getRentTypeCompare } from "../../utils/compare";
import { useTranslation } from "react-i18next";

const StyledCard = styled(Card)({
  transition: "0.3s",
  "&:hover": { boxShadow: 6 },
  width: "100%",
  display: "flex",
  flexDirection: "column",
  height: "100%",
});

const сardMediaSx: SxProps<Theme> = () => ({
  width: "100%",
  height: 200,
  borderTopLeftRadius: 2,
  borderTopRightRadius: 2,
});

const StyledCardContent = styled(CardContent)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const StyledTypography = styled(Typography)({
  display: "flex",
  alignItems: "center",
  gap: 1,
});

const StyledButton = styled(Button)({
  fontWeight: "bold",
  width: "100%",
});

const SpaceCard: FC<{ data: ISpace }> = ({ data }) => {
  const navigate = useNavigate();
  const { t } = useTranslation(["space", "components"]);
  const handleNavigate = () => navigate(`space/${data.id}`);

  return (
    <StyledCard>
      <CardMedia
        sx={сardMediaSx}
        component="img"
        image={data.imageUrl}
        alt={data.title}
      />
      <StyledCardContent>
        <Stack spacing={1}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            {data.title}
          </Typography>
          <StyledTypography variant="body1" color="text.primary">
            <AttachMoneyIcon sx={{ color: "green" }} />
            {t("I18N_SPACE_PRICE", {
              price: data.price,
              type: getRentTypeCompare(data.priceUnit),
            })}
          </StyledTypography>
          <StyledTypography variant="body2" color="text.secondary">
            <LocationOnIcon sx={{ color: "red" }} /> 
            {data.street},
            {data.building}
          </StyledTypography>
          <StyledTypography variant="body2" color="text.primary">
            {data.isCommercial ? (
              <>
                <BusinessIcon sx={{ color: "blue" }} />
                {t("I18N_SPACE_COMMERCE")}
              </>
            ) : (
              <>
                <HomeIcon sx={{ color: "green" }} />
                {t("I18N_SPACE_LIVING")}
              </>
            )}
          </StyledTypography>
          <StyledTypography variant="body2" color="text.primary">
            <SquareFootIcon sx={{ color: "purple" }} />
            {t("I18N_SPACE_SQUARE", { square: data.square })}
          </StyledTypography>
          <StyledTypography variant="body2" color="text.primary">
            <LayersIcon sx={{ color: "brown" }} />
            {t("I18N_SPACE_FLOORS", { floors: data.floors })}
          </StyledTypography>
          {data.hasDeposit && (
            <StyledTypography variant="body2" color="text.primary">
              <SecurityIcon sx={{ color: "orange" }} />
              {t("I18N_SPACE_NEED_DEPOSIT")}
            </StyledTypography>
          )}
        </Stack>
      </StyledCardContent>
      <CardActions>
        <StyledButton
          size="small"
          variant="contained"
          color="primary"
          onClick={handleNavigate}
        >
          {t("I18N_SPACE_MORE")}
        </StyledButton>
        <StyledButton size="small" variant="outlined" color="warning">
          {t("I18N_SPACE_ADD_WIHSLIST")}
        </StyledButton>
      </CardActions>
    </StyledCard>
  );
};

export default SpaceCard;
