import React, { useState, useEffect, useRef } from "react";
import dynamic from 'next/dynamic'
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
import { getAttributeSetDetailsListApi, getAttributeSetDetailsSearchApi } from "../../../../redux/actions/catalogServiceNew";
const CustomModal = dynamic(() => import('../../../common/customModal'))
const AddAttributeForm = dynamic(() => import('../addAttributeForm'))
// import CustomModal from "../../../common/customModal";
// import AddAttributeForm from "../addAttributeForm";
import { Search } from "react-feather";


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
  const [search, setSearch] = useState(0);


  const [focus, setFocus] = useState(false)
  const [borderFocus, setBorderFocus] = useState(false)
  // const tableData = [];
  // for (let i = 1; i <= 5; i++) {
  //   tableData.push({
  //     itemId: "DTE000" + i,
  //     itemName: "Dolo 650mg",
  //     category: "PHARMA",
  //     formation: "20%",
  //     productStatus: "Draft",
  //   });
  // }
  //  console.log(catalogServiceNewReducer?.attributeSetData, "catalogServiceNewReducer?.attributeSetData")
  useEffect(() => {
    if (router.query.attributeSet) {
      dispatch(
        getAttributeSetDetailsListApi(router.query.attributeSet, 0, 10)
      )
    }

  }, [router.query.attributeSet]);


  //   /*-----------------Pagination------------------*/

  const recordPerPage = 10;
  const totalRecords =
    catalogServiceNewReducer?.attributeDetailsData?.totalElements;
  const pageRange = 10;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = catalogServiceNewReducer?.attributeDetailsData?.content;

  const handlePaginationChange = (value) => {
    setCurrentPage(value);
    if (search) {
      dispatch(
        getAttributeSetDetailsSearchApi(router.query.attributeSet, search, value - 1, 10)
      )
    }
    else {
      dispatch(
        getAttributeSetDetailsListApi(router.query.attributeSet, value - 1, 10)
      );

    }
  };

  /*-----------------Pagination------------------*/

  const handleFocus = (e) => {
    setFocus(true)
    setBorderFocus(true)
  }
  const handleFocusOut = (e) => {
    if (e.target.value === "") setFocus(false)
    setBorderFocus(false)
  }
  const getSearchKey = (e) => {
    console.log(e, "hello search")

    setSearch(e)
    setCurrentPage(1)
    if (e) {
      dispatch(
        getAttributeSetDetailsSearchApi(router.query.attributeSet, e, 0, 10)
      )
    }
    if (e.length === 0) {
      dispatch(
        getAttributeSetDetailsListApi(router.query.attributeSet, 0, 10)
      )
    }
  }
  // useEffect(() => {
  //   setCurrentPage(0);
  //   if (search === 0) {
  //     dispatch(

  //       getAttributeSetDetailsListApi(router.query.attributeSet, '', 0, 10)
  //     )
  //   }
  // }, [search]);

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
                {/* {attributeSetName?.charAt(0).toUpperCase() +
                  attributeSetName.slice(1).toLowerCase()}
                {""} Attributes */}
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

            <div className="search_custom_container">
              <div className="search_custom_textField" style={borderFocus ? { border: "2px solid  #419794" } : { border: "1px solid #C2C2C2" }}>

                <Search

                  className="search-icon_attribute mr-1"
                  style={{ color: "#313131", cursor: "pointer" }}

                />
                <p className={focus ? 'search_custom_focusp' : 'search_custom_nonfocusp'} style={borderFocus ? { color: "#419794" } : { color: "#C2C2C2" }}>Search</p>
                <input type="text" name="search" onFocus={handleFocus} onBlur={handleFocusOut} onChange={e => getSearchKey(e.target.value)} autocomplete="off" />
              </div>
            </div>

            <CardContent>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {/* <TableCell>#</TableCell> */}

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
                          {/* <TableCell component="th" scope="row">
                            {i + 1 + indexOfFirstRecord}
                          </TableCell> */}
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

          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(AttributeSetDetails);
