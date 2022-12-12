import React, { Fragment, useMemo, useState, useEffect } from "react";
import { connect } from "react-redux";
import { getAllProducts, getProductById } from "../../utility/apiUtility";
import CustomTable from "../../public/customTable";
import TabView from "./tabView";
import { unstable_batchedUpdates } from "react-dom";
import AttributesForm from "./attributesForm";
import VendorForm from "./vendorForm";
import PageLoader from "../../public/pageLoader";
import PaginationView from "../../public/paginationView";
import actions from "../../../redux/action";

function ProductList({ currentPgNo }) {
  const [productList, setProductList] = useState({ content: [] });
  const [loading, setLoading] = useState(true);
  const [itemData, setItemData] = useState({});
  const [itemsCount, setItemsCount] = useState(null);

  useEffect(() => {
    getAllProductData({ pageSize: 10, pageNo: 0 });
    currentPgNo(0);
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

  const tableHeadings = useMemo(() => {
    const arr = [
      { name: "Article Number" },
      { name: "Category" },
      { name: "Product" },
      { name: "Actions" },
      { name: "Modified At" },
    ];
    return arr;
  }, []);

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

  return (
    <Fragment>
      <div className="row mx-0 font14">
        <div className="col-10 p-0">
          <div className="catelog-search font12 txt_gray">Search</div>
        </div>
        <div className="col-2 p-0 text-end align-self-end">
          <button className="btn btn-sm btn-icons">
            <img src="/icons/add.png" alt="add-icon" />
          </button>
        </div>
        {loading ? (
          <PageLoader />
        ) : (
          <>
            <CustomTable
              tableName="product-list"
              head={tableHeadings}
              content={tableContent}
              totalPages={productList.totalPages}
              tableContainarClass="my-3 catalog-list"
            />
          </>
        )}
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
