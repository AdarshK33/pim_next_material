import React, {
  Fragment,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { connect } from "react-redux";
import { getAllProducts, getProductById } from "../../utility/apiUtility";
import CustomTable from "../../public/customTable";
import TabView from "../catalog/tabView";
import Pagination from "react-js-pagination";
import { unstable_batchedUpdates } from "react-dom";
import PageLoader from "../../public/pageLoader";
import PaginationView from "../../public/paginationView";
import actions from "../../../redux/action";
import Image from "next/image";
import styles from "./upload.module.css";
import TABLE_HEADERS from "../../public/tableHeader";
import download from "../../../assets/icons/download.svg";
import CustomModal from "../../public/customModal";
import { ToastContainer, toast } from "react-toastify";
import FormikControl from "../../public/formik/formikControl";
import { DatePicker, Space } from "antd";
import calendar from "../../../assets/icons/calendar.svg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Dropzone from 'react-dropzone';
import { createBulkApi } from "../../../redux/actions/bulk";

function BulkUpload({ currentPgNo }) {
  const [productList, setProductList] = useState({ content: [] });
  const [loading, setLoading] = useState(true);
  const [itemData, setItemData] = useState({});
  const [itemsCount, setItemsCount] = useState(null);
  const [showBrandCreationForm, setShowBrandCreationForm] = useState(false);

  const [template, setTemplate] = useState('');

  const selectOpts = [
    { value: "Brand 1", label: "xyz" },
    { value: "Brand 2", label: "Brand 2" },
    { value: "Brand 3", label: "Brand 3  " },
  ];

  // useEffect(() => {
  //   getAllProductData({ pageSize: 10, pageNo: 0 });
  //   currentPgNo(0);
  // }, []);

  const onBrandCreationSuccess = useCallback(() => {
    setShowBrandCreationForm(false);
    getAllProducts({ pageSize: 10, pageNo: 0 });
    toastRef.current.toastHandler({
      response: "suc",
      // position: "middle-center",
    });
  }, []);

  const handleClick = () => {
    setShowBrandCreationForm(true)
    axios.get('http://apollo-sync-query-handler.theretailinsightsdemos.com/api/v1/sync/template', {
      responseType: "blob",
      headers: {
        "Content-Type": "application/zip"
      }
    })
      .then((response) => {
        setTemplate(response.data)
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'template.zip');
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => console.error(err))
  }

  const onDrop = (acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append('file', file);
    });
    axios
      .post('http://sync-command-handler.theretailinsightsdemos.com/api/v1/sync/bulk', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        // console.log(response);
        alert('File uploaded')
      })
      .catch((error) => {
        console.log(error);
      });
  };


  // const { loginUser } = useSelector(({app}) => {
  //   console.log("hello app",app)
  //   return {loginUser: app?.loggedIn,};
  // });

  // console.log("hello bbbbbbbbbbbbbbbbb",loginUser)
  // const getAllProductData = async (payload) => {
  //   !loading && setLoading(true);
  //   const apiRes = await getAllProducts(payload);
  //   if (apiRes === "err") {
  //   } else {
  //     unstable_batchedUpdates(() => {
  //       setProductList(apiRes.data);
  //       setItemsCount(apiRes.data.totalElements);
  //       setItemData({});
  //       setLoading(false);
  //     });
  //   }
  // };

  //   /*-----------------Pagination------------------*/
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const totalRecords = tableData?.length;
  const pageRange = 10;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = tableData;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  /*-----------------Pagination------------------*/
  // const totalItems = useMemo(
  //   () => (
  //     <PaginationView
  //       totalProductCount={itemsCount}
  //       getListData={getAllProductData}
  //     />
  //   ),
  //   [itemsCount]
  // );

  // const getEachItemData = async (item) => {
  //   setItemData({});
  //   const apiRes = await getProductById(item.productId);
  //   if (apiRes.data) {
  //     setItemData(apiRes.data);
  //   }
  // };

  const tableData = [];

  for (let i = 1; i <= 10; i++) {
    tableData.push({
      id: "11100" + i,
      name: "Brand" + i,
      discription: "discription" + i,
    });
  }

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  // const tableContent = (
  //   <Fragment>
  //     {productList.content.map((item, index) => (
  //       <ProductListTd
  //         key={`productListTd${index}${item.itemCode}`}
  //         data={item}
  //         itemData={itemData}
  //         setItemData={getEachItemData}
  //       />
  //     ))}
  //   </Fragment>
  // );

  return (
    <Fragment>
      <div className={`row mx-0 font14 ${styles.listing_space}`}>
        <div className="col-12 p-0">
          {/* <Breadcrumb title="Brand" parent="BRAND LIST" /> */}
          <p className={styles.brand_title_name}>Bulk Upload</p>
          {/* <div className="catelog-search font12 txt_gray">Search</div> */}
        </div>

        <div className="row pb-2">
          <div className="col-8 p-0">
            <div className="row">
              <div className="col-2 sidebar_blk">
                <DatePicker className="date_picker_style" onChange={onChange} />
                <div className="calender_blk">
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
                <div className="calender_blk">
                  <Image
                    className="px-2"
                    src={calendar}
                    alt="calendar"
                    width={30}
                    height={25}
                  />
                </div>
              </div>
              <div className={`col-2 ${styles.dropdown_select}`}>
                <FormikControl
                  control="reactSelect"
                  selectOpts={selectOpts}
                  placeholder="Brand"
                  isMulti={true}
                />
              </div>
              <div className={`col-2 ${styles.dropdown_select}`}>
                <FormikControl
                  control="reactSelect"
                  selectOpts={selectOpts}
                  placeholder="Channel"
                  isMulti={false}
                />
              </div>
            </div>
          </div>
          <div
            className={`col-2 p-3 text-end align-self-center d-flex  ${styles.set_laptop_right}`}
          >
            <div>
              <Image
                className="px-2"
                src={download}
                alt="download"
                width={40}
                height={35}
              // onClick={() => {
              //   setShowBrandCreationForm(true)
              // }}
              />
            </div>
            <button
              onClick={() => setShowBrandCreationForm(true)}
              className={`btn btn-sm ${styles.add_button_text}`}
            >
              {/* <img src="/icons/add.png" alt="add-icon" /> */}
              Download Masters
            </button>
          </div>

          <div
            className={`col-2 p-3 text-end align-self-center d-flex ${styles.set_laptop_right}`}
          >
            <div>
              <Image
                className="px-2"
                src={download}
                alt="download"
                width={40}
                height={35}
                onClick={handleClick}
              />
            </div>
            <button
              onClick={handleClick}
              className={`btn btn-sm ${styles.add_button_text}`}
            >
              {/* <img src="/icons/add.png" alt="add-icon" /> */}
              Download Template
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-12 px-0">
            <div className="pb-3 bulk_upload_style" style={{ border: '2px dashed black', margin: '15px 0px', padding: '0px 0px', background: 'rgba(195,218,217,.69)', textAlign: 'center' }}>
              {/* <FormikControl
                control="dropZone"
                name="catalog_name"
                placeholder="Upload your documnet"
                // setFieldValue={setFieldValue}
                onClick={postFile}
              /> */}
              <Dropzone onDrop={onDrop}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {

                    }
                    <p>Drag and drop a file here, or click to select file</p>
                  </div>
                )}
              </Dropzone>
            </div>
          </div>
        </div>
        <div className="card p-0" style={{ borderRadius: "1rem" }}>
          <div className="card-body p-0">
            <div className={`table-responsive ${styles.listing_border}`}>
              <table id="table-to-xls" className="table">
                <thead
                  className="thead-light"
                  style={{ backgroundColor: "#2f3c4e" }}
                >
                  <tr style={{ backgroundColor: "#f5f6f8" }}>
                    {/* <th scope="col">S. No</th> */}
                    {/* <th scope="col">{TABLE_HEADERS[0].Brand.id} </th> */}
                    <th scope="col">{TABLE_HEADERS[0].BulkUpload.name}</th>
                    <th scope="col">
                      {TABLE_HEADERS[0].BulkUpload.uploadedby}
                    </th>
                    <th scope="col">
                      {TABLE_HEADERS[0].BulkUpload.uploadedat}
                    </th>
                    <th scope="col">{TABLE_HEADERS[0].BulkUpload.brand}</th>
                    <th scope="col">{TABLE_HEADERS[0].BulkUpload.channels}</th>
                    <th scope="col">{TABLE_HEADERS[0].BulkUpload.status}</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                {tableData !== null && tableData.length > 0 ? (
                  tableData.map((item, i) => {
                    return (
                      <tbody style={{ borderTop: "0px" }} key={i}>
                        <tr>
                          {/* <td>{i + 1 + indexOfFirstRecord}</td> */}
                          {/* <td>{item.id}</td> */}
                          <td>{item.image}</td>
                          <td>{item.productName}</td>
                          <td>{item.sku}</td>
                          <td>{item.brand}</td>
                          <td>{item.channels}</td>
                          <td>{item.status}</td>

                          <td
                            style={{ textDecoration: "none", color: "#4466f2" }}
                          >
                            {/* <Link href={`/${item.id}`}> */}
                            <Image
                              className="px-2"
                              src={download}
                              alt="download"
                              width={40}
                              height={35}
                              onClick={() => {
                                setShowBrandCreationForm(true);
                              }}
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

// function ProductListTd({ data, itemData, setItemData }) {
//   return (
//     <Fragment>
//       <tr>
//         <td>
//           <input
//             type="checkbox"
//             checked={itemData.productId === data.productId}
//             name={data.articleNumber}
//             onChange={() => setItemData(data)}
//           />
//           <span>{data.articleNumber}</span>
//         </td>
//         <td>{data.categories.c3}</td>
//         <td>{data.name}</td>
//         <td>{data.version}</td>
//         <td>{data.modifiedAt}</td>
//       </tr>
//     </Fragment>
//   );
// }

const mapDispatchToProps = {
  currentPgNo: actions.currentPgNo,
};
export default connect(null, mapDispatchToProps)(React.memo(BulkUpload));
