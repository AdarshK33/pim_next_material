import React, { useState } from "react";
import Pagination from "react-js-pagination";
import { Edit2, Eye, Search, AlertCircle } from "react-feather";
import { Container, Form, Row, Col, Table, Button } from "react-bootstrap";
import Link from 'next/link'
import Breadcrumb from "../../public/breadcrumb"
import styles from "./dashBoard.module.css";
import CommonPaginationTable from "../../public/commonPaginationTable"
import tableHeader from "../../public/tableHeader"

function DashBoardView() {
  // Table data
  const tableData = [];

  for (let i = 1; i <= 10; i++) {
    tableData.push({
      id: "11100"+i,
      name: "item" + i,
      discription: "discription" + (i),
    });
  }

  // console.log("hhhhhh",tableHeader)
  //   /*-----------------Pagination------------------*/
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const totalRecords = tableData.length;
  const pageRange = 10;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = tableData;

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  }
  /*-----------------Pagination------------------*/


  return (
    <>
    
     <Container fluid>
        <Row>
          <Col sm={12}>
          <Breadcrumb title="DASHBOARD" parent="DASHBOARD LIST" />
            <CommonPaginationTable 
            header={tableHeader[0].DashBoard}
            tableData={tableData}
            indexOfFirstRecord={indexOfFirstRecord}
            currentPage={currentPage}
            recordPerPage={recordPerPage}
            totalRecords={totalRecords}
            pageRange={pageRange}
            handlePageChange={handlePageChange}
            ></CommonPaginationTable>
          </Col>
       </Row>
      </Container>
    </>
  )
}

export default DashBoardView;