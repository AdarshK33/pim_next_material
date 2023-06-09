import React, { useState } from "react";
import { Grid, Button, CardContent, Typography, Card } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "../attribute.module.css";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { getAttributeSetDetailsListApi } from "../../../../redux/actions/catalogServiceNew";
import CustomModal from "../../../common/customModal";
import AddAttributeForm from "../addAttributeForm";

const AttributeSetDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const attrbuteSetId = router.query.attributeSet;
  const attributeSetName = router.query.attributeSetName;
  const { catalogServiceNewReducer } = useSelector((state) => {
    return state;
  });
  const { loading } = useSelector((state) => state.catalogServiceNewReducer);
  const { authorities } = useSelector((state) => state.loginReducer);

  const [showAttributeAddForm, setShowAttributeAddForm] = useState(false);
  const [showAttributeEditForm, setShowAttributeEditForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
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
  const totalRecords =
    catalogServiceNewReducer?.attributeSetData?.totalElements;
  const pageRange = 10;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = catalogServiceNewReducer?.attributeSetData?.content;

  const handlePaginationChange = (value) => {
    setCurrentPage(value);
    dispatch(
      getAttributeSetDetailsListApi(router.query.attributeSet, value - 1, 10)
    );
  };

  /*-----------------Pagination------------------*/

  return (
    <>
      <Grid container>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={12}>
          <Card sx={{ p: 5 }}>
            <Grid container spacing={2} justifyContent="space-between">
              <Typography
                variant="h2"
                className={styles.main_Details_view_title}
              >
                {attributeSetName} Attributes
              </Typography>

              <Button
                variant="outlined"
                color="success"
                component="label"
                onClick={() => setShowAttributeAddForm(true)}
                disabled={authorities?.ATTRIBUTES == "r" ? true : false}
              >
                Add New
              </Button>

              <CustomModal
                openModal={showAttributeAddForm}
                closeModal={() =>
                  setShowAttributeAddForm(!showAttributeAddForm)
                }
                body={
                  <AddAttributeForm
                    classModal={() => setShowAttributeAddForm(false)}
                    id={attrbuteSetId}
                  />
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
              <CardContent>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>

                        <TableCell>DISPLAY NAME</TableCell>
                        <TableCell align="center">DESCRIPTION</TableCell>
                        <TableCell align="center">MANDATORY</TableCell>

                        <TableCell align="right">STATUS</TableCell>
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
                            <TableCell align="start">{row.keyName}</TableCell>
                            <TableCell align="center">
                              {row.description}
                            </TableCell>

                            <TableCell align="center">
                              {row.mandatory}
                              {row?.mandatory === true ? "Yes" : "No"}
                            </TableCell>
                            <TableCell align="right">
                              {row?.active === true ? "Active" : "In-Active"}
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
            )}
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default AttributeSetDetails;
