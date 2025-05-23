import dayjs from "dayjs";
import { IViewRent } from "../../../types/rent";
import { getPriceCurrency } from "../../../utils/common";
import { getRoomStatusCompare } from "../../../utils/compare";
import Tooltip from "@mui/material/Tooltip/Tooltip";
import IconButton from "@mui/material/IconButton/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { Stack } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export const getTableData = (
  data: IViewRent[],
  handleNavigate: (id: string) => void,
  handleRejectRent: (id: string) => void,
) => {
  return {
    header: [
      { name: "Помещение" },
      { name: "Цена" },
      { name: "Депозит" },
      { name: "Начало аренды" },
      { name: "Конец аренды" },
      { name: "Статус аренды" },
      { name: "Действия" },
    ],
    body: data.map((rent) => ({
      data: [
        { name: rent.room.title || "—" },
        { name: `${getPriceCurrency(+rent.totalPrice)}` },
        { name: rent.room.hasDeposit ? "Да" : "Нет" },
        { name: dayjs(rent.issuedDate).format("DD.MM.YYYY HH:mm") },
        { name: dayjs(rent.dueDate).format("DD.MM.YYYY HH:mm") },
        { name: getRoomStatusCompare(rent.rentStatus) },
        {
          name: "",
          width: 70,
          render: () => (
            <Stack spacing={2} direction={"row"}>
              <Stack flexGrow={1}>
                <Tooltip title="Спорные моменты">
                  <IconButton
                    color="error"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleNavigate(`/rent/${rent.id}/issues`);
                    }}
                    sx={{
                      p: 0,
                      margin: 0,
                      alignContent: "center",
                      color: "primary.white",
                    }}
                  >
                    <ErrorOutlineIcon
                      sx={{
                        width: "35px",
                        height: "35px",
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </Stack>
              <Stack flexGrow={1}>
                <Tooltip title="Отменить заявку">
                  <span>
                    <IconButton
                      disabled={rent.rentStatus !== "2OPENED"}
                      color="error"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleRejectRent(rent.id);
                      }}
                      sx={{
                        p: 0,
                        margin: 0,
                        alignContent: "center",
                        color: "primary.white",
                      }}
                    >
                      <ClearIcon
                        sx={{
                          width: "35px",
                          height: "35px",
                        }}
                      />
                    </IconButton>
                  </span>
                </Tooltip>
              </Stack>
            </Stack>
          ),
        },
      ],
      clickAction: () => handleNavigate(`/rent/${rent.id}/status`),
    })),
  };
};
