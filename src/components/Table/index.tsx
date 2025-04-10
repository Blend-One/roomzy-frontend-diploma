import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  styled,
} from "@mui/material";
import { FC } from "react";
import { ITable } from "./types";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  minHeight: 500,
  flexGrow: 1,
  border: `1px solid ${theme.palette.divider}`,
}));

const StyledTable = styled(Table)(() => ({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
}));

const StyledTableBody = styled(TableBody)(() => ({
  flexGrow: 1,
  overflowY: "auto",
  display: "block",
}));

const StyledTableHead = styled(TableHead)(() => ({
  display: "table",
  tableLayout: "fixed",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.selected,
  },
  display: "table",
  tableLayout: "fixed",
  width: "100%",
}));

const StyledTableCell = styled(TableCell)({
  flexGrow: 1,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const BasicTable: FC<{ data: ITable }> = ({ data }) => {
  return (
    <StyledTableContainer>
      <StyledTable stickyHeader>
        <StyledTableHead>
          <TableRow>
            {data.header.map((head, index) => (
              <StyledTableCell key={index}>{head.name}</StyledTableCell>
            ))}
          </TableRow>
        </StyledTableHead>
        <StyledTableBody>
          {data.body.map((row, index) => (
            <StyledTableRow key={index}>
              {row.data.map((cell, i) => (
                <StyledTableCell key={i}>{cell.name}</StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </StyledTableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};

export default BasicTable;
