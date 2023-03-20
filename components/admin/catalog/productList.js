import React, { Fragment,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef, } from "react";
import Link from 'next/link';
import { connect } from "react-redux";
import { getAllProducts, getProductById } from "../../utility/apiUtility";
import CustomTable from "../../public/customTable";
import TabView from "./tabView";
import Pagination from "react-js-pagination";
import { unstable_batchedUpdates } from "react-dom";
import AttributesForm from "./attributesForm";
import VendorForm from "./vendorForm";
import PageLoader from "../../public/pageLoader";
import PaginationView from "../../public/paginationView";
import actions from "../../../redux/action";
import Image from 'next/image';
import styles from "./catelog.module.css";
import TABLE_HEADERS  from "../../public/tableHeader"
import marker from "../../../assets/icons/marker 1.svg";
import CustomModal from "../../public/customModal";
import download from "../../../assets/icons/download.svg";
import { ToastContainer, toast } from "react-toastify";
import FormikControl from "../../public/formik/formikControl";
import { DatePicker, Space } from 'antd';
import calendar from "../../../assets/icons/calendar.svg";
import {  getAllProductApi } from "../../../redux/actions/catalogQuery";//testing
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

function ProductList({ currentPgNo }) {
  const [productList, setProductList] = useState({ content: [] });
  const [loading, setLoading] = useState(true);
  const [itemData, setItemData] = useState({});
  const [itemsCount, setItemsCount] = useState(null);
  const [showBrandCreationForm, setShowBrandCreationForm] = useState(false);
 const [currentPage, setCurrentPage] = useState(0);
 const [productDataList, setProductDataList] = useState();

 
 const router = useRouter();
  const dispatch = useDispatch();

  const selectOpts = [
    { value: "Brand 1", label: "xyz" },
    { value: "Brand 2", label: "Brand 2" },
    { value: "Brand 3", label: "Brand 3  " },
  ];

  
  // const { loginUser } = useSelector(({app}) => {
  //   console.log("hello app",app)
  //   return {loginUser: app?.loggedIn,};
  // });
  
  // console.log("hello productDataList",productDataList)
  
  useEffect(() => {
    dispatch(getAllProductApi(currentPage,10)); //testing
}, [currentPage]);

const { allProductData } = useSelector(state => {
  // console.log("hello",state)
  return state.catalogQueryReducer;
});
  
  console.log("hello allProductData",allProductData.content)

  useEffect(() => {
    if (
      allProductData  &&
      allProductData !== null &&
      allProductData !== undefined &&
      Object.keys( allProductData).length !== 0

    ) {
    const res = Object.entries(allProductData?.content[0] )
 
    const DataList = [];
   
        res.map(data =>{
            console.log("data 1",data)
    
            const newObj = {};
            newObj.pimCode = data[0]
            // data[0].forEach(column =>{
            //   newObj[column.keyName] = column.value;
            // }) 
          data[1].forEach(column =>{
            newObj[column.keyName] = column.value;
          }) 
          
          DataList.push(newObj);
          
    
        })
          // console.log(" pim code productDataList",DataList)
           setProductDataList(DataList)
      }
}, [allProductData]);
  
  

  useEffect(() => {
    getAllProductData({ pageSize: 10, pageNo: 0 });
    currentPgNo(0);
  }, []);

  const onBrandCreationSuccess = useCallback(() => {
    setShowBrandCreationForm(false);
    getAllProducts({ pageSize: 10, pageNo: 0 });
    toastRef.current.toastHandler({
      response: "suc",
      // position: "middle-center",
    });
  }, []);


  const getAllProductData = async (payload) => {
    !loading && setLoading(true);
    const apiRes = await getAllProducts(payload);
    if (apiRes === "err") {
    } else {
      unstable_batchedUpdates(() => {
        setProductList(apiRes.data);
        setItemsCount(apiRes.data.totalElements);
        setItemData({});
        setLoading(false);
      });
    }
  };
  const tabsList = useMemo(() => {
    const tabArr = [
      {
        id: "AttributesTab",
        title: "ATTRIBUTES",
        content: (
          <AttributesForm
            data={itemData}
            getAllProductData={getAllProductData}
            show={Object.entries(itemData).length > 0}
          />
        ),
      },
      { id: "VendorTab", title: "VENDOR", content: <VendorForm />, show: true },
      { id: "multiCountryTab", title: "MULTICOUNTRY", content: "" },
      { id: "catagorySystemsTab", title: "CATAGORY SYSTEMS", content: "" },
      { id: "pricesTab", title: "PRICES", content: "" },
      { id: "multimediaTab", title: "MULTIMEDIA", content: "" },
      { id: "reviewsTab", title: "REVIEWS", content: "" },
    ];

    return tabArr;
  }, [itemData]);

   //   /*-----------------Pagination------------------*/
 const recordPerPage = 10;
const totalRecords = allProductData?.totalElements;
 const pageRange = 10;
 const indexOfLastRecord = currentPage * recordPerPage;
 const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
 const currentRecords = productDataList;

 const handlePageChange = pageNumber => {
  // console.log("hello pageNumber",pageNumber-1)
   setCurrentPage(pageNumber-1);
 }
 /*-----------------Pagination------------------*/
  const totalItems = useMemo(
    () => (
      <PaginationView
        totalProductCount={itemsCount}
        getListData={getAllProductData}
      />
    ),
    [itemsCount]
  );

  const getEachItemData = async (item) => {
    setItemData({});
    const apiRes = await getProductById(item.productId);
    if (apiRes.data) {
      setItemData(apiRes.data);
    }
  };

  const tableData = [];

  for (let i = 1; i <= 10; i++) {
    tableData.push({
      id: "11100"+i,
      name: "Brand" + i,
      discription: "discription" + (i),
    });
  }

  const tableHeadings = useMemo(() => {
    const arr = [
      { name: "Image" },
      { name: "Product Name" },
      { name: "SKU" },
      { name: "Brand" },
      { name: "Channels" },
      { name: "Category" },
      { name: "Sub-Category" },
      { name: "Status" },
      { name: "" },
    ];
    return arr;
  }, []);

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const tableContent = (
    <Fragment>
      {productList.content.map((item, index) => (
        <ProductListTd
          key={`productListTd${index}${item.itemCode}`}
          data={item}
          itemData={itemData}
          setItemData={getEachItemData}
        />
      ))}
    </Fragment>
  );
  const bulkUploadNavigate = () => {
    //  redirect to bulk page
    router.push("/pim/bulkUpload?list=bulkUpload");
  };

  return (
    <Fragment>
     <div className={`row mx-0 font14 ${styles.listing_space}`}>
        <div className="col-10 p-0">
        {/* <Breadcrumb title="Brand" parent="BRAND LIST" /> */}
        <p className={styles.brand_title_name}>Products</p>
          {/* <div className="catelog-search font12 txt_gray">Search</div> */}
        </div>
        <div className={`col-2 p-3 text-end align-self-center ${styles.set_laptop_right}`}>
          <button
            // onClick={() => setShowBrandCreationForm(true)}
           
            onClick={() => bulkUploadNavigate()} //  redirect to bulk page

            className={`btn btn-sm ${styles.add_bulk_button_text}`}

          >
            {/* <img src="/icons/add.png" alt="add-icon" /> */}
            + Bulk Upload
          </button>
        </div>

        <div className={`col-10 p-0 ${styles.calender_section}`}>
        <div className="row">
          <div className="col-2 sidebar_blk">
          <DatePicker className="date_picker_style" onChange={onChange} />
          <div className="calender_blk_p">
          <Image
            className="px-2"
            src={calendar}
            alt="calendar"
            width={30}
            height={25}
            />
          </div>
          </div>
          <div className="col-2 sidebar_blk">
          <DatePicker className="date_picker_style" onChange={onChange} />
          <div className="calender_blk_p">
          <Image
            className="px-2"
            src={calendar}
            alt="calendar"
            width={30}
            height={25}
            />
          </div>
          </div>
          <div className="col-2">
            <FormikControl
              control="reactSelect"
              selectOpts={selectOpts}
              placeholder="Brand"
              isMulti={true}
            />
          </div>
          <div className="col-2">
            <FormikControl
              control="reactSelect"
              selectOpts={selectOpts}
              placeholder="Channel"
              isMulti={false}
            />
          </div>
          <div className="col-2">
            <FormikControl
              control="reactSelect"
              selectOpts={selectOpts}
              placeholder="Category"
              isMulti={false}
            />
          </div>
        </div>
        </div>
        <div className={`col-2 p-3 text-end align-self-center d-flex ${styles.button_add}`}>
        <div className={`${styles.download_left}`}>
            <Image
              className="px-2"
							src={download}
							alt="download"
              width={40}
							height={35}
              // onClick={() => {
              //   setShowBrandCreationForm(true)
              // }}
              /></div>
          <button
            onClick={() => setShowBrandCreationForm(true)}
            className={`btn btn-sm ${styles.add_button_text}`}

          >
            {/* <img src="/icons/add.png" alt="add-icon" /> */}
             Download CSV
              
          </button>
        </div>

        <div></div>

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
                  <th scope="col">{TABLE_HEADERS[0].Product.image}</th>
                  <th scope="col">{TABLE_HEADERS[0].Product.productName}</th>
                  <th scope="col">{TABLE_HEADERS[0].Product.sku}</th>
                  <th scope="col">{TABLE_HEADERS[0].Product.brand}</th>
                  <th scope="col">{TABLE_HEADERS[0].Product.channels}</th>
                  <th scope="col">{TABLE_HEADERS[0].Product.category}</th>
                  <th scope="col">{TABLE_HEADERS[0].Product.subcategory}</th>
                  <th scope="col">{TABLE_HEADERS[0].Product.status}</th>
                  <th scope="col">Action</th>

                </tr>
              </thead>
                {productDataList !== null &&
                  productDataList?.length > 0
                  ? (
                    productDataList.map((item, i) => {
                    //  console.log("mmmmmmmmmmmmmmmmm",item)
                      return (
                        <tbody style={{borderTop: "0px"}}
                        
                    key={i}>
                          <tr>
                            {/* <td>{i + 1 + indexOfFirstRecord}</td> */}
                            {/* <td>{item}</td> */}
                            <td>{item.image??'NA'}</td>
                            <td>{item.productName??'NA'}</td>
                            <td>{item.sku??'NA'}</td>
                            <td>{item.brand}</td>
                            <td>{item.channels??'NA'}</td>
                            <td>{item.category??'NA'}</td>
                            <td>{item.subcategory??'NA'}</td>
                            <td>{item.status??'NA'}</td>

                            <td  style={{ textDecoration: "none" ,color: "#4466f2"}}>
                              <Link href={`/catalog/product?list=productDetails/${item.pimCode}/${item.brand}`}>
                            <Image
                              className="px-2"
							                src={marker}
							                alt="edit"
                              width={35}
							                height={30}
                              onClick={() => {
                                setShowBrandCreationForm(true)
                              }}
						                  />
                              {/* <marker
                                  onClick={() => {
                                    setShowBrandCreationForm(true)
                                  }}
                                /> */}
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
      /> */}

        {itemsCount && totalItems}
      </div>
      {Object.entries(itemData).length !== 0 && (
        <TabView
          tabsList={tabsList}
          data={itemData}
          id={itemData.name}
          setItemData={setItemData}
        />
      )}

{/* <CustomModal
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
      /> */}
     <ToastContainer />
    </Fragment>
  );
}

function ProductListTd({ data, itemData, setItemData }) {
  return (
    <Fragment>
      <tr>
        <td>
          <input
            type="checkbox"
            checked={itemData.productId === data.productId}
            name={data.articleNumber}
            onChange={() => setItemData(data)}
          />
          <span>{data.articleNumber}</span>
        </td>
        <td>{data.categories.c3}</td>
        <td>{data.name}</td>
        <td>{data.version}</td>
        <td>{data.modifiedAt}</td>
      </tr>
    </Fragment>
  );
}

const mapDispatchToProps = {
  currentPgNo: actions.currentPgNo,
};
export default connect(null, mapDispatchToProps)(React.memo(ProductList));
