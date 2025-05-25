import dayjs from "dayjs";
import { IModerationsIssues } from "../../../types/rentIssues";

export const getTableData = (
  data: IModerationsIssues[],
  handleNavigate: (id: string) => void,
) => {
  return {
    header: [{ name: "ID" }, { name: "Дата" }],
    body: data.map((room) => ({
      data: [
        { name: room.rentId },
        {
          name: dayjs(room.controversialIssues[0].date).format(
            "DD.MM.YYYY HH:mm",
          ),
        },
      ],
      clickAction: () => handleNavigate(`/rent/${room.rentId}/moderator/issues`),
    })),
  };
};
