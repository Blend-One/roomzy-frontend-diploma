export interface ITable {
  header: ITableCell[];
  body: ITableRow[];
}

interface ITableRow {
  data: ITableCell[];
  clickAction?: () => void;
}

interface ITableCell {
  name: string | number;
}
