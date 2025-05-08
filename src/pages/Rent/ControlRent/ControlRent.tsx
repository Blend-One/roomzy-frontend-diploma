import { useParams } from "react-router";
import Page from "../../../components/Page";
import {
  useGetInstructionsQuery,
  useGetRentByIdQuery,
} from "../../../services/rent";
import {
  Grid2 as Grid,
  Paper,
  Typography,
  Box,
  Chip,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import { AccessTime, Home, Person } from "@mui/icons-material";
import dayjs from "dayjs";
import { getRoomStatusCompare } from "../../../utils/compare";
import { getPriceCurrency, getPriceUnit } from "../../../utils/common";
import i18n from "../../../i18n";
import Loader from "../../../components/Loader";
import useUserData from "../../../hooks/useUserData";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const InfoBlock = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <Paper elevation={3} sx={{ p: 3, flexGrow: 1 }}>
    <Stack direction="row" alignItems="center" width="100%" spacing={1} mb={2}>
      {icon}
      <Typography variant="h6">{title}</Typography>
    </Stack>
    {children}
  </Paper>
);

const ControlRent = () => {
  const { id } = useParams();
  const { data: rent } = useGetRentByIdQuery(id ?? "");
  i18n.loadNamespaces("components");
  const { data: user } = useUserData();
  const { data: access } = useGetInstructionsQuery({
    rentId: id ?? "",
    type: "access",
  });
  const { data: phys_control } = useGetInstructionsQuery({
    rentId: id ?? "",
    type: "phys_control",
  });

  return (
    <Page>
      {!rent && <Loader />}
      {rent && (
        <Box p={{ xs: 2, md: 4 }}>
          <Typography variant="h4" gutterBottom>
            Статус аренды для {rent.room.title}
          </Typography>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <InfoBlock icon={<Person color="action" />} title="Арендатор">
                <Typography>Имя: {rent.user.firstName || "—"}</Typography>
                <Typography>Фамилия: {rent.user.secondName || "—"}</Typography>
                <Typography>Email: {rent.user.email}</Typography>
              </InfoBlock>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <InfoBlock icon={<Home color="action" />} title="Комната">
                <Typography>Название: {rent.room.title}</Typography>
                <Typography>
                  Цена: {getPriceCurrency(+rent.room.price)} /{" "}
                  {getPriceUnit(rent.room.priceUnit, 1)}
                </Typography>
                <Typography>
                  Залог: {rent.room.hasDeposit ? "Да" : "Нет"}
                </Typography>
              </InfoBlock>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <InfoBlock
                icon={<AccessTime color="action" />}
                title="Данные аренды"
              >
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Typography
                      sx={{ pb: 1 }}
                      variant="body2"
                      color="text.secondary"
                    >
                      Дата начала
                    </Typography>
                    <Typography>
                      {dayjs(rent.issuedDate).format("DD.MM.YYYY HH:mm")}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Typography
                      sx={{ pb: 1 }}
                      variant="body2"
                      color="text.secondary"
                    >
                      Дата окончания
                    </Typography>
                    <Typography>
                      {dayjs(rent.dueDate).format("DD.MM.YYYY HH:mm")}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                    <Typography
                      sx={{ pb: 1 }}
                      variant="body2"
                      color="text.secondary"
                    >
                      Оплата
                    </Typography>
                    <Typography>
                      {rent.paymentDate
                        ? dayjs(rent.paymentDate).format("DD.MM.YYYY HH:mm")
                        : "Ожидается"}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                    <Typography
                      sx={{ pb: 1 }}
                      variant="body2"
                      color="text.secondary"
                    >
                      Сумма
                    </Typography>
                    <Typography>
                      {getPriceCurrency(+rent.totalPrice)}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                    <Typography
                      sx={{ pb: 1 }}
                      variant="body2"
                      color="text.secondary"
                    >
                      Договор
                    </Typography>
                    <Button sx={{ borderRadius: 1 }} variant="outlined">
                      Скачать
                    </Button>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body2" color="text.secondary">
                    Статус аренды:
                  </Typography>
                  <Chip
                    label={getRoomStatusCompare(rent.rentStatus)}
                    color="primary"
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                </Stack>
              </InfoBlock>
            </Grid>
            <Grid container size={{ xs: 12 }}>
              <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex" }}>
                <InfoBlock
                  icon={<VpnKeyIcon color="action" />}
                  title="Инструкции для доступа к помещения"
                >
                  {!access ||
                    (access.instructions.length === 0 && (
                      <Typography align="center">
                        Инструкции не доступны
                      </Typography>
                    ))}
                  {access && <Typography>{access.instructions}</Typography>}
                </InfoBlock>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex" }}>
                <InfoBlock
                  icon={<RemoveRedEyeIcon color="action" />}
                  title="Инструкции для осмотра помещения"
                >
                  {!phys_control ||
                    (phys_control.instructions.length === 0 && (
                      <Typography align="center">
                        Инструкции не доступны
                      </Typography>
                    ))}
                  {phys_control && (
                    <Typography>{phys_control.instructions}</Typography>
                  )}
                </InfoBlock>
              </Grid>
            </Grid>
            {rent.userId !== user?.id &&
              rent.rentStatus === "IN_SIGNING_PROCESS" && (
                <Grid size={{ xs: 12 }}>
                  <Stack direction="row" justifyContent="flex-end" spacing={2}>
                    <Button variant="contained" color="primary">
                      Подписать договор
                    </Button>
                    <Button variant="outlined" color="error">
                      Отменить аренду
                    </Button>
                  </Stack>
                </Grid>
              )}
          </Grid>
        </Box>
      )}
    </Page>
  );
};

export default ControlRent;
