import React, {
  Fragment,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import CustomTable from "../../../public/customTable";
import TabView from "../../catalog/tabView";
import { unstable_batchedUpdates } from "react-dom";
import { getAllBrands, getBrandById } from "../../../utility/apiUtility";
import PropertiesForm from "./propertiesForm";
import CustomModal from "../../../public/customModal";
import BrandForm from "./categoryForm";
import ToastComponenet from "../../../public/toastComponenet";
import PageLoader from "../../../public/pageLoader";
import PaginationView from "../../../public/paginationView";
import actions from "../../../../redux/action";
import Link from 'next/link'
import Breadcrumb from "../../../public/breadcrumb"
import styles from "./category.module.css";
// import CommonPaginationTable from "../../public/commonPaginationTable"
import TABLE_HEADERS  from "../../../public/tableHeader";
import Pagination from "react-js-pagination";
import { Edit2, Eye, Search, AlertCircle } from "react-feather";
import { Container, Form, Row, Col, Table, Button } from "react-bootstrap";

function classifyingCategory({ currentPgNo }) {
  const [list, setList] = useState({ content: [] });
  const [loading, setLoading] = useState(true);
  const [showBrandCreationForm, setShowBrandCreationForm] = useState(false);
  const [itemData, setItemData] = useState({});
  const toastRef = useRef(null);
  const [itemsCount, setItemsCount] = useState(null);
  const toastId = React.useRef(null);

  const getAllBrandsData = async (payload) => {
    !loading && setLoading(true);
    const apiRes = await getAllBrands(payload);
    if (apiRes === "err") {
    } else {
      unstable_batchedUpdates(() => {
        setList(apiRes.data);
        setItemsCount(apiRes.data.totalElements);
        setItemData({});
        setLoading(false);
      });
    }
  };
  const notify = (val) => {
    if (!toast.isActive(toastId.current)) {
      if (val) {
        toastId.current = toast("Brand Name added Successfully !!!");
      }
    }
  };
  const tabsList = useMemo(() => {
    const tabArr = [
      {
        id: "properties",
        title: "PROPERTIES",
        content: <PropertiesForm data={itemData} />,
      },
      { id: "attributes", title: "ATTRIBUTES", content: "" },
      { id: "multiCountryTab", title: "MULTICOUNTRY", content: "" },
      { id: "catalogSystem", title: "CATALOG SYSTEM", content: "" },
    ];
    return tabArr;
  }, [itemData]);

  const totalItems = useMemo(
    () => (
      <PaginationView
        totalProductCount={itemsCount}
        getListData={getAllBrandsData}
      />
    ),
    [itemsCount]
  );

  const getEachItemData = async (item) => {
    setItemData({});
    const apiRes = await getBrandById(item);
    if (apiRes === "err") {
    } else {
      setItemData(apiRes.data);
    }
  };

  useEffect(() => {
    getAllBrandsData({ pageSize: 10, pageNo: 0 });
    currentPgNo(0);
  }, []);

  const onBrandCreationSuccess = useCallback(() => {
    setShowBrandCreationForm(false);
    getAllBrandsData({ pageSize: 10, pageNo: 0 });
    toastRef.current.toastHandler({
      response: "suc",
      // position: "middle-center",
    });
  }, []);

  const tableHeadings = useMemo(() => {
    const arr = [
      { name: "Parent Category Id" },
      { name: "Category L1" },
      { name: "Category L2" },
      { name: "Category L3" },
      // { name: "Category L4" },
      // { name: "Category L5" },
      // { name: "Category L6" },
      // { name: "Category L7" },
      // { name: "Category L8" },
      // { name: "Category L9" },
      // { name: "Category L10" },
      { name: "Action" },
    ];
    return arr;
  }, []);

  const tableContent = (
    <Fragment>
      {list.content.map((item, index) => (
        <CatatlogListTd
          key={`BrndsListTd${index}${item.brandId}`}
          data={item}
          itemData={itemData}
          setItemData={getEachItemData}
        />
      ))}
    </Fragment>
  );

  const tableData = [];

  for (let i = 1; i <= 10; i++) {
    tableData.push({
      id: "11100"+i,
      Parent_Category_Id: "Parent Category Id" + i,
      CategoryL1: "Category" + (i),
      CategoryL2: "Category" + (i),
      CategoryL3: "Category" + (i),

    });
  }
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
    <Fragment>
      <ToastComponenet ref={toastRef} />
      <div className="row mx-0 font14">
        <div className="col-10 p-0">
        <Breadcrumb title="CATEGORY" parent="CATEGORY LIST" />

          {/* <div className="catelog-search font12 txt_gray">Search</div> */}
        </div>
        <div className="col-2 p-0 text-end align-self-center">
          <button
            onClick={() => setShowBrandCreationForm(true)}
            className="btn btn-sm btn-icons"
          >
            <img src="/icons/add.png" alt="add-icon" />
          </button>
        </div>
        <div className="card" style={{ borderRadius: "1rem" }}>
        <div className="card-body">
          <div className="table-responsive">
            <Table id="table-to-xls" className="table table-hover">
              <thead
                className="thead-light"
                style={{ backgroundColor: "#2f3c4e" }}
              >
                <tr style={{ backgroundColor: "#f5f6f8" }}>
                  <th scope="col">S. No</th>
                  <th scope="col">{TABLE_HEADERS[0].Catergory.id} </th>
                  <th scope="col">{TABLE_HEADERS[0].Catergory.Parent_Category_Id}</th>
                  <th scope="col">{TABLE_HEADERS[0].Catergory.CategoryL1}</th>
                  <th scope="col">{TABLE_HEADERS[0].Catergory.CategoryL2}</th>
                  <th scope="col">{TABLE_HEADERS[0].Catergory.CategoryL3}</th>
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
                            <td>{i + 1 + indexOfFirstRecord}</td>
                            <td>{item.id}</td>
                            <td>{item.Parent_Category_Id}</td>
                            <td>{item.CategoryL1}</td>
                            <td>{item.CategoryL2}</td>
                            <td>{item.CategoryL3}</td>
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
        {/* {loading ? (
          <PageLoader />
        ) : ( */}
          {/* <CustomTable
            tableName="product-list"
            head={tableHeadings}
            content={tableContent}
            totalPages={list.totalPages}
            tableContainarClass="my-3 catalog-list"
          /> */}
        {/* )} */}
        {itemsCount && totalItems}
      </div>
      {Object.entries(itemData).length !== 0 && (
        <TabView
          id={itemData.name}
          tabsList={tabsList}
          data={itemData}
          setItemData={setItemData}
        />
      )}

      <CustomModal
        show={showBrandCreationForm}
        closeModal={() => setShowBrandCreationForm(false)}
        size="md"
        centered={true}
        body={
          <BrandForm
            classModal={() => setShowBrandCreationForm(false)}
            onSuccess={onBrandCreationSuccess}
            notifySucess={() => notify(true)}
          />
        }
      />
      <ToastContainer />
    </Fragment>
  );
}

function CatatlogListTd({ data, itemData, setItemData }) {
  return (
    <Fragment>
      <tr>
        <td>
          <input
            type="checkbox"
            checked={itemData.brandId === data.brandId}
            name={data.brandId}
            onChange={() => setItemData(data)}
          />
          <span>{data.name}</span>
        </td>
        <td>{data.brandOwner}</td>
        <td>{data.version}</td>
        <td>{data.modifiedAt}</td>
      </tr>
    </Fragment>
  );
}

const mapDispatchToProps = {
  currentPgNo: actions.currentPgNo,
};
export default connect(
  null,
  mapDispatchToProps
)(React.memo(classifyingCategory));
