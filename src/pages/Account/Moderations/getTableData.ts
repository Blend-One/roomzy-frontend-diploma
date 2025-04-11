import { IViewRoom } from "../../../types/rooms";
import { getRoomStatusCompare } from "../../../utils/compare";

export const getTableData = (
  data: IViewRoom[],
  handleNavigate: (id: string) => void
) => {
  return {
    header: [
      { name: "Адрес" },
      { name: "Цена" },
      { name: "Площадь" },
      { name: "Статус" },
    ],
    body: data.map((room) => ({
      data: [
        { name: `${room.street}, ${room.building}` },
        { name: `${room.price} ₸` },
        { name: `${room.square} м²` },
        { name: getRoomStatusCompare(room.status) },
      ],
      clickAction: () => handleNavigate(`/publications/${room.id}`),
    })),
  };
};
