import React, { useState, useEffect } from "react";
import styles from "./role.module.css";
import {
  Grid,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getRolePrivilegeApi } from "../../../redux/actions/login";
import { useDispatch, useSelector } from "react-redux";
const Role = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getRolePrivilegeApi());
  }, []);

  const { loginReducer } = useSelector((state) => {
    return state;
  });

  console.log("loginReducer", loginReducer.rolePrivilege);

  const tableData = [];

  for (let i = 1; i <= 2; i++) {
    tableData.push({
      sku: "ADMIN",
    });
  }

  const recordPerPage = 5;
  //   const totalRecords = userGet.totalElements;
  const pageRange = 5;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = tableData;
  console.log("currentRecords", currentRecords);

  const handlePaginationChange = (event, value) => {
    setCurrentPage(value);
    console.log(value, "value");
  };
  const [age, setAge] = useState("");

  useEffect(() => {
    console.log("loginReducer in useEffect", loginReducer);
  }, [loginReducer]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const person = {
    address: {
      street: "1",
    },
  };
  console.log("stats ", person["address"]["street"]);

  return (
    <>
      <Grid container spacing={0}>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={12}>
          <Card sx={{ p: 5 }}>
            <Grid container spacing={2} justifyContent="space-between">
              <Typography variant="h7" className={styles.main_title}>
                Roles
              </Typography>
              <Button
                variant="outlined"
                color="success"
                component="label"
                onClick={() => setShowUserAddForm(true)}
              >
                Add New
                {/* <input hidden accept="image/*" multiple type="file" /> */}
              </Button>
            </Grid>
            <CardContent>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">NAME OF ROLE</TableCell>
                      <TableCell align="right">PRIVILEGES</TableCell>
                    </TableRow>
                  </TableHead>
                  {/* <TableBody>
                    {currentRecords &&
                    currentRecords !== null &&
                    currentRecords.length > 0 ? (
                      currentRecords.map((row, i) => (
                        <TableRow
                        //   key={row.name}
                        //   sx={{
                        //     "&:last-child td, &:last-child th": { border: 0 },
                        //   }}
                        >
                          <TableCell align="right">{row.sku}</TableCell>
                          <TableCell>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                              <InputLabel id="demo-simple-select-readonly-label">
                                Privileges
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-readonly-label"
                                id="demo-simple-select-readonly"
                                value={age}
                                label="Privileges"
                                onChange={handleChange}
                                // inputProps={{ readOnly: true }}
                              >
                                <MenuItem value={10}>category_read</MenuItem>
                              </Select>
                            </FormControl>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={12}>No Record Found</TableCell>
                      </TableRow>
                    )}
                  </TableBody> */}

                  <TableBody>
                    {Object.keys(loginReducer.rolePrivilege).length > 0 ? (
                      Object.keys(loginReducer.rolePrivilege).map((row, i) => (
                        <TableRow
                        //   key={row.name}
                        //   sx={{
                        //     "&:last-child td, &:last-child th": { border: 0 },
                        //   }}
                        >
                          {console.log("row", row)}
                          {console.log(
                            "object keys",
                            loginReducer.rolePrivilege[row]
                          )}
                          <TableCell align="right">{row}</TableCell>
                          <TableCell>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                              <InputLabel id="demo-simple-select-readonly-label">
                                Privileges
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-readonly-label"
                                id="demo-simple-select-readonly"
                                value={age}
                                label="Privileges"
                                onChange={handleChange}
                              >
                                {Object.keys(
                                  loginReducer.rolePrivilege[row]
                                ).map((child) => (
                                  <MenuItem disabled>
                                    {child}_
                                    {loginReducer.rolePrivilege[row][child]}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={12}>No Record Found</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* <Stack spacing={2}>
                <div className={styles.category_pagination}>
                  <Pagination
                    count={Math.ceil(totalRecords / recordPerPage)}
                    page={currentPage}
                    showFirstButton
                    showLastButton
                    onChange={handlePaginationChange}
                  />
                </div>
              </Stack> */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Role;
