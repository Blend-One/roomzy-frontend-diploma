import { IconButton, Tooltip } from "@mui/material";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import { ITable } from "../../../components/Table/types";
import { IViewRoom } from "../../../types/rooms";
import { getRoomStatusCompare } from "../../../utils/compare";
import { getPriceCurrency } from "../../../utils/common";

export const getTableData = (
  data: IViewRoom[],
  handleNavigate: (id: string) => void
): ITable => {
  return {
    header: [
      { name: "Адрес" },
      { name: "Цена" },
      { name: "Площадь" },
      { name: "Статус" },
      { name: "Действия" },
    ],
    body: data.map((room) => ({
      data: [
        { name: `${room.street}, ${room.building}` },
        { name: getPriceCurrency(+room.price) },
        { name: `${room.square} м²` },
        { name: getRoomStatusCompare(room.status) },
        {
          name: room.status,
          width: 30,
          render: () => (
            <Tooltip title="Заявки арендаторов">
              <IconButton
                color="default"
                onClick={(event) => {
                  event.stopPropagation();
                  handleNavigate(
                    `/rent/${room.id}/requests?roomName=${room.title}`
                  );
                }}
                sx={{
                  p: 0,
                  margin: 0,
                  alignContent: "center",
                  color: "primary.white",
                }}
              >
                <SupervisedUserCircleIcon
                  sx={{ width: "35px", height: "35px" }}
                />
              </IconButton>
            </Tooltip>
          ),
        },
      ],
      clickAction: () => handleNavigate(`/publications/${room.id}`),
    })),
  };
};
