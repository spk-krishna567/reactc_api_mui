import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface User {
  userId: string;
  id: string;
  title: string;
  body: string;
}
interface TablelistProps {
  value: string;
}

export const Tablelist: React.FC<TablelistProps> = ({ value }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", maxWidth: "1100px" }}
    >
      <TableContainer component={Paper} sx={{ maxWidth: 1000 }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>id</StyledTableCell>
              <StyledTableCell align="right">userId</StyledTableCell>
              <StyledTableCell align="right">title</StyledTableCell>
              <StyledTableCell align="right">body</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {value === ""
              ? data.map((row: User) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.userId}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.title}</StyledTableCell>
                    <StyledTableCell align="right">{row.body}</StyledTableCell>
                  </StyledTableRow>
                ))
              : data
                  .filter(
                    (row: User) =>
                      row.title.includes(value) || row.body.includes(value)
                  )
                  .map((row: User) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row">
                        {row.id}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.userId}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.title}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.body}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
          </TableBody>
        </Table>
      </TableContainer>
      {loading && <CircularProgress />}
    </div>
  );
};
