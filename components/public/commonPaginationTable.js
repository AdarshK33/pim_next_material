import React, { Fragment, useMemo, useState,useCallback} from "react";
// import { Table } from "react-bootstrap";
// import PaginationView from "./paginationView";
import Pagination from "react-js-pagination";
import { Edit2, Eye, Search, AlertCircle } from "react-feather";
import { Container, Form, Row, Col, Table, Button } from "react-bootstrap";
import Link from 'next/link'
import styles from "./common.module.css";
import CustomModal from "./customModal";

import CommonUpdateForm from "../public/commonUpdateForm"
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
  // console.log("hello props",header, currentPage,
  // recordPerPage,
  // totalRecords,
  // pageRange,
  //   )
  const [list, setList] = useState({ content: [] });
  const [loading, setLoading] = useState(true);
  const [showBrandCreationForm, setShowBrandCreationForm] = useState(false);
  const [itemData, setItemData] = useState({});
  // const toastRef = useRef(null);
  const [itemsCount, setItemsCount] = useState(null);

  const getAllBrandsData = async (payload) => {
   
  };
 
  const onBrandCreationSuccess = useCallback(() => {
    setShowBrandCreationForm(false);

  }, []);

  const notify = (val) => {
    if (!toast.isActive(toastId.current)) {
      if (val) {
        toastId.current = toast(`${header.table} Name added Successfully !!!"`);
      }
    }
  };

  return (
    <>
     <div className="card"    style={{ borderRadius: "1rem" }}>
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
                  tableData?.length > 0 ?
                  (
                      tableData.map((item, i) => {

                      return (
                        <tbody key={i}>
                        
                        <td>{i + 1 + indexOfFirstRecord}</td>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.discription}</td>
                            <td  style={{ textDecoration: "none" ,color: "#4466f2"}}>
                              {/* <Link href={`/${item.id}`}> */}
                                <Edit2
                                  // onClick={() => {
                                  //  null;
                                  // }}
                                  onClick={() => setShowBrandCreationForm(true)}
                                
                                />
                              {/* </Link> */}
                            </td>
                        </tbody>
                      );
                    })
                  )
                  : (
                    <tbody>
                      <tr>
                        <td colSpan="12">No Record Found</td>
                      </tr>
                    </tbody>
                  )
                  }
            </Table>
          </div>
          <CustomModal
            show={showBrandCreationForm}
            closeModal={() => setShowBrandCreationForm(false)}
            size="md"
            centered={true}
            body={
              <CommonUpdateForm
                table={header.table}
                classModal={() => setShowBrandCreationForm(false)}
                onSuccess={onBrandCreationSuccess}
                notifySucess={() => notify(true)}
              />
        }
      />
          
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
