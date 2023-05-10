import React, { useState, useEffect } from "react";
import styles from "./role.module.css";
import {
  Grid,
  Button,
  Card,
  CardContent,
  Typography,
  FormControl
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import { getRolePrivilegeApi } from "../../../redux/actions/login";
import { useDispatch, useSelector } from "react-redux";
import AddForm from "./AddForm";
import CustomModal from "../../common/customModal";
const Role = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [showUserAddForm, setShowUserAddForm] = useState(false)

  useEffect(() => {
    dispatch(getRolePrivilegeApi());
  }, []);

  const StyledTableHead = styled(TableHead)({
    "& th": {
      textAlign: "left !important",
    },
    "& td": {
      textAlign: "left !important",
    },
  });
  const StyledTableBody = styled(TableBody)({
    "& th": {
      textAlign: "left !important",
    },
    "& td": {
      textAlign: "left !important",
    },
  });

  const AllPrivileges = styled("div")(({ focused }) => ({
    padding: "8px",
    margin: "7px",
    border: "1px solid #ccc",
    cursor: "pointer",
    borderRadius: "5px",
    ...(focused && { borderColor: "#419794" }),
  }));

  const handlePrivileges = (index) => {
    setFocusedIndex(index);
  };

  const { loginReducer } = useSelector((state) => {
    return state;
  });


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

  const handlePaginationChange = (event, value) => {
    setCurrentPage(value);
  };
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

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
              <CustomModal
                openModal={showUserAddForm}
                closeModal={() => setShowUserAddForm(!showUserAddForm)}
                body={<AddForm classModal={() => setShowUserAddForm(!showUserAddForm)} />}
              />
            </Grid>
            <CardContent>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <StyledTableHead>
                    <TableRow>
                      <TableCell>NAME OF ROLE</TableCell>
                      <TableCell sx={{ paddingLeft: 3 }}>PRIVILEGES</TableCell>
                    </TableRow>
                  </StyledTableHead>
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

                  <StyledTableBody>
                    {Object.keys(loginReducer.rolePrivilege).length > 0 ? (
                      Object.keys(loginReducer.rolePrivilege).map((row, i) => (
                        <TableRow
                        //   key={row.name}
                        //   sx={{
                        //     "&:last-child td, &:last-child th": { border: 0 },
                        //   }}
                        >
                          <TableCell align="right">{row}</TableCell>
                          <TableCell>
                            <FormControl
                              sx={{
                                m: 1,
                                minWidth: 120,
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                              }}
                            >
                              {/* <InputLabel id="demo-simple-select-readonly-label">
                                Privileges
                              </InputLabel> */}
                              {Object.keys(loginReducer.rolePrivilege[row]).map(
                                (item, index) => (
                                  <AllPrivileges
                                    key={index}
                                    focused={index === focusedIndex}
                                    onClick={() => handlePrivileges(index)}
                                    onFocus={() => handlePrivileges(index)}
                                    onBlur={() => setFocusedIndex(null)}
                                    tabIndex="0"
                                  >
                                    {item}
                                  </AllPrivileges>
                                )
                              )}
                            </FormControl>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={12}>No Record Found</TableCell>
                      </TableRow>
                    )}
                  </StyledTableBody>
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
