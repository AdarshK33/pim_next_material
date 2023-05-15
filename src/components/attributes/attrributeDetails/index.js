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
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
// import styles from "./attribute.module.css";
import styles from "../attribute.module.css";

import Image from "next/image";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";

// import edit from "../../../assets/icons/edit.svg";
// import CustomModal from "../../common/customModal";
// import AddForm from "./AddForm.js";
import { useDispatch, useSelector } from "react-redux";
import { getAttributeSetDetailsListApi } from "../../../../redux/actions/catalogServiceNew";
import { getRoleApi, getUserListApi } from "../../../../redux/actions/login";

const AttributeSetDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { catalogServiceNewReducer } = useSelector((state) => {
    return state;
  });

  const [showAttributeAddForm, setShowAttributeAddForm] = useState(false);
  const [showAttributeEditForm, setShowAttributeEditForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  //   useEffect(() => {
  //     dispatch(getAttributeListApi(currentPage - 1, 5));
  //     dispatch(getRoleApi());
  //     dispatch(getCategoriesApi());
  //   }, []);

  console.log(
    "catalogServiceNewReducer",
    catalogServiceNewReducer?.attributeSetData
  );
  const tableData = [];
  for (let i = 1; i <= 5; i++) {
    tableData.push({
      itemId: "DTE000" + i,
      itemName: "Dolo 650mg",
      category: "PHARMA",
      formation: "20%",
      productStatus: "Draft",
    });
  }

  //   /*-----------------Pagination------------------*/

  const recordPerPage = 10;
  const totalRecords = catalogServiceNewReducer?.attributeSetData?.length;
  const pageRange = 10;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = catalogServiceNewReducer?.attributeSetData;

  const handlePaginationChange = (event, value) => {
    setCurrentPage(value);
    // dispatch(
    //   getAttributeSetDetailsListApi(router.query.attributeSet, value - 1, 10)
    // );
  };
  const ShowBack = () => {
    console.log("called back");
    router.push("/attributes");
  };

  /*-----------------Pagination------------------*/

  return (
    <>
      <Grid container>
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
                Attributes
              </Typography>
              <Button
                variant="outlined"
                color="success"
                component="label"
                onClick={ShowBack}
              >
                Back
              </Button>
              {/*
              <CustomModal
                openModal={showAttributeAddForm}
                closeModal={() =>
                  setShowAttributeAddForm(!showAttributeAddForm)
                }
                body={
                  <AddForm classModal={() => setShowAttributeAddForm(false)} />
                }
              /> */}
            </Grid>
            <CardContent>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>

                      <TableCell>DISPLAY NAME</TableCell>
                      <TableCell align="right">MANDATORY</TableCell>
                      <TableCell align="right">STATUS</TableCell>
                      {/* <TableCell align="right">ACTION</TableCell> */}
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
                          <TableCell align="right">{row.keyName}</TableCell>

                          <TableCell align="right">
                            {row.mandatory}
                            {row?.mandatory === true ? "Yes" : "No"}
                          </TableCell>
                          <TableCell align="right">
                            {row?.active === true ? "Active" : "In-Active"}
                          </TableCell>
                          {/* <div className="action_center">
                            <Image
                              className="px-2 "
                              src={edit}
                              alt="edit"
                              width={30}
                              height={25}
                              onClick={() => handleEdit(row.id)}
                            />
                          </div> */}
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
              <div className={styles.attribute_pagination}>
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

export default AttributeSetDetails;
