import React, { useState, useEffect } from "react";
import { Edit2, Eye } from "react-feather";

import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  Box,
  Card,
  CardContent,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./attribute.module.css";
import CustomModal from "../../common/customModal";
import AddForm from "./AddForm.js";
import { useDispatch, useSelector } from "react-redux";
import {
  getAttributeListApi,
  getAttributeSetDetailsListApi,
} from "../../../redux/actions/catalogServiceNew";
import { getCategoriesApi } from "../../../redux/actions/catalogServiceNew";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import { getRoleApi } from "../../../redux/actions/login";

const Attributes = () => {
  const { catalogServiceNewReducer } = useSelector((state) => {
    return state;
  });

  const { catagories, loading } = useSelector(
    (state) => state.catalogQueryReducer
  );
  const { authorities } = useSelector((state) => state.loginReducer);

  const router = useRouter();
  const dispatch = useDispatch();
  const [showAttributeAddForm, setShowAttributeAddForm] = useState(false);
  const [showAttributeEditForm, setShowAttributeEditForm] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getCategoriesApi());
    dispatch(getRoleApi());

    if (categoryId) {
      dispatch(getAttributeListApi(categoryId, currentPage - 1, 10));
    }
  }, []);

  useEffect(() => {
    if (catagories && catagories.length > 0) {
      setCategoryId(catagories[0].id);
    }
  }, [catagories]);

  useEffect(() => {
    if (categoryId) {
      dispatch(getAttributeListApi(categoryId, 0, 10));
      setCurrentPage(1);
    }
  }, [categoryId]);

  //   /*-----------------Pagination------------------*/

  const recordPerPage = 10;
  const totalRecords = catalogServiceNewReducer?.attributeGet?.totalElements;
  const pageRange = 10;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = catalogServiceNewReducer?.attributeGet?.content;

  const handlePaginationChange = (value) => {
    setCurrentPage(value);
    dispatch(getAttributeListApi(categoryId, value - 1, 10));
  };

  /*-----------------Pagination------------------*/

  function handleEdit(id, name) {
    router.push({
      pathname: "/attributeSet",
      query: { attributeSet: id, attributeSetName: name },
    });

    dispatch(getAttributeSetDetailsListApi(id, 0, 10));
  }
  const categoryHandler = (e) => {
    setCategoryId(e.target.value);
  };

  return (
    <>
      <Grid container>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={12}>
          <Card sx={{ p: 5 }}>
            <Grid container spacing={2} justifyContent="space-between">
              <Typography variant="h2" className={styles.main_title}>
                Attribute set
              </Typography>

              <Box className={styles.category_btn_add_btn}>
                <Box className={styles.add_dropDownBtn}>
                  <Button
                    variant="outlined"
                    color="success"
                    component="label"
                    onClick={() => setShowAttributeAddForm(true)}
                    disabled={authorities?.ATTRIBUTES == "r" ? true : false}
                  >
                    ADD NEW
                  </Button>
                </Box>
              </Box>

              <CustomModal
                openModal={showAttributeAddForm}
                closeModal={() =>
                  setShowAttributeAddForm(!showAttributeAddForm)
                }
                body={
                  <AddForm classModal={() => setShowAttributeAddForm(false)} />
                }
              />
            </Grid>
            {loading === true ? (
              <div
                className="loader-box loader"
                style={{ width: "100% !important" }}
              >
                <div className="loader">
                  <div className="line bg-primary"></div>
                  <div className="line bg-primary"></div>
                  <div className="line bg-primary"></div>
                  <div className="line bg-primary"></div>
                </div>
              </div>
            ) : (
              <>
                <Box style={{ paddingTop: "10px" }}>
                  <FormControl variant="standard">
                    <InputLabel id="demo-simple-select-standard-label">
                      Categories
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      label="Category"
                      className={styles.selectCategory_dropdown_Att}
                      value={categoryId}
                      onChange={categoryHandler}
                    >
                      {catagories &&
                        catagories !== null &&
                        catagories !== undefined &&
                        Object.keys(catagories).length &&
                        catagories?.map((item, i) => {
                          return (
                            <MenuItem value={item.id}>{item.name}</MenuItem>
                          );
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
                          <TableCell>NAME</TableCell>
                          <TableCell>ROLE</TableCell>
                          <TableCell align="right">DESCRIPTION</TableCell>
                          <TableCell align="right">PRIORITY SEQUENCE</TableCell>
                          <TableCell align="right">ATTRIBUTES</TableCell>
                          {authorities?.ATTRIBUTES == "w" && (
                            <TableCell align="right">EDIT</TableCell>
                          )}
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
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {i + 1 + indexOfFirstRecord}
                              </TableCell>
                              <TableCell align="right">{row.name}</TableCell>
                              <TableCell align="right">{row.role}</TableCell>
                              <TableCell align="right">
                                {row.description}
                              </TableCell>
                              <TableCell align="right">
                                {row.precedence}
                              </TableCell>

                              <TableCell align="right">
                                <div className="action_center">
                                  <Eye
                                    style={{
                                      textAlign: "right",
                                      fontSize: "xx-small",
                                      color: "#419794",
                                    }}
                                    onClick={() => handleEdit(row.id, row.name)}
                                  />
                                </div>
                              </TableCell>

                              {authorities?.ATTRIBUTES == "w" && (
                                <TableCell align="right">
                                  <div className="action_center">
                                    <Edit2
                                      style={{
                                        textAlign: "right",
                                        fontSize: "10px",
                                        color: "#419794",
                                      }}
                                      onClick={() => handleEdit(row.userId)}
                                    />
                                  </div>
                                </TableCell>
                              )}
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
                  <div className={styles.attribute_pagination}>
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
                </CardContent>
              </>
            )}
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Attributes;
