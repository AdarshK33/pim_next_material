import React, { Fragment, useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import CatalogList from "./catalogList";
import { getAllCatagories, getCatalogById } from "../../utility/apiUtility";
import CatalogForm from "./catalogForm";
import { unstable_batchedUpdates } from "react-dom";
import CatalogEditView from "./catalogEditView";
import TabView from "./tabView";
import PageLoader from "../../public/pageLoader";
import actions from "../../../redux/action";

function CatalogContent({ currentPgNo }) {
  const [list, setList] = useState({ content: [] });
  const [loading, setLoading] = useState(true);
  const [showCatalogForm, setShowCatalogForm] = useState(false);
  const [itemData, setItemData] = useState({});

  const getListData = async (apiData) => {
    !loading && setLoading(true);
    const apiRes = await getAllCatagories(apiData);
    if (apiRes === "err") {
    } else {
      unstable_batchedUpdates(() => {
        setList(apiRes.data);
        console.log("==", list);
        setItemData({});
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    getListData({ pageSize: 10, pageNo: 0 });
    currentPgNo(0);
  }, []);

  const getEachItemData = async (item) => {
    setItemData({});
    const apiRes = await getCatalogById(item);
    if (apiRes === "err") {
    } else {
      setItemData(apiRes.data);
    }
  };

  const tabsList = [
    {
      id: "commonTab",
      title: "COMMON",
      content: <CatalogForm data={itemData} />,
    },
    { id: "multiCountryTab", title: "MULTICOUNTRY", content: "" },
  ];

  return (
    <Fragment>
      <div className="row mx-0 font14">
        <div className="col-10 p-0">
          <div className="catelog-search font12 txt_gray">Search</div>
        </div>
        <div className="col-2 p-0 text-end align-self-end">
          <button
            onClick={() => setShowCatalogForm(true)}
            className="btn btn-sm btn-icons"
          >
            <img src="/icons/add.png" alt="add-icon" />
          </button>
          <button
            onClick={() => getListData({ pageSize: 10, pageNo: 0 })}
            className="btn btn-sm btn-icons"
          >
            <img src="/icons/refresh.png" alt="refresh-icon" />
          </button>
        </div>
        {showCatalogForm ? (
          <CatalogEditView />
        ) : (
          <Fragment>
            <div className="col-12 px-0 pt-md-3 ">
              <p>
                Company: <span className="txt_blue">All</span>
              </p>
            </div>
            {/* {loading ? (
              <PageLoader />
            ) : ( */}
              <Fragment>
                <CatalogList
                  list={list}
                  getListData={getListData}
                  catalogItem={itemData}
                  setCatalogItem={getEachItemData}
                />
                {itemData.catalogueId && (
                  <TabView
                    tabsList={tabsList}
                    id={itemData.catalogueId}
                    data={itemData}
                    setItemData={setItemData}
                  />
                )}
              </Fragment>
            {/* )} */}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}

const mapDispatchToProps = {
  currentPgNo: actions.currentPgNo,
};
export default connect(null, mapDispatchToProps)(React.memo(CatalogContent));
