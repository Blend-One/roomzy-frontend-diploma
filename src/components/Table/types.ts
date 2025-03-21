export interface ITable {
  header: ITableCell[];
  body: ITableRow[];
}

interface ITableRow {
  data: ITableCell[];
}

interface ITableCell {
  name: string | number;
}
