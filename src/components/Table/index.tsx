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
}));

const StyledTableBody = styled(TableBody)(() => ({
  flexGrow: 1,
  overflowY: "auto",
}));

const StyledTableHead = styled(TableHead)(() => ({}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.selected,
  },
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    cursor: "pointer",
  },
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
            <StyledTableRow onClick={row.clickAction} key={index}>
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
