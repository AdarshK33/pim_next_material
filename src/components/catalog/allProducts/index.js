import React, {
  Fragment,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

import edit from "../../../../assets/icons/edit.svg";

import Image from "next/image";

import styles from "./allProducts.module.css";
import { Tabs, Tab } from "@mui/material";
import PropTypes from "prop-types";
import {
  Grid,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  Checkbox,
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

const AllProducts = () => {
  const tableData = [];

  for (let i = 1; i <= 5; i++) {
    tableData.push({
      id: "11100" + i,
      sku: "Sku" + i,
      name: "Name" + i,
      brand: "Brand" + i,
      channels: "Channels" + i,
      category: "Category" + i,
    });
  }
  //   /*-----------------Pagination------------------*/
  const [currentPage, setCurrentPage] = useState(1);

  const recordPerPage = 5;
  const totalRecords = tableData.length;
  const pageRange = 5;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = tableData;

  const handlePaginationChange = (event, value) => {
    setCurrentPage(value);
  };

  /*-----------------Pagination------------------*/

  const [value, setValue] = useState(0);

  const handleNext = () => {
    setValue((prevValue) => prevValue + 1);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNextClick = () => {
    if (value < 3) {
      // assuming you have 3 tabs in total
      setValue(value + 1);
      // alert(`Moving to ${tabLabels[value + 1]} tab`);
    }
  };

  const tabLabels = [
    "Draft",
    "Ready for review",
    "Revalidate",
    "Ready for publish",
  ];

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <div>{children}</div>}
      </div>
    );
  }

  return (
    <>
      <Grid container spacing={0}>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={12}>
          <Card sx={{ p: 5 }}>
            <Grid container spacing={2} justifyContent="space-between">
              <Typography variant="h2" className={styles.main_title}>
                Products
              </Typography>
              <Button variant="outlined" color="success" component="label">
                Upload Products
                <input hidden accept="image/*" multiple type="file" />
              </Button>
            </Grid>
            <CardContent>
              {/* <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>

                      <TableCell>ID</TableCell>

                      <TableCell>SKU</TableCell>
                      <TableCell align="right">PRODUCT NAME</TableCell>
                      <TableCell align="right">BRAND</TableCell>
                      <TableCell align="right">CHANNELS</TableCell>
                      <TableCell align="right">CATEGORY</TableCell>
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
                        <TableCell align="right">{row.id}</TableCell>

                        <TableCell align="right">{row.sku}</TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.brand}</TableCell>
                        <TableCell align="right">{row.channels}</TableCell>
                        <TableCell align="right">{row.category}</TableCell>
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
              </TableContainer> */}
              {/* <Stack spacing={2}>
                <div className={styles.products_pagination}>
                  <Pagination
                    count={10}
                    page={currentPage}
                    onChange={handlePaginationChange}
                  />
                </div>
              </Stack> */}
              <Box sx={{ maxWidth: { xs: 320, sm: 480 }}}>
              <Tabs value={value} onChange={handleChange} >
                <Tab label={tabLabels[0]} />
                <Tab label={tabLabels[1]} />
                <Tab label={tabLabels[2]} />
                <Tab label={tabLabels[3]} />
              </Tabs>
              </Box>
              <TabPanel value={value} index={0} onNext={handleNext}>
                <Table style={{ margin: "10px 0" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell>ITEM ID</TableCell>
                      <TableCell>NAME</TableCell>
                      <TableCell>CATEGORY</TableCell>
                      <TableCell>FORMATION</TableCell>
                      <TableCell>STATUS</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>Item 1</TableCell>
                      <TableCell>Category A</TableCell>
                      <TableCell>Formation X</TableCell>
                      <TableCell>Draft</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>Item 2</TableCell>
                      <TableCell>Category B</TableCell>
                      <TableCell>Formation Y</TableCell>
                      <TableCell>Draft</TableCell>
                    </TableRow>
                    {/* Add more rows as needed */}
                  </TableBody>
                </Table>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNextClick}
                >
                  READY FOR REVIEW
                </Button>
              </TabPanel>
              <TabPanel value={value} index={1} onNext={handleNext}>
                <Table style={{ margin: "10px 0" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell>ITEM ID</TableCell>
                      <TableCell>NAME</TableCell>
                      <TableCell>CATEGORY</TableCell>
                      <TableCell>FORMATION</TableCell>
                      <TableCell>STATUS</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>Item 1</TableCell>
                      <TableCell>Category A</TableCell>
                      <TableCell>Formation X</TableCell>
                      <TableCell>Draft</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>Item 2</TableCell>
                      <TableCell>Category B</TableCell>
                      <TableCell>Formation Y</TableCell>
                      <TableCell>Draft</TableCell>
                    </TableRow>
                    {/* Add more rows as needed */}
                  </TableBody>
                </Table>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNextClick}
                >
                  REVALIDATE
                </Button>
              </TabPanel>
              <TabPanel value={value} index={2} onNext={handleNext}>
                <Table style={{ margin: "10px 0" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell>ITEM ID</TableCell>
                      <TableCell>NAME</TableCell>
                      <TableCell>CATEGORY</TableCell>
                      <TableCell>FORMATION</TableCell>
                      <TableCell>STATUS</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>Item 1</TableCell>
                      <TableCell>Category A</TableCell>
                      <TableCell>Formation X</TableCell>
                      <TableCell>Revalidate</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>Item 2</TableCell>
                      <TableCell>Category B</TableCell>
                      <TableCell>Formation Y</TableCell>
                      <TableCell>Revalidate</TableCell>
                    </TableRow>
                    {/* Add more rows as needed */}
                  </TableBody>
                </Table>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNextClick}
                >
                  READY FOR PUBLISH
                </Button>
              </TabPanel>
              <TabPanel value={value} index={3} onNext={handleNext}>
                <Table style={{ margin: "10px 0" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>ITEM ID</TableCell>
                      <TableCell>NAME</TableCell>
                      <TableCell>CATEGORY</TableCell>
                      <TableCell>FORMATION</TableCell>
                      <TableCell>STATUS</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>Item 1</TableCell>
                      <TableCell>Category A</TableCell>
                      <TableCell>Formation X</TableCell>
                      <TableCell>Ready for publish</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell>Item 2</TableCell>
                      <TableCell>Category B</TableCell>
                      <TableCell>Formation Y</TableCell>
                      <TableCell>Ready for publish</TableCell>
                    </TableRow>
                    {/* Add more rows as needed */}
                  </TableBody>
                </Table>
                {/* <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNextClick}
                >
                  DRAFT
                </Button> */}
              </TabPanel>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default AllProducts;
