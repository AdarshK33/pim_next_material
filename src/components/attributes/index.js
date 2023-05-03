import React, {
  Fragment,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
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
import styles from "./attribute.module.css";
import Image from "next/image";
import edit from "../../../assets/icons/edit.svg";
import CustomModal from "../../common/customModal";
import AddForm from "./AddForm.js";
import { useDispatch, useSelector } from "react-redux";
import { getAttributeListApi } from "../../../redux/actions/catalogServiceNew";
import { getRoleApi, getUserListApi } from "../../../redux/actions/login";

const Attributes = () => {
  const { catalogServiceNewReducer } = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
  const [showAttributeAddForm, setShowAttributeAddForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAttributeListApi(currentPage - 1, 5));
    dispatch(getRoleApi());
  }, []);

  //   /*-----------------Pagination------------------*/

  const recordPerPage = 5;
  const totalRecords = catalogServiceNewReducer?.attributeGet?.totalElements;
  const pageRange = 5;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = catalogServiceNewReducer?.attributeGet?.content;

  const handlePaginationChange = (event, value) => {
    setCurrentPage(value);
    dispatch(getAttributeListApi(value - 1, 5));
  };

  /*-----------------Pagination------------------*/

  return (
    <>
      <Grid container spacing={0}>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={12}>
          {/* <Grid item md={4}>
            <button
              onClick={() => setShowBrandCreationForm(true)}
              className={`btn btn-sm ${styles.add_button_text}`}
            >
          + Add New
            </button>
          </Grid> */}
          <Card sx={{ p: 5 }}>
            <Grid container spacing={2} justifyContent="space-between">
              <Typography variant="h2" className={styles.main_title}>
                Attribute set
              </Typography>
              <Button
                variant="outlined"
                color="success"
                component="label"
                onClick={() => setShowAttributeAddForm(true)}
              >
                ADD NEW
                {/* <input hidden accept="image/*" multiple type="file" /> */}
              </Button>

              <CustomModal
                openModal={showAttributeAddForm}
                closeModal={() => setShowAttributeAddForm(false)}
                body={
                  <AddForm classModal={() => setShowAttributeAddForm(false)} />
                }
              />
            </Grid>
            <CardContent>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>NAME</TableCell>
                      <TableCell>ROLE</TableCell>
                      <TableCell align="right">DESCRIPTION</TableCell>
                      <TableCell align="right">PRECEDENCE</TableCell>
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
                          <TableCell align="right">{row.name}</TableCell>
                          <TableCell align="right">{row.role}</TableCell>
                          <TableCell align="right">{row.description}</TableCell>
                          <TableCell align="right">{row.precedence}</TableCell>
                          <TableCell align="right">
                            {row?.active === true ? "Active" : "In-Active"}
                          </TableCell>
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
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={12}>No Record Found</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Stack spacing={2}>
                <div className={styles.attribute_pagination}>
                  <Pagination
                    count={Math.ceil(totalRecords / recordPerPage)}
                    page={currentPage}
                    showFirstButton
                    showLastButton
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

export default Attributes;
