import React, { Fragment, useState, useMemo, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Toast from "react-bootstrap/Toast";
import CustomTable from "../../public/customTable";
import { getAllProducts, publishBulkData } from "../../utility/apiUtility";
import FormikControl from "../../public/formik/formikControl";
import ToastComponent from "../../public/toastComponenet";
import CustomModal from "../../public/customModal";
import PublishForm from "./publishForm";
import { unstable_batchedUpdates } from "react-dom";
import PageLoader from "../../public/pageLoader";
import PaginationView from "../../public/paginationView";
import actions from "../../../redux/action";

// import { Table } from "react-bootstrap";
// import ActionsListTd from "./actionsListTd";

function ActionView({ currentPgNo }) {
  const [productIdList, setproductIdList] = useState([]);
  const [publishList, setPublishItem] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  // const [totalProductCount, setTotalProductCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPublishForm, setShowPublishForm] = useState(false);
  const [itemsCount, setItemsCount] = useState(null);

  const getAllProductData = async (payload) => {
    !loading && setLoading(true);
    const apiRes = await getAllProducts(payload);
    if (apiRes === "err") {
    } else {
      console.log("products list publish", apiRes);
      unstable_batchedUpdates(() => {
        setPublishItem(apiRes.data.content);
        setTotalPages(apiRes.data.totalPages);
        setItemsCount(apiRes.data.totalElements);
        setLoading(false);
      });
    }
  };
  const publishDataHandler = async (name) => {
    let testPayload = [];
    productIdList.map((e) => {
      publishList.forEach((j) => {
        if (e === j.productId) {
          let singleObj = {
            product: {
              title: j?.name,
              body_html: `<strong>${j.name}</strong>`,
              vendor: j?.vendors?.vendorName,
              product_type: j?.categories?.c2,
              tags: ["HeavenLuxe"],
            },
          };
          testPayload.push(singleObj);
        }
      });
    });
    console.log("final", testPayload);
    // let testPayload = [
    //   {
    //     product: {
    //       title: "Rahul",
    //       body_html: "<strong>Bedding & Lenin</strong>",
    //       vendor: "SHANDONG ELANTECH COMPANY LIMITED",
    //       product_type: "Sheets",
    //       tags: ["Summer"],
    //     },
    //   },
    //   {
    //     product: {
    //       title: "Mango",
    //       body_html: "<strong>Bedding & Lenin</strong>",
    //       vendor: "SHANDONG ELANTECH COMPANY LIMITED",
    //       product_type: "Sheets",
    //       tags: ["Summer"],
    //     },
    //   },
    // ];
    const apiRes = await publishBulkData(testPayload);
    if (apiRes === "err") {
    } else {
      console.log("publishh", apiRes);
      setShowPublishForm(false);
    }
  };
  const totalItems = useMemo(
    () => (
      <PaginationView
        totalProductCount={itemsCount}
        getListData={getAllProductData}
      />
    ),
    [itemsCount]
  );
  useEffect(() => {
    getAllProductData({ pageSize: 10, pageNo: 0 });
    currentPgNo(0);
  }, []);

  const tableHeadings = useMemo(() => {
    const arr = [
      { name: "Article Number", isCheckbox: true },
      { name: "Category" },
      { name: "Product" },
      { name: "Item" },
      { name: "Catalog Version" },
      { name: "Brand" },
      { name: "Brand Webstore" },
      // { name: "Primary Warehouse(Non FB)" },
      { name: "Item Number" },
      { name: "Vendors" },
      { name: "Vendor Description" },
      // { name: "Preffered Vendor" },
      { name: "Purchase Currency" },
      { name: "Vendor Purchase Price" },
      // { name: "SKU Dimensions" },
      // { name: "SKU Unit Wt." },
      // { name: "SKU Wt." },
      // { name: "Vendor Packaging" },
      // { name: "Quantity/Unit" },
      // { name: "Packaging Unit Dimensions" },
      // { name: "Catoon Wt. UOM" },
      { name: "Status" },
    ];
    return arr;
  }, []);

  const actionList = [
    { value: "oneCol", label: "Download Selected Column" },
    { value: "allCol", label: "Download all Columns" },
    { value: "publisAll", label: "Publish All" },
  ];

  const channelList = [{ value: "Shopify", label: "Shopify" }];

  const onClear = () => {
    selectInputRef.current.select.clearValue();
  };

  const pushTheId = (data) => {
    let listArr = [...productIdList],
      eachId = data.productId;
    if (listArr.includes(data.productId)) {
      listArr.splice(listArr.indexOf(data.productId), 1);
    } else if (data === "all") {
      listArr = publishList.map((e) => e.productId);
    } else if (data === "removeAll") {
      listArr = [];
    } else {
      listArr.push(eachId);
    }
    setproductIdList(listArr);
    // console.log("productId", productIdList);
  };

  const tableContent = (
    <Fragment>
      {publishList &&
        publishList.map((item) => (
          <PublisListTd
            key={`PublisListTd${item.productId}`}
            data={item}
            productIdList={productIdList}
            pushTheId={pushTheId}
          />
        ))}
    </Fragment>
  );

  return (
    <Fragment>
      <div className="row mx-0 font14">
        <div className="col-10 p-0">
          <div className="catelog-search font12 txt_gray">Search</div>
        </div>
        <div className="col-2 p-0 text-end align-self-end">
          <button className="btn btn-sm btn-icons">
            <img src="/icons/upload.png" alt="upload-icon" />
          </button>
        </div>

        <div className="col-12 p-3 my-md-4 my-3 bg-white">
          <div className="flex row">
            <div className="col-9"></div>
            <div className="col-3">
              <FormikControl
                control="reactSelect"
                selectOpts={actionList}
                placeholder="Action"
                isMulti={false}
                setFieldValue={(n, v) =>
                  v === "publisAll" && setShowPublishForm(true)
                }
              />
              <CustomModal
                show={showPublishForm}
                closeModal={() => setShowPublishForm(false)}
                body={
                  <PublishForm
                    classModal={() => setShowPublishForm(false)}
                    onSuccess={publishDataHandler}
                  />
                }
                centered={true}
                size="md"
              />
            </div>
          </div>
        </div>
        {/* {loading ? (
          <PageLoader />
        ) : ( */}
          <CustomTable
            tableName="publis-list"
            head={tableHeadings}
            content={tableContent}
            totalPages={totalPages}
            pushTheId={pushTheId}
            tableContainarClass="my-3 catalog-list"
          />
        {/* )} */}
        {itemsCount && totalItems}
      </div>
    </Fragment>
  );
}
function PublisListTd({ data, productIdList, pushTheId }) {
  console.log(typeof productIdList);
  return (
    <Fragment>
      <tr>
        <td>
          <input
            type="checkbox"
            checked={productIdList.includes(data.productId)}
            name={data.articleNumber}
            onChange={() => pushTheId(data)}
          />
          <span>{data.articleNumber}</span>
        </td>
        <td>{data.categories.c3}</td>
        <td>{data.name}</td>
        <td>{data.categories.c2}</td>
        <td>{data.categories.catalogue.version}</td>
        <td>{data.categories.catalogue.brand?.name}</td>
        <td>Shopify</td>
        {/* <td>
          <FormikControl
            control="reactSelect"
            selectOpts={data.categories.catalogue.brand.webstores}
            placeholder="Webstores"
            isMulti={false}
          />
        </td> */}
        <td>{data.itemCode}</td>
        <td>{data?.vendors?.vendorName}</td>
        <td>{data?.vendors?.vendorSkuDesc}</td>
        {/* <td>Preffered Vendor</td> */}
        <td>{data?.vendors?.currencyType}</td>
        <td>{data?.vendors?.purchasePrice}</td>
        <td>{data?.status}</td>
      </tr>
    </Fragment>
  );
}
const mapDispatchToProps = {
  currentPgNo: actions.currentPgNo,
};
export default connect(null, mapDispatchToProps)(React.memo(ActionView));
