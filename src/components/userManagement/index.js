import React, { useState, useEffect } from "react";
import styles from "./userManagement.module.css";
import Image from "next/image";
import edit from "../../../assets/icons/edit.svg";
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
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";

import Pagination from "react-js-pagination";

import CustomModal from "../../common/customModal";
import AddForm from "./AddForm.js";
import UpdateForm from "./UpdateForm.js";

import { useDispatch, useSelector } from "react-redux";
import {
  getRoleApi,
  getUserListApi,
  getUserByIdApi,
  filterUserApi,
} from "../../../redux/actions/login";

const UserManagement = () => {
  const { userGet, roleGet, loading } = useSelector((state) => {
    return state.loginReducer;
  });
  const dispatch = useDispatch();
  const [showUserAddForm, setShowUserAddForm] = useState(false);
  const [showUserUpdateForm, setShowUserUpdateForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [role, setRole] = useState("");

  useEffect(() => {
    dispatch(getUserListApi(currentPage - 1, 5));
    dispatch(getRoleApi());
  }, []);

  const roleHandler = (e) => {
    setRole(e.target.value);
    // setCurrentPage(0);
    // dispatch(filterUserApi(currentPage-1, 5, e.target.value));
  };

  const tableData = [];

  for (let i = 1; i <= 5; i++) {
    tableData.push({
      email: "demo@gmail.com" + i,
      sku: "ADMIN" + i,
      brand: "Nike" + i,
    });
  }

  const recordPerPage = 5;
  const totalRecords = userGet.totalElements;
  const pageRange = 5;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = userGet?.content;

  const handlePaginationChange = (value) => {
    setCurrentPage(value);
    // console.log(value, "value");
    if (role) {
      console.log("pagination called");
      dispatch(filterUserApi(currentPage - 1, 5, role));
    } else {
      dispatch(getUserListApi(value - 1, 5));
    }
  };

  useEffect(() => {
    if (role) {
      setCurrentPage(1);
      dispatch(filterUserApi(0, 5, role));
    }
  }, [role]);

  const handleEdit = (userId) => {
    setShowUserUpdateForm(true);
    dispatch(getUserByIdApi(userId));
  };

  return (
    <>
      <Grid container spacing={0}>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={12}>
          <Card sx={{ p: 5 }}>
            <Grid container spacing={2} justifyContent="space-between">
              <Typography variant="h7" className={styles.main_title}>
                Users
              </Typography>
              {/* <Grid
                item
                xs={4}
                container
                spacing={2}
                justifyContent="space-between"
              > */}
              <Box className={styles.user_btn_add_btn}>
                {/* </Grid> */}
                <Box className={styles.add_dropDownBtn}>
                  <Button
                    variant="outlined"
                    color="success"
                    component="label"
                    onClick={() => setShowUserAddForm(true)}
                  >
                    Add New
                    {/* <input hidden accept="image/*" multiple type="file" /> */}
                  </Button>
                </Box>
              </Box>
              <CustomModal
                openModal={showUserAddForm}
                closeModal={() => setShowUserAddForm(false)}
                body={<AddForm classModal={() => setShowUserAddForm(false)} />}
              />
            </Grid>

            <Box style={{ paddingTop: "10px" }}>
              <FormControl variant="standard">
                <InputLabel id="demo-simple-select-standard-label">
                  Select Role
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="Role"
                  className={styles.selectUser_dropdown_Att}
                  value={role || ""}
                  onChange={(e) => roleHandler(e)}
                >
                  <MenuItem value=""></MenuItem>
                  {roleGet &&
                    roleGet?.map((item, i) => {
                      return <MenuItem value={item.name}>{item.name}</MenuItem>;
                    })}
                </Select>
              </FormControl>
            </Box>
            <CardContent>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell align="right">EMAIL</TableCell>
                      <TableCell align="right">ROLE</TableCell>

                      <TableCell align="right">STATUS</TableCell>
                      <TableCell align="right">ACTION</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentRecords &&
                    currentRecords !== null &&
                    currentRecords.length > 0 ? (
                      currentRecords.map((row, i) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {i + 1 + indexOfFirstRecord}
                          </TableCell>
                          <TableCell align="right">{row.email}</TableCell>
                          <TableCell align="right">{row.roleName}</TableCell>
                          <TableCell align="right">{row.status}</TableCell>
                          <div className="action_center">
                            <Image
                              className="px-2 "
                              src={edit}
                              alt="edit"
                              width={30}
                              height={25}
                              onClick={() => handleEdit(row.userId)}
                            />
                          </div>
                          <CustomModal
                            openModal={showUserUpdateForm}
                            closeModal={() => setShowUserUpdateForm(false)}
                            body={
                              <UpdateForm
                                classModal={() => setShowUserUpdateForm(false)}
                              />
                            }
                          />
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
              {/* <Stack spacing={2}> */}
              <div className={styles.category_pagination}>
                {/* <Pagination
                    count={Math.ceil(totalRecords / recordPerPage)}
                    page={currentPage}
                    showFirstButton
                    showLastButton
                    onChange={handlePaginationChange}
                  /> */}
                <Pagination
                  itemClass="page-item"
                  linkClass="page-link"
                  activePage={currentPage}
                  itemsCountPerPage={recordPerPage}
                  totalItemsCount={totalRecords}
                  pageRangeDisplayed={pageRange}
                  firstPageText="First"
                  lastPageText="Last"
                  onChange={handlePaginationChange}
                />
              </div>
              {/* </Stack> */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default UserManagement;
