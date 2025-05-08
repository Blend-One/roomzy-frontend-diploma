import { IconButton, Stack, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import { ITable } from "../../../../components/Table/types";
import { IViewRent } from "../../../../types/rent";
import { getPriceCurrency } from "../../../../utils/common";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import { getRoomStatusCompare } from "../../../../utils/compare";

export const getTableData = (
  data: IViewRent[],
  handleNavigate: (id: string) => void,
  handleApproveRent: (id: string) => void,
  handleRejectRent: (id: string) => void
): ITable => {
  return {
    header: [
      { name: "Арендатор" },
      { name: "Сумма" },
      { name: "Начало аренды" },
      { name: "Конец аренды" },
      { name: "Статус" },
      { name: "Действия" },
    ],
    body: data.map((rent) => ({
      data: [
        { name: rent.user.email || "—" },
        { name: `${getPriceCurrency(+rent.totalPrice)}` },
        { name: dayjs(rent.issuedDate).format("DD.MM.YYYY HH:mm") },
        { name: dayjs(rent.dueDate).format("DD.MM.YYYY HH:mm") },
        { name: getRoomStatusCompare(rent.rentStatus) },
        {
          name: "",
          width: 70,
          render: () => (
            <Stack spacing={2} direction={"row"}>
              {rent.rentStatus === "OPENED" && (
                <>
                  <Stack flexGrow={1}>
                    <Tooltip title="Одобрить аренду">
                      <IconButton
                        color="success"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleApproveRent(rent.id);
                        }}
                        sx={{
                          p: 0,
                          margin: 0,
                          alignContent: "center",
                          color: "primary.white",
                        }}
                      >
                        <DoneIcon sx={{ width: "35px", height: "35px" }} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                  <Stack flexGrow={1}>
                    <Tooltip title="Отклонить аренду">
                      <IconButton
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
                        <ClearIcon sx={{ width: "35px", height: "35px" }} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </>
              )}
            </Stack>
          ),
        },
      ],
      clickAction: () => handleNavigate(`/rent/${rent.id}/status`),
    })),
  };
};
