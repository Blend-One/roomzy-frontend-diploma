import { FC, JSX } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
  styled,
  CardMedia,
  SxProps,
  Theme,
} from "@mui/material";
import {
  LocationOn as LocationOnIcon,
  AttachMoney as AttachMoneyIcon,
  Business as BusinessIcon,
  Home as HomeIcon,
  Security as SecurityIcon,
  SquareFoot as SquareFootIcon,
} from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import { useNavigate } from "react-router";
import { IViewRoom } from "../../types/rooms";
import { getRentTypeCompare } from "../../utils/compare";
import { useTranslation } from "react-i18next";
import { getRoomImageLink } from "../../utils/images";
import { getPriceCurrency } from "../../utils/common";

const StyledCard = styled(Card)({
  transition: "0.3s",
  "&:hover": { boxShadow: 6 },
  width: "100%",
  display: "flex",
  flexDirection: "column",
  height: "100%",
});

const cardMediaSx: SxProps<Theme> = {
  width: "100%",
  height: 200,
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  objectFit: "cover",
};

const StyledCardContent = styled(CardContent)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

export const IconText: FC<{ icon: JSX.Element; text: string }> = ({
  icon,
  text,
}) => (
  <Typography
    variant="body2"
    color="text.primary"
    display="flex"
    alignItems="center"
    gap={1}
  >
    {icon}
    {text}
  </Typography>
);

const StyledButton = styled(Button)({
  fontWeight: "bold",
  width: "100%",
});

const RoomCard: FC<{ data: IViewRoom; onlyInfo?: boolean }> = ({
  data,
  onlyInfo = false,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation(["space", "components"]);

  const handleNavigate = () => navigate(`publications/${data.id}`);

  const priceFormatted = t("I18N_SPACE_PRICE", {
    price: getPriceCurrency(+data.price),
    type: getRentTypeCompare(data.priceUnit),
  });

  const location = `${data.city?.name ?? ""}, ${data.district?.name ?? ""}, ${
    data.street
  }, ${data.building}`;

  const imageUrl = getRoomImageLink(data.roomImages[0]?.id ?? "");

  return (
    <StyledCard>
      <CardMedia
        sx={cardMediaSx}
        component="img"
        image={imageUrl}
        alt={data.title}
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/images/room-placeholder.jpg";
        }}
      />
      <StyledCardContent>
        <Stack spacing={1}>
          <Typography variant="h6" fontWeight="bold">
            {data.title}
          </Typography>
          <IconText
            icon={<AttachMoneyIcon sx={{ color: "green" }} />}
            text={priceFormatted}
          />
          <IconText
            icon={<LocationOnIcon sx={{ color: "red" }} />}
            text={location}
          />
          <IconText
            icon={
              data.isCommercial ? (
                <BusinessIcon sx={{ color: "blue" }} />
              ) : (
                <HomeIcon sx={{ color: "green" }} />
              )
            }
            text={
              data.isCommercial
                ? t("I18N_SPACE_COMMERCE")
                : t("I18N_SPACE_LIVING")
            }
          />
          <IconText
            icon={<SquareFootIcon sx={{ color: "purple" }} />}
            text={t("I18N_SPACE_SQUARE", { square: data.square })}
          />
          {data.roomType?.name && (
            <IconText
              icon={<ApartmentIcon sx={{ color: "teal" }} />}
              text={data.roomType.name}
            />
          )}
          {data.roomSections?.length > 0 && (
            <IconText
              icon={<MapsHomeWorkIcon sx={{ color: "grey" }} />}
              text={t("I18N_SPACE_SECTIONS_COUNT", {
                count: data.roomSections.length,
              })}
            />
          )}
          {data.hasDeposit && (
            <IconText
              icon={<SecurityIcon sx={{ color: "orange" }} />}
              text={t("I18N_SPACE_NEED_DEPOSIT")}
            />
          )}
          <IconText
            icon={
              <LockIcon sx={{ color: data.physControl ? "green" : "grey" }} />
            }
            text={
              data.physControl
                ? t("I18N_SPACE_PHYS_CONTROL_ENABLED")
                : t("I18N_SPACE_PHYS_CONTROL_DISABLED")
            }
          />
        </Stack>
      </StyledCardContent>
      {!onlyInfo && (
        <CardActions>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={handleNavigate}
          >
            {t("I18N_SPACE_MORE")}
          </StyledButton>
        </CardActions>
      )}
    </StyledCard>
  );
};

export default RoomCard;
