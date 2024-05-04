import { Container, Paper } from "@mui/material";
import Header from "../Header";
import Navigation from "../Navigation";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import styles from "./Gathering.module.css";

function CreateObject(itemName, job, location, targetItem, timeStart1, timeStart2) {
  return { itemName, job, location, targetItem, timeStart1, timeStart2 };
}

function Gathering() {
  const data = [
    CreateObject(
      "Earthbreak Aethersand",
      "FSH",
      "Upper La Noscea (25.1, 23.0)",
      "Verdigris Guppy",
      "-",
      "-"
    ),
    CreateObject("Lightning Cluster", "FSH", "Upper La Noscea ()", "Verdigris Guppy", "-"),
  ];

  return (
    <>
      <Header />
      <Navigation />
      <Container className="containerBody">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className={styles.tableHeader}>
                  Item Name
                </TableCell>
                <TableCell align="center" className={styles.tableHeader}>
                  Job
                </TableCell>
                <TableCell align="center" className={styles.tableHeader}>
                  Location
                </TableCell>
                <TableCell align="center" className={styles.tableHeader}>
                  Target
                </TableCell>
                <TableCell align="center" className={styles.tableHeader}>
                  Time1
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((data) => (
                <TableRow
                  key={data.itemName}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" className={styles.tableContent}>
                    {data.itemName}
                  </TableCell>
                  <TableCell align="center" className={styles.tableContent}>
                    {data.job}
                  </TableCell>
                  <TableCell align="center" className={styles.tableContent}>
                    {data.location}
                  </TableCell>
                  <TableCell align="center" className={styles.tableContent}>
                    {data.targetItem}
                  </TableCell>
                  <TableCell align="center" className={styles.tableContent}>
                    {data.timeStart1}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default Gathering;
