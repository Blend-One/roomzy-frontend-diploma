import { IViewRoom } from "../../../types/rooms";

export const getTableData = (data: IViewRoom[]) => {
  return {
    header: [
      { name: "Название" },
      { name: "Цена" },
      { name: "Улица" },
      { name: "Здание" },
      { name: "Площадь" },
      { name: "Этажи" },
    ],
    body: data.map((room) => ({
      data: [
        { name: room.title },
        { name: `${room.price} ₸` },
        { name: room.street },
        { name: room.building },
        { name: `${room.square} м²` },
        { name: room.status },
      ],
    })),
  };
};
