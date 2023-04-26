
import React, {
  Fragment,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
  // import BaseCard from "../src/components/baseCard/BaseCard";
  // import FeatherIcon from "feather-icons-react";
  
  import styles from "./category.module.css";

  import {
    Grid,
    Button,
    Box,
    Card,
    CardContent,
    Typography,
  } from "@mui/material";
  import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

  
  const Category = () => {

    
    
  

    const tableData = [];
  
    for (let i = 1; i <= 5; i++) {
      tableData.push({
        id: "11100"+i,
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
const totalRecords =tableData.length;
const pageRange = 5;
const indexOfLastRecord = currentPage * recordPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
const currentRecords = tableData;

const handlePaginationChange = (event, value) => {
  setCurrentPage(value);
};

/*-----------------Pagination------------------*/




    return (
   <>
     <Grid container spacing={0}>
      {/* ------------------------- row 1 ------------------------- */}
      <Grid item xs={12} lg={12}>
        <Card>
          <CardContent>
          <TableContainer component={Paper}>
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
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row,i) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            > 
              <TableCell component="th" scope="row">
                {i+1+indexOfFirstRecord}
              </TableCell>
              <TableCell align="right">{row.id}</TableCell>

              <TableCell align="right">{row.sku}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.brand}</TableCell>
              <TableCell align="right">{row.channels}</TableCell>
              <TableCell align="right">{row.category}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Stack spacing={2}>
      <div className={styles.category_pagination}>
      <Pagination count={10} page={currentPage} onChange={handlePaginationChange}  />
      </div>
      
    </Stack>
      </CardContent>
        </Card>
      </Grid>
    </Grid>
   </>
    );
  };
  
  export default Category;
  