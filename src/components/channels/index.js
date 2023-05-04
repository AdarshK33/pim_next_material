import React, { useState } from "react";
import styles from "./channels.module.css";
import Image from "next/image";
import edit from "../../../assets/icons/edit.svg";
import {
  Grid,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Channels = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const tableData = [];

  for (let i = 1; i <= 5; i++) {
    tableData.push({
      name: "amazon" + i,
      desc: "cloths" + i,
      last: "NA" + i,
      tpa: "0" + i,
      tpia: "0" + i,
      status: "Active",
    });
  }

  const recordPerPage = 5;
  const totalRecords = tableData.length;
  const pageRange = 5;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = tableData;

  const handlePaginationChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Grid container spacing={0}>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={12}>
          <Card sx={{ p: 5 }}>
            <Grid spacing={2} justifyContent="space-between">
              <Typography variant="h2" className={styles.main_title}>
                Channels
              </Typography>
              <Button variant="outlined" color="success" component="label">
                Add New
                {/* <input hidden accept="image/*" multiple type="file" /> */}
              </Button>
            </Grid>
            <CardContent>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell align="right">NAME</TableCell>
                      <TableCell align="right">DESCRIPTION</TableCell>
                      <TableCell align="right">LAST UPLOADED</TableCell>
                      <TableCell align="right">TOTAL PRODUCT ACTIVE</TableCell>
                      <TableCell align="right">
                        TOTAL PRODUCT INACTIVE
                      </TableCell>
                      <TableCell align="right">STATUS</TableCell>
                      <TableCell align="right">ACTION</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData.map((row, i) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {i + 1 + indexOfFirstRecord}
                        </TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.desc}</TableCell>
                        <TableCell align="right">{row.last}</TableCell>
                        <TableCell align="right">{row.tpa}</TableCell>
                        <TableCell align="right">{row.tpia}</TableCell>
                        <TableCell align="right">{row.status}</TableCell>
                        <div className="action_center">
                          <Image
                            className="px-2 "
                            src={edit}
                            alt="edit"
                            width={35}
                            height={30}
                            // onClick={()=>handleEdit(item.brandId)}
                          />
                        </div>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Stack spacing={2}>
                <div className={styles.category_pagination}>
                  <Pagination
                    count={10}
                    page={currentPage}
                    onChange={handlePaginationChange}
                  />
                </div>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Channels;
