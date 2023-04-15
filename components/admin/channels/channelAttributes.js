import React, { useState, useEffect } from "react";
import style from "./channel.module.css";
import FormikControl from "../../public/formik/formikControl";
import TABLE_HEADERS from "../../public/tableHeader";
import Pagination from "react-js-pagination";
import checkbox from "../../public/formik/checkbox";
import Form from "react-bootstrap/Form";
import FormCheck from "react-bootstrap/FormCheck";
import { Checkbox, Button, Dropdown, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { channelAttributeApiList } from "../../../redux/actions/channel";

const ChannelAttributes = () => {
  const dispatch = useDispatch();
  const [channel, setChannel] = useState("shopify");
  const [currentPage, setCurrentPage] = useState(0);

  const { channelAttribute } = useSelector((state) => {
    return state.channelReducer;
  });

  // const pimAttribute = pimAttributes?.map((item) => console.log("item",item.keyName) );

  // console.log("channelAttribute",channelAttribute.content.pimAttributes);

  const { Option } = Select;

  const selectOpts = [
    { value: "shopify", label: "Shopify" },
    { value: "amazon", label: "Amazon" },
  ];

  const tableData = [];

  for (let i = 1; i <= 10; i++) {
    tableData.push({
      id: "11100" + i,
      Attributes: "Attributes" + i,
      isChecked: false,
      // role: "Role" + i,
      // brand: "Brand" + i,
    });
  }

  // function handleCheckboxChange(id) {
  //   tableData.map((row) => {
  //     if (row.id === id) {
  //       return { ...row, isChecked: !row.isChecked };
  //     }
  //     return row;
  //   });
  // }

  //   /*-----------------Pagination------------------*/
  const recordPerPage = 5;
  const totalRecords = channelAttribute?.totalElements;
  const pageRange = 5;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = channelAttribute?.content?.pimAttributes;
  const channelAttributes = channelAttribute?.content?.channelAttributes;
     console.log("channelAttributes", currentRecords, channelAttributes, channelAttribute);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    dispatch(channelAttributeApiList(channel, pageNumber - 1, 5));
  };

  useEffect(() => {
    dispatch(channelAttributeApiList(channel, currentPage, 5));
  }, []);

  // const items = [  // remove it after
  //   {
  //     key: "1",
  //     label: "Attribute",
  //   },
  //   {
  //     key: "2",
  //     label: "Attribute",
  //   },
  //   {
  //     key: "3",
  //     label: "Attribute",
  //   },
  // ];

 
  // const [check, setCheck] = useState(false);
  // const handleCheckChange = (e) => {
  //   setCheck(e.target.checked);
  // };
 
const attributes = channelAttributes?.shopify?.attributes;
console.log("att",attributes);

const options = attributes?.map(attr => ({
  value: attr.attributeId?.toString(),
  label: attr.keyName
}));

  return (
    <>
      <div className={`row mx-0 font14 ${style.listing_space}`}>
        <div className={style.main_Attri}>
          <div className="row">
            <div>
              <p className={style.channel_title_name}>
                Channel Attribute Mapping
              </p>
            </div>
          </div>

          {/* <div className="col-2">
            <FormikControl
              control="reactSelect"
              selectOpts={selectOpts}
              placeholder="Channel"
              isMulti={false}
            />
          </div>
          <div className="col-2 p-3 text-end align-self-center">
          <button
            className={`btn btn-sm ${style.add_button_text}`}
          >
            {/* <img src="/icons/add.png" alt="add-icon" /> */}
          {/* Update */}
          {/* </button> */}
          {/* </div> */}

          <div className="row pb-0 d-flex align-items-center justify-content-between">
            <div className="col-2">
              <FormikControl
                control="reactSelect"
                selectOpts={selectOpts}
                placeholder="channel"
                isMulti={false}
                onChange={(selectedOption) => {
                  setChannel(selectedOption.value);
                }}
              />
            </div>
            <div className="col-4 mr-2">
              <button className={`btn btn-sm ${style.add_button_text}`}>
                Submit
              </button>
            </div>
          </div>

          <div className="card w-75 mt-3 p-0" style={{ borderRadius: "1rem" }}>
            {/* <div className="card-body p-0"> */}
            <div className={`table-responsive ${style.listing_border}`}>
              <table id="table-to-xls" className="table">
                <thead
                  className="thead-light"
                  style={{ backgroundColor: "#2f3c4e" }}
                >
                  <tr style={{ backgroundColor: "#f5f6f8" }}>
                    {/* <th scope="col">S. No</th> */}
                    {/* <th scope="col">{TABLE_HEADERS[0].Brand.id} </th> */}
                    <th scope="col">Attributes</th>
                    <th scope="col">Shopify</th>
                    {/* <th scope="col">Amazon</th> */}
                  </tr>
                </thead>
                {currentRecords &&
                currentRecords !== null &&
                currentRecords?.length > 0 ? (
                  currentRecords.map((item, i) => {
                    return (
                      <tbody style={{ borderTop: "0px" }} key={i}>
                        <tr>
                          {/* <td>{i + 1 + indexOfFirstRecord}</td> */}
                          {/* <td>{item.id}</td> */}
                          <td>{item?.keyName}</td>
                          {/* <td className="d-flex align-items-center justify-content-center">
                            <FormikControl
                              control="reactSelect"
                              selectOpts={selectOpts}
                              placeholder="Attribute"
                              isMulti={false}
                            />
                            <Checkbox />
                          </td> */}
                          <td>
                            {/* <Dropdown
                              menu={{
                                items,
                              }}
                              placement="bottom"
                              arrow={{
                                pointAtCenter: true,
                              }}
                            >
                              <Button>bottom</Button>
                            </Dropdown> */}
                            
                              <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select an attribute"
                                optionFilterProp="children"
                                onChange={onChange}
                                filterOption={(input, option) =>
                                  (option?.label ?? "")
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                                }
                                options={options}
                                
                              />
                        
                            <Checkbox
                              // checked={check}
                              // onChange={handleCheckChange}
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

            <div className={style.dash_board_pagination}>
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
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChannelAttributes;
