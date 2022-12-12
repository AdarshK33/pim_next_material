import React, { Fragment, useMemo, useState,useCallback} from "react";
// import { Table } from "react-bootstrap";
// import PaginationView from "./paginationView";
import Pagination from "react-js-pagination";
import { Edit2, Eye, Search, AlertCircle } from "react-feather";
import { Container, Form, Row, Col, Table, Button } from "react-bootstrap";
import Link from 'next/link'
import styles from "./common.module.css";
import CustomModal from "./customModal";

function CommonPaginationTable({
 header,
 tableData,
 indexOfFirstRecord,
 currentPage,
 recordPerPage,
 totalRecords,
 pageRange,
 handlePageChange
 
}) {
  // console.log("hello props", currentPage,
  // recordPerPage,
  // totalRecords,
  // pageRange,
  //   )
  
  return (
    <>
     <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <Table id="table-to-xls" className="table table-hover">
              <thead
                className="thead-light"
                style={{ backgroundColor: "#2f3c4e" }}
              >
                <tr style={{ backgroundColor: "#f5f6f8" }}>
                  <th scope="col">S. No</th>
                  <th scope="col">{header?.id}</th>
                  <th scope="col">{header?.name}</th>
                  <th scope="col">{header?.discription}</th>
                  <th scope="col">{header?.action}</th>

                </tr>
              </thead>
                {tableData !== null &&
                  tableData?.length > 0
                  ? (
                    tableData.map((item, i) => {

                      return (
                        <tbody key={i}>
                          <tr>
                            <td>{i + 1 + indexOfFirstRecord}</td>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.discription}</td>
                            <td  style={{ textDecoration: "none" ,color: "#4466f2"}}>
                              {/* <Link href={`/${item.id}`}> */}
                                <Edit2
                                  onClick={() => {
                                   null;
                                  }}
                                />
                              {/* </Link> */}
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

          
          <div className={styles.pagination}>
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
    </>
  );
}

export default CommonPaginationTable;
