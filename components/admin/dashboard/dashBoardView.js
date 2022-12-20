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
     <div className="row mx-0 font14">
          {/* <Breadcrumb title="DASHBOARD" parent="DASHBOARD LIST" /> */}
          <div className="card" style={{ borderRadius: "1rem" }}>
        <div className="card-body">
             <div className="w-100 row mx-0 p-0">
                <img src="/dashBoard1.png" alt="dashBoard1" className="p-0 mb-3" />
                <div className="col-md-4 ps-md-0 pe-md-5">
                    <img src="/dashBoard2.png" alt="dashBoard2" width="100%" />
                </div>
                <div className="col-md-4 ps-md-0 pe-md-5">
                    <img src="/dashBoard3.png" alt="dashBoard3" width="100%" />
                </div>
                <div className="col-md-4 pe-md-0 ps-md-5">
                    <img src="/dashBoard4.png" alt="dashBoard4" width="100%" />
                </div>
            </div>
            </div>
            </div>
       </div>
    </>
  )
}

export default DashBoardView;
