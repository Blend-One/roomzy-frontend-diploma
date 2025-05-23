import { useNavigate, useParams, useSearchParams } from "react-router";
import Page from "../../../components/Page";
import {
  useCreateCheckoutMutation,
  useGetInstructionsQuery,
  useGetRentByIdQuery,
  useUpdateRentStatusMutation,
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
  Alert,
} from "@mui/material";
import { AccessTime, Home, Person } from "@mui/icons-material";
import dayjs from "dayjs";
import { getRoomStatusCompare } from "../../../utils/compare";
import { getPriceCurrency, getPriceUnit } from "../../../utils/common";
import i18n from "../../../i18n";
import Loader from "../../../components/Loader";
import useUserData from "../../../hooks/useUserData";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DocumentDowload from "./DocumentDowload";
import SignButton from "../../../components/SignButton";
import { useEffect } from "react";
import { useGetDocumentByRentIdQuery } from "../../../services/documents";
import AddIcon from "@mui/icons-material/Add";

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
  i18n.loadNamespaces("components");
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: rent, refetch } = useGetRentByIdQuery(id ?? "");
  const { data: user } = useUserData();
  const [updateRentStatus, { isSuccess }] = useUpdateRentStatusMutation();
  const { data: doc } = useGetDocumentByRentIdQuery(
    { rentId: rent?.id ?? "" },
    { skip: !rent?.id },
  );
  const [postCheckout, { isLoading }] = useCreateCheckoutMutation();

  const { data: access, isSuccess: isSuccessAccess } = useGetInstructionsQuery({
    rentId: id ?? "",
    type: "access",
  });

  const { data: phys_control, isSuccess: isSuccessPhys } =
    useGetInstructionsQuery({
      rentId: id ?? "",
      type: "phys_control",
    });

  const handleRejectRentByLandlord = async () => {
    if (rent) {
      await updateRentStatus({
        id: rent.id,
        status: "0CLOSED",
        role: "landlord",
      });
    }
  };
  const handleRejectRentByRenter = async () => {
    if (rent) {
      await updateRentStatus({
        id: rent.id,
        status: "0CLOSED",
        role: "renter",
      });
    }
  };

  const handleCreateCheckout = async () => {
    if (rent) {
      await postCheckout({ rentId: rent.id })
        .unwrap()
        .then((response) => {
          window.location.href = response.sessionUrl;
        })
        .catch((error) => {
          console.error("Ошибка при создании ссылки оплаты:", error);
        });
    }
  };

  const handleNavigateIssues = async () => {
    if (rent) {
      navigate(`/rent/${rent.id}/create-issues`);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess, refetch]);

  return (
    <Page>
      {!rent && <Loader />}
      {rent && (
        <Box p={{ xs: 2, md: 4 }}>
          <Stack mb={2}>
            {searchParams.get("payStatus")?.toUpperCase() === "OK" && (
              <Alert
                variant="outlined"
                severity="success"
                sx={{ fontWeight: 500, fontSize: "16px" }}
              >
                Оплата прошла успешно!
              </Alert>
            )}
            {searchParams.get("payStatus")?.toUpperCase() === "FAILED" && (
              <Alert
                variant="outlined"
                severity="error"
                sx={{ fontWeight: 500, fontSize: "16px" }}
              >
                Оплата не удалась. Пожалуйста, попробуйте ещё раз или свяжитесь
                с поддержкой.
              </Alert>
            )}
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h4" mb={2}>
              Статус аренды для {rent.room.title}
            </Typography>
            {rent.rentStatus === "7PAID" && (
              <Button
                endIcon={<AddIcon />}
                onClick={handleNavigateIssues}
                variant="contained"
                color="primary"
              >
                Добавить спорные моменты
              </Button>
            )}
          </Stack>
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
                    <DocumentDowload rentId={rent.id} />
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
                    sx={{ mt: 1, fontWeight: 500 }}
                  />
                </Stack>
              </InfoBlock>
            </Grid>
            <Grid container size={{ xs: 12 }}>
              {isSuccessAccess && (
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
              )}
              {isSuccessPhys && (
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
              )}
            </Grid>

            {rent.userId !== user?.id &&
              rent.rentStatus === "3IN_SIGNING_PROCESS" &&
              doc &&
              doc.status === "CREATED" && (
                <Grid size={{ xs: 12 }}>
                  <Stack direction="row" justifyContent="flex-end" spacing={2}>
                    <SignButton rentId={rent.id} />
                    <Button
                      onClick={handleRejectRentByLandlord}
                      variant="outlined"
                      color="error"
                    >
                      Отменить аренду
                    </Button>
                  </Stack>
                </Grid>
              )}
            {rent.userId === user?.id &&
              rent.rentStatus === "3IN_SIGNING_PROCESS" &&
              doc &&
              doc.status === "SIGNED_BY_LANDLORD" && (
                <Grid size={{ xs: 12 }}>
                  <Stack direction="row" justifyContent="flex-end" spacing={2}>
                    <SignButton rentId={rent.id} />
                    <Button
                      onClick={handleRejectRentByRenter}
                      variant="outlined"
                      color="error"
                    >
                      Отменить аренду
                    </Button>
                  </Stack>
                </Grid>
              )}
            {rent.userId === user?.id && rent.rentStatus === "4PENDING" && (
              <Grid size={{ xs: 12 }}>
                <Stack direction="row" justifyContent="flex-end" spacing={2}>
                  <Button
                    onClick={handleCreateCheckout}
                    variant="contained"
                    loading={isLoading}
                    color="primary"
                  >
                    Оплатить
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
