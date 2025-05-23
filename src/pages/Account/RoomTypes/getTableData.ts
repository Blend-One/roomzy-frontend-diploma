import { IRoomTypes } from "../../../types/roomTypes";

export const getTableData = (
  data: IRoomTypes[],
  handleNavigate: (id: string) => void,
) => {
  return {
    header: [{ name: "Название" }],
    body: data.map((roomType) => ({
      data: [{ name: roomType.name }],
      clickAction: () =>
        handleNavigate(`/account/room-types/${roomType.id}/edit`),
    })),
  };
};
