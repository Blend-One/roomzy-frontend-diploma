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

const StyledTableContainer = styled(TableContainer)(() => ({
  height: 800,
  flexGrow: 1,
  flexShrink: 1,
  overflowY: "auto",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.selected,
  },
}));

const StyledTableCell = styled(TableCell)({
  flexGrow: 1,
});

const BasicTable: FC<{ data: ITable }> = ({ data }) => {
  return (
    <StyledTableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {data.header.map((head, index) => (
              <TableCell key={index}>{head.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.body.map((row, index) => (
            <StyledTableRow key={index}>
              {row.data.map((cell, i) => (
                <StyledTableCell key={i}>{cell.name}</StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default BasicTable;
