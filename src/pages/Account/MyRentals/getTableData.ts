import dayjs from "dayjs";
import { IViewRent } from "../../../types/rent";
import { getPriceCurrency } from "../../../utils/common";
import { getRoomStatusCompare } from "../../../utils/compare";

export const getTableData = (
  data: IViewRent[],
  handleNavigate: (id: string) => void
) => {
  return {
    header: [
      { name: "Помещение" },
      { name: "Цена" },
      { name: "Депозит" },
      { name: "Начало аренды" },
      { name: "Конец аренды" },
      { name: "Статус аренды" },
    ],
    body: data.map((rent) => ({
      data: [
        { name: rent.room.title || "—" },
        { name: `${getPriceCurrency(+rent.totalPrice)}` },
        { name: rent.room.hasDeposit ? "Да" : "Нет" },
        { name: dayjs(rent.issuedDate).format("DD.MM.YYYY HH:mm") },
        { name: dayjs(rent.dueDate).format("DD.MM.YYYY HH:mm") },
        { name: getRoomStatusCompare(rent.rentStatus) },
      ],
      clickAction: () => handleNavigate(`/rent/${rent.id}/status`),
    })),
  };
};
