import React, { useState } from "react";
import Pagination from "react-js-pagination";
import { Edit2, Eye, Search, AlertCircle } from "react-feather";
import { Container, Form, Row, Col, Table, Button } from "react-bootstrap";
import Link from 'next/link'
import Breadcrumb from "../../public/breadcrumb"
import styles from "./dashBoard.module.css";
import CommonPaginationTable from "../../public/commonPaginationTable"
import TABLE_HEADERS  from "../../public/tableHeader"

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
            {/* <CommonPaginationTable 
            header={tableHeader[0].DashBoard}
            tableData={tableData}
            indexOfFirstRecord={indexOfFirstRecord}
            currentPage={currentPage}
            recordPerPage={recordPerPage}
            totalRecords={totalRecords}
            pageRange={pageRange}
            handlePageChange={handlePageChange}
            ></CommonPaginationTable> */}
        <div className="card" style={{ borderRadius: "1rem" }}>
        <div className="card-body">
          <div className="table-responsive">
            <Table id="table-to-xls" className="table table-hover">
              <thead
                className="thead-light"
                style={{ backgroundColor: "#2f3c4e" }}
              >
                <tr style={{ backgroundColor: "#f5f6f8" }}>
                  {/* <th scope="col">S. No</th> */}
                  <th scope="col">{TABLE_HEADERS[0].DashBoard.id} </th>
                  <th scope="col">{TABLE_HEADERS[0].DashBoard.name}</th>
                  <th scope="col">{TABLE_HEADERS[0].DashBoard.discription}</th>
                  <th scope="col">Action</th>

                </tr>
              </thead>
                {tableData !== null &&
                  tableData.length > 0
                  ? (
                    tableData.map((item, i) => {

                      return (
                        <tbody key={i}>
                          <tr>
                            {/* <td>{i + 1 + indexOfFirstRecord}</td> */}
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.discription}</td>
                            <td  style={{ textDecoration: "none" ,color: "#4466f2"}}>
                              <Link href={`/${item.id}`}>
                                <Edit2
                                  onClick={() => {
                                    null
                                  }}
                                />
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })
                  ) : (
                    <tbody>
                      <tr>
                        <td colSpan="12">No Record Found</td>
                      </tr>
                    </tbody>
                  )}
            </Table>
          </div>

          <div className={styles.dash_board_pagination}>
            <Pagination
              itemClass="page-item"
              linkClass="page-link"
              activePage={currentPage}
              itemsCountPerPage={recordPerPage}
              totalItemsCount={totalRecords}
              pageRangeDisplayed={pageRange}
              onChange={handlePageChange}
              firstPageText="First"
              lastPageText="Last"
            />
          </div>
        </div>
      </div>
          </Col>
       </Row>
      </Container>
    </>
  )
}

export default DashBoardView;
