import dayjs from "dayjs";
import { IRentIssues } from "../../../types/rentIssues";

export const getTableData = (data: IRentIssues[]) => {
  return {
    header: [{ name: "ID" }, { name: "Описание" }, { name: "Дата" }],
    body: data.map((issue) => ({
      data: [
        { name: issue.id },
        { name: issue.description },
        { name: dayjs(issue.date).format("DD.MM.YYYY HH:mm") },
      ],
    })),
  };
};
