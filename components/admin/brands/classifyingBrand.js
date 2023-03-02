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
import  UpdateBrandForm from "./updateBrandForm";
import { useDispatch, useSelector } from "react-redux";
import {  getBrandListApi ,getBrandByIdApi} from "../../../redux/actions/onboardQuery";
import Image from 'next/image';


import marker from "../../../assets/icons/marker 1.svg";


function classifyingBrand({ currentPgNo }) {
  const [list, setList] = useState({ content: [] });
  const [loading, setLoading] = useState(true);
  const [showBrandCreationForm, setShowBrandCreationForm] = useState(false);
  const [showBrandUpdateForm, setShowBrandUpdateForm] = useState(false);
  const [brandUpdateID, setBrandUpdateID] = useState();
 const [currentPage, setCurrentPage] = useState(0);


  const [itemData, setItemData] = useState({});
  const toastRef = useRef(null);
  const [itemsCount, setItemsCount] = useState(null);
  const toastId = React.useRef(null);
  const dispatch = useDispatch();
  const [getData, setGetData] = useState({"pageNumber":"1","pageSize":"10"});

  const handleEdit = (brandId)=> {
      // console.log(brandId,"hello item.brandId")
      setShowBrandUpdateForm(true),
      // setBrandUpdateID(item.brandId)
      dispatch( getBrandByIdApi(brandId)) 
  }
// const { loginUser } = useSelector(({app}) => {
//   console.log("hello app",app)
//   return {loginUser: app?.loggedIn,};
// });

// console.log("hello bbbbbbbbbbbbbbbbb",loginUser)

const { brandGet } = useSelector(state => {
  // console.log("hello",state)
  return state.onBoardQueryReducer;
});

useEffect(() => {
    // if(currentPage){
    dispatch(getBrandListApi(currentPage,5));
    // }
}, []);

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

  // useEffect(() => {
  //   getAllBrandsData({ pageSize: 10, pageNo: 0 });
  //   currentPgNo(0);
  // }, []);

  const onBrandCreationSuccess = useCallback(() => {
    setShowBrandCreationForm(false);
    setShowBrandUpdateForm(false)
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


 //   /*-----------------Pagination------------------*/
 const recordPerPage = 5;
 const totalRecords = 20;
 const pageRange = 5;
 const indexOfLastRecord = currentPage * recordPerPage;
 const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
 const currentRecords = brandGet;

 const handlePageChange = pageNumber => {
  // console.log(pageNumber,"ppppppppppppppp")
   setCurrentPage(pageNumber);
   dispatch(getBrandListApi(pageNumber-1,5));
 }
 /*-----------------Pagination------------------*/

  return (
    <Fragment>
      <ToastComponenet ref={toastRef} />
      <div className={`row mx-0 font14 ${styles.listing_space}`}>
        <div className="col-10 p-0">
        {/* <Breadcrumb title="Brand" parent="BRAND LIST" /> */}
        <p className={styles.brand_title_name}>Brands</p>
          {/* <div className="catelog-search font12 txt_gray">Search</div> */}
        </div>
        
        <div className="col-2 p-3 text-end align-self-center">
          <button
            onClick={() => setShowBrandCreationForm(true)}
            className={`btn btn-sm ${styles.add_button_text}`}

          >
            {/* <img src="/icons/add.png" alt="add-icon" /> */}
            + Add New
          </button>
        </div>

        <div className="card p-0" style={{ borderRadius: "1rem" }}>
        <div className="card-body p-0">
          <div className={`table-responsive ${styles.listing_border}`}>
            <table id="table-to-xls" className="table" >
              <thead
                className="thead-light"
                style={{ backgroundColor: "#2f3c4e" }}
              >
                <tr style={{ backgroundColor: "#f5f6f8" }}>
                  {/* <th scope="col">S. No</th> */}
                  {/* <th scope="col">{TABLE_HEADERS[0].Brand.id} </th> */}
                  <th scope="col">{TABLE_HEADERS[0].Brand.name}</th>
                  <th scope="col">{TABLE_HEADERS[0].Brand.discription}</th>
                  <th scope="col">{TABLE_HEADERS[0].Brand.email}</th>
                  <th scope="col">{TABLE_HEADERS[0].Brand.contact}</th>
                  <th scope="col">{TABLE_HEADERS[0].Brand.category}</th>
                  <th scope="col">{TABLE_HEADERS[0].Brand.sku}</th>
                  <th scope="col">{TABLE_HEADERS[0].Brand.status}</th>
                  <th scope="col">{TABLE_HEADERS[0].Brand.action}</th>

                </tr>
              </thead>
                {currentRecords !== null &&
                  currentRecords.length > 0
                  ? (
                    currentRecords.map((item, i) => {
                    
                      return (
                        <tbody style={{borderTop: "0px"}}
                        
                              key={i}>
                          <tr>
                            {/* <td>{i + 1 + indexOfFirstRecord}</td> */}
                            {/* <td>{item.brandName}</td> */}
                            <td>{item.brandName}</td>
                            <td>{item.description}</td>
                            <td>{item.email}</td>
                            <td>{item.contactPerson}</td>
                            <td>{item.totalCategories}</td>
                            <td>{item.totalSKUs}</td>
                            <td>{item?.status === "Active" ? "Active" : "In-Active"}</td>
                            <td  style={{ textDecoration: "none" ,color: "#4466f2"}}>
                              {/* <Link href={`/dashboard/brands?list=brands_categories/${item.brandId}`}> */}
                            <Image
                              className="px-2"
							                src={marker}
							                alt="edit"
                              width={35}
							                height={30}
                              onClick={()=>handleEdit(item.brandId)}
						                  />

                          <CustomModal
                                      show={showBrandUpdateForm}
                                      closeModal={() => 
                                        setShowBrandUpdateForm(false)
                                      }

                                      
                                      size="md"
                                      centered={true}
                                      body={
                                        <UpdateBrandForm
                                          table={TABLE_HEADERS[0].Brand.table}
                                          classModal={() => setShowBrandUpdateForm(false)}
                                          onSuccess={onBrandCreationSuccess}
                                          notifySucess={() => notify(true)}
                                        />
                                  }
                                />
                              {/* <marker
                                  onClick={() => {
                                    setShowBrandCreationForm(true)
                                  }}
                                /> */}
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
            </table>
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
        {/* <CustomModal
            show={showBrandUpdateForm}
            closeModal={() => setShowBrandUpdateForm(false,(item._id))}
            size="md"
            centered={true}
            body={
              <UpdateBrandForm
                table={TABLE_HEADERS[0].Brand.table}
                classModal={() => setShowBrandUpdateForm(false)}
                onSuccess={onBrandCreationSuccess}
                notifySucess={() => notify(true)}
              />
        }
      /> */}

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
