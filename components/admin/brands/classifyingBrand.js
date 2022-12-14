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
import CustomTable from "../../public/customTable";
import TabView from "../catalog/tabView";
import { unstable_batchedUpdates } from "react-dom";
import { getAllBrands, getBrandById } from "../../utility/apiUtility";
import PropertiesForm from "./propertiesFormBrand";
import CustomModal from "../../public/customModal";
import BrandForm from "./brandForm";
import ToastComponenet from "../../public/toastComponenet";
import PageLoader from "../../public/pageLoader";
import PaginationView from "../../public/paginationView";
import actions from "../../../redux/action";
import Link from 'next/link'
import Breadcrumb from "../../public/breadcrumb"
import styles from "./brand.module.css";
// import CommonPaginationTable from "../../public/commonPaginationTable"
import TABLE_HEADERS  from "../../public/tableHeader";
import Pagination from "react-js-pagination";
import { Edit2, Eye, Search, AlertCircle } from "react-feather";
import { Container, Form, Row, Col, Table, Button } from "react-bootstrap";
import  CommonUpdateForm from "../../public/commonUpdateForm";
import { useDispatch, useSelector } from "react-redux";
import { createBrandApi, getBrandApi } from "../../../redux/actions/brand";


function classifyingBrand({ currentPgNo }) {
  const [list, setList] = useState({ content: [] });
  const [loading, setLoading] = useState(true);
  const [showBrandCreationForm, setShowBrandCreationForm] = useState(false);
  const [itemData, setItemData] = useState({});
  const toastRef = useRef(null);
  const [itemsCount, setItemsCount] = useState(null);
  const toastId = React.useRef(null);
  const dispatch = useDispatch();


let dataObj={
  "brandId": 0,
  "brandName": "Avasaa321",
  "brandNo": 0,
  "address": "OMBR",
  "contactPerson": "sai",
  "emailId": "sai@gmail.com",
  "mobile": "8743698546",
  "imageUrl": "string",
  "brandShortcode": "string",
  "version": 0,
  "createdBy": "string",
  "updatedBy": "string"

}
  useEffect(() => {
    //  dispatch(createBrandApi(dataObj));
    dispatch(getBrandApi());
   
  }, []);

  const { isLogin } = useSelector(state => {
    console.log("hello state",state)
		return state.brandReducer;
	});
console.log("hello brandGet",isLogin)
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
      { name: "Brand Id" },
      { name: "Brand Name" },
      { name: "Discription" },
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
      name: "Brand" + i,
      discription: "discription" + (i),
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
        <Breadcrumb title="BRAND" parent="BRAND LIST" />

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
                  <th scope="col">{TABLE_HEADERS[0].Brand.id} </th>
                  <th scope="col">{TABLE_HEADERS[0].Brand.name}</th>
                  <th scope="col">{TABLE_HEADERS[0].Brand.discription}</th>
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
                            <td>{item.name}</td>
                            <td>{item.discription}</td>
                            <td  style={{ textDecoration: "none" ,color: "#4466f2"}}>
                              {/* <Link href={`/${item.id}`}> */}
                                <Edit2
                                  onClick={() => {
                                    setShowBrandCreationForm(true)
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
        <CustomModal
            show={showBrandCreationForm}
            closeModal={() => setShowBrandCreationForm(false)}
            size="md"
            centered={true}
            body={
              <CommonUpdateForm
                table={TABLE_HEADERS[0].Brand.table}
                classModal={() => setShowBrandCreationForm(false)}
                onSuccess={onBrandCreationSuccess}
                notifySucess={() => notify(true)}
              />
        }
      />

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
)(React.memo(classifyingBrand));
