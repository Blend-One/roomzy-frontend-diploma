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
}));

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
            <TableRow key={index}>
              {row.data.map((cell, i) => (
                <TableCell key={i}>{cell.name}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default BasicTable;
