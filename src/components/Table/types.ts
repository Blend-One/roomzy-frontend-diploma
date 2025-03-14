export interface ITable {
  header: ITableCell[];
  body: ITableRow[];
}

interface ITableRow {
  data: ITableCell[];
}

interface ITableCell {
  name: string;
}

export const mockTableData: ITable = {
  header: [{ name: "Name" }, { name: "Age" }, { name: "Email" }],
  body: [
    {
      data: [
        { name: "John Doe" },
        { name: "30" },
        { name: "john.doe@example.com" },
      ],
    },
    {
      data: [
        { name: "Jane Smith" },
        { name: "25" },
        { name: "jane.smith@example.com" },
      ],
    },
    {
      data: [
        { name: "Alice Johnson" },
        { name: "28" },
        { name: "alice.johnson@example.com" },
      ],
    },
    {
      data: [
        { name: "Alice Johnson" },
        { name: "28" },
        { name: "alice.johnson@example.com" },
      ],
    },
    {
      data: [
        { name: "Alice Johnson" },
        { name: "28" },
        { name: "alice.johnson@example.com" },
      ],
    },
    {
      data: [
        { name: "Alice Johnson" },
        { name: "28" },
        { name: "alice.johnson@example.com" },
      ],
    },
    {
      data: [
        { name: "Alice Johnson" },
        { name: "28" },
        { name: "alice.johnson@example.com" },
      ],
    },
  ],
};
