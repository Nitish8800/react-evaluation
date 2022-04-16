import { styled } from "@mui/material/styles";
import * as React from "react";
import Table from "@mui/material/Table";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Cell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.success.dark,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const Row = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.divider,
  },
}));

export default function HomeTable() {
  const [RowData, setRowData] = React.useState([]);

  const fetchData = () => {
    axios.get("http://localhost:3100/city").then((el) => {
      setRowData([...el.data]);
    });
  };

  React.useEffect(() => {
    fetchData();

    return () => {};
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3100/city/${id}`).then((el) => {
      fetchData();
    });
  };

  const handleSort = (value) => {
    let sorted = [...RowData];
    if (value === "ascending")
      sorted.sort((a, b) => +a.population - +b.population);
    else sorted.sort((a, b) => +b.population - +a.population);

    setRowData(sorted);
  };

  return (
    <>
      <div style={{ margin: "15px" }}>
        <Button
          style={{ margin: "15px" }}
          variant="outlined"
          onClick={() => handleSort("ascending")}
        >
          Sort Ascending
        </Button>
        <Button
          style={{ margin: "15px" }}
          variant="outlined"
          onClick={() => handleSort("descending")}
        >
          Sort descending
        </Button>
        <Button
          style={{ margin: "15px" }}
          variant="outlined"
          onClick={() => fetchData()}
        >
          Clear
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <Cell>ID </Cell>
              <Cell>Country</Cell>
              <Cell>City</Cell>
              <Cell>Population</Cell>
              <Cell>Edit</Cell>
              <Cell>Delete</Cell>
            </TableRow>
          </TableHead>
          <TableBody>
            {RowData.map((el, index) => (
              <Row key={el.id}>
                <Cell component="th" scope="el">
                  {index + 1}
                </Cell>
                <Cell>{el.country}</Cell>
                <Cell>{el.city}</Cell>
                <Cell>{el.population}</Cell>

                <Cell>
                  <Link
                    to={`/add-city/${el.id}`}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    {"Edit"}
                  </Link>
                </Cell>

                <Cell onClick={() => handleDelete(el.id)}>
                  {/* <Link to={""}></Link> */}
                  <button type="button" className="btn btn-sm btn-danger">
                    {"Delete"}
                  </button>
                </Cell>
              </Row>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
