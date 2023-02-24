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
import PropertiesFormChannel from "./propertiesFormChannel";
import CustomModal from "../../public/customModal";
import ChannelForm from "./channelForm";
import ToastComponenet from "../../public/toastComponenet";
import PageLoader from "../../public/pageLoader";
import PaginationView from "../../public/paginationView";
import actions from "../../../redux/action";
import Link from 'next/link'
import Breadcrumb from "../../public/breadcrumb"
import styles from "./channel.module.css";
// import CommonPaginationTable from "../../public/commonPaginationTable"
import TABLE_HEADERS from "../../public/tableHeader";
import Pagination from "react-js-pagination";
import { Edit2, Eye, Search, AlertCircle } from "react-feather";
import { Container, Form, Row, Col, Table, Button } from "react-bootstrap";
import  CommonUpdateForm from "../../public/commonUpdateForm";
import { useDispatch, useSelector } from "react-redux";
import { getChannelListApi } from "../../../redux/actions/channel";
import Image from 'next/image';
import UpdateChannelForm from './updateChannelForm';



import marker from "../../../assets/icons/marker 1.svg";


function classifyingChannel({ currentPgNo }) {
  const [list, setList] = useState({ content: [] });
  const [loading, setLoading] = useState(true);
  const [showChannelCreationForm, setShowChannelCreationForm] = useState(false);
  const [itemData, setItemData] = useState({});
  const toastRef = useRef(null);
  const [itemsCount, setItemsCount] = useState(null);
  const toastId = React.useRef(null);
  const dispatch = useDispatch();
  const [showBrandUpdateForm, setShowBrandUpdateForm] = useState(false);

  // const { loginUser } = useSelector(({app}) => {
  //   console.log("hello app",app)
  //   return {loginUser: app?.loggedIn,};
  // });
  
  // console.log("hello bbbbbbbbbbbbbbbbb",loginUser)
  

  useEffect(() => {
    //  dispatch(createBrandApi(dataObj));
    dispatch(getChannelListApi(currentPage,5));
    // console.log("hello called get",currentPage)
   
}, [currentPage]);


const { channelGet } = useSelector(state => {
  // console.log("hello",state)
  return state.channelReducer;
});
// console.log("hello channelGet",channelGet)

  const notify = (val) => {
    if (!toast.isActive(toastId.current)) {
      if (val) {
        toastId.current = toast("channel Name added Successfully !!!");
      }
    }
  };
  const tabsList = useMemo(() => {
    const tabArr = [
      {
        id: "properties",
        title: "PROPERTIES",
        content: <PropertiesFormChannel data={itemData} />,
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
        // getListData={getAllChannelsData}
      />
    ),
    [itemsCount]
  );

  const getEachItemData = async (item) => {
    setItemData({});
    const apiRes = await getchannelById(item);
    if (apiRes === "err") {
    } 
    else {
      setItemData(apiRes.data);
    }
  };

  useEffect(() => {
    // getAllChannelsData({ pageSize: 10, pageNo: 0 });
    currentPgNo(0);
  }, []);

  const onchannelCreationSuccess = useCallback(() => {
    setShowChannelCreationForm(false);
    // getAllChannelsData({ pageSize: 10, pageNo: 0 });
    toastRef.current.toastHandler({
      response: "suc",
      // position: "middle-center",
    });
  }, []);

  const tableHeadings = useMemo(() => {
    const arr = [
      { name: "channel Id" },
      { name: "channel Name" },
      { name: "Discription" },
      { name: "Action" },
    ];
    return arr;
  }, []);

  const tableContent = (
    <Fragment>
      {list.content.map((item, index) => (
        <CatatlogListTd
          key={`ChannelsListTd${index}${item.channelId}`}
          data={item}
          itemData={itemData}
          setItemData={getEachItemData}
        />
      ))}
    </Fragment>
  );

  const tableData = [];

  for (let i = 1; i <= 5; i++) {
    tableData.push({
      id: "11100"+i,
      name: "Channel" + i,
      discription: "discription" + (i),
      lastUploaded:`${i}/12/1022`
    });
  }
 //   /*-----------------Pagination------------------*/
 const [currentPage, setCurrentPage] = useState(1);
 const recordPerPage = 5;
 const totalRecords = 20;
 const pageRange = 5;
 const indexOfLastRecord = currentPage * recordPerPage;
 const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
 const currentRecords = channelGet;

 const handlePageChange = pageNumber => {
   setCurrentPage(pageNumber);
   dispatch(getChannelListApi(pageNumber-1,5));
 }
 /*-----------------Pagination------------------*/
 const onBrandCreationSuccess = useCallback(() => {
  // setShowBrandCreationForm(false);
  setShowBrandUpdateForm(false)
  // getAllBrandsData({ pageSize: 10, pageNo: 0 });
  // toastRef.current.toastHandler({
  //   response: "suc",
  //   // position: "middle-center",
  // });
}, []);

  return (
    <Fragment>
      <ToastComponenet ref={toastRef} />
      <div className={`row mx-0 font14 ${styles.listing_space}`}>
        <div className="col-10 p-0">
        {/* <Breadcrumb title="channel" parent="channel LIST" /> */}
        <p className={styles.channel_title_name}>Channels</p>
          {/* <div className="catelog-search font12 txt_gray">Search</div> */}
        </div>

        <div className="col-2 p-3 text-end align-self-center">
          <button
            onClick={() => setShowChannelCreationForm(true)}
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
                  {/* <th scope="col">{TABLE_HEADERS[0].channel.id} </th> */}
                  <th scope="col">{TABLE_HEADERS[0].Channels.name}</th>
                  <th scope="col">{TABLE_HEADERS[0].Channels.discription}</th>
                  <th scope="col">{TABLE_HEADERS[0].Channels.lastUploaded}</th>
                  <th scope="col">{TABLE_HEADERS[0].Channels.totalProductsActive}</th>
                  <th scope="col">{TABLE_HEADERS[0].Channels.totalProductsInactive}</th>
                  <th scope="col">{TABLE_HEADERS[0].Channels.status}</th>
                  <th scope="col">{TABLE_HEADERS[0].Channels.action}</th>
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
                            {/* <td>{item.id}</td> */}
                            <td>{item.channelName}</td>
                            <td>{item.description}</td>
                            <td>{item.lastUploaded}</td>
                            <td>{item.totalProductsActive}</td>
                            <td>{item.totalProductsInActive}</td>
                            <td>{item.status}</td>
                            <td  style={{ textDecoration: "none" ,color: "#4466f2"}}>
                              {/* <Link href={`/${item.id}`}> */}
                            <Image
                              className="px-2"
							                src={marker}
							                alt="edit"
                              width={35}
							                height={30}
                              onClick={() => {
                                setShowBrandUpdateForm(true)
                              }}
						                  />
                              {/* <marker
                                  onClick={() => {
                                    setShowChannelCreationForm(true)
                                  }}
                                /> */}
                              {/* </Link> */}

                              <CustomModal
                                      show={showBrandUpdateForm}
                                      closeModal={() => 
                                      setShowBrandUpdateForm(false)
                                      }           
                                  
                                      size="md"
                                      centered={true}
                                      body={
                                        <UpdateChannelForm
                                          table={TABLE_HEADERS[0].Brand.table}
                                          classModal={() => setShowBrandUpdateForm(false)}
                                          onSuccess={onBrandCreationSuccess}
                                          notifySucess={() => notify(true)}
                                        />
                                  }
                                />
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
            show={showChannelCreationForm}
            closeModal={() => setShowChannelCreationForm(false)}
            size="md"
            centered={true}
            body={
              <CommonUpdateForm
                table={TABLE_HEADERS[0].Channels.table}
                classModal={() => setShowChannelCreationForm(false)}
                onSuccess={onchannelCreationSuccess}
                notifySucess={() => notify(true)}
              /> */}
        {/* } */}
      {/* /> */}

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
        show={showChannelCreationForm}
        closeModal={() => setShowChannelCreationForm(false)}
        size="md"
        centered={true}
        body={
          <ChannelForm
            classModal={() => setShowChannelCreationForm(false)}
            onSuccess={onchannelCreationSuccess}
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
            checked={itemData.channelId === data.channelId}
            name={data.channelId}
            onChange={() => setItemData(data)}
          />
          <span>{data.name}</span>
        </td>
        <td>{data.channelOwner}</td>
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
)(React.memo(classifyingChannel));
