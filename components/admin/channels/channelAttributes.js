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
import { channelAttributeApiList, channelMappingApi } from "../../../redux/actions/channel";

const ChannelAttributes = () => {
  const dispatch = useDispatch();
  const [channel, setChannel] = useState("Shopify");
  console.log("channel state", channel);
  const [currentPage, setCurrentPage] = useState(0);

  const { channelAttribute } = useSelector((state) => {
    return state.channelReducer;
  });

  // const pimAttribute = pimAttributes?.map((item) => console.log("item",item.keyName) );

  // console.log("channelAttribute", channelAttribute.content.pimAttributes);

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
  console.log(
    "channelAttributes",
    currentRecords,
    channelAttributes,
    channelAttribute
  );

  const [modifiedPimRecord, setModifiedPimRecord] = useState([]);

  console.log("modifiedCurrentRecord ", modifiedPimRecord);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    dispatch(channelAttributeApiList(channel, pageNumber - 1, 5));
  };

  useEffect(() => {
    dispatch(channelAttributeApiList(channel, currentPage, 5));
  }, []);

  useEffect(() => {
    const updatedRecord = currentRecords?.map((obj) => {
      const hasChannelAttribute = obj.channelAttributes && Object.keys(obj.channelAttributes).length;
      return {
        ...obj,
        isChecked: hasChannelAttribute,
        selectedChannelAttributes: {},
      }
    });
    setModifiedPimRecord(updatedRecord);
  }, [currentRecords])

  // const [check, setCheck] = useState(false);
  const onChangeOfCheckBox = (e, item) => {
    console.log("on click of checkbox", e.target.checked, item);
    const data = modifiedPimRecord.map((arr) => {
      if (arr.id === item.id) {
        return {
          ...arr,
          isChecked: !item.isChecked,
        };
      } else return arr;
    });
    console.log("data", data);
    setModifiedPimRecord(data);
  };

  const attributes = channelAttributes?.[channel]?.attributes;
  console.log("att", attributes);

  const options = attributes?.map((attr) => ({
    value: attr.id,
    label: attr.aliasKeyName,
  }));
  const onSelectdropdown =  (value, item) => {
    const selectedChannelAttributes = attributes.filter(
      (arr) => arr.id === value
    )[0];
    const pimAttribute = modifiedPimRecord.map((arr) => {
      if (arr.id === item.id) {
        return {
          ...arr,
          selectedChannelAttributes,
        };
      } else return arr;
    });
    setModifiedPimRecord(pimAttribute);
  };

  const onSubmit = () => {
    const mappedAttributes = modifiedPimRecord.map(arr => {
      if (Object.keys(arr.selectedChannelAttributes).length) {
        return {
          attributeId: arr.id,
          channelAttribute: arr.selectedChannelAttributes
        }
      }
    }).filter(arr => arr)

    const data = {
      mappedAttributes,
      unMappedAttributes: {}
    }
    console.log('Request body data', data)
    dispatch(channelMappingApi(data))
  }

  const setDefaultOption = item => {
    const  { channelAttributes: attr } = item
    if (attr && Object.keys(attr).length) return {
      value: attr.id,
      label: attr.aliasKeyName,
    }
  }

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

          <div className="row pb-0 d-flex align-items-center justify-content-between">
            <div className="col-2">
              <FormikControl
                control="reactSelect"
                selectOpts={selectOpts}
                placeholder={channel.charAt(0).toUpperCase() + channel.slice(1)}
                isMulti={false}
                defaultValue={selectOpts[0]}
                //  value={channel}
                onChange={(selectedOption) => {
                  setChannel(selectedOption.value);
                }}
              />
            </div>
            <div className="col-4 mr-2">
              <button className={`btn btn-sm ${style.add_button_text}`} 
              onClick={onSubmit}
              >
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
                    <th scope="col">Attributes</th>
                    <th scope="col">
                      {channel.charAt(0).toUpperCase() + channel.slice(1)}
                    </th>
                  </tr>
                </thead>
                {modifiedPimRecord &&
                modifiedPimRecord !== null &&
                modifiedPimRecord?.length > 0 ? (
                  modifiedPimRecord.map((item, i) => {
                    return (
                      <tbody style={{ borderTop: "0px" }} key={i}>
                        <tr>
                          <td>{item?.aliasKeyName}</td>
                          <td>
                            <Select
                              showSearch
                              style={{ width: 200 }}
                              placeholder="Select an attribute"
                              optionFilterProp="children"
                              onChange={(e) => {
                                onSelectdropdown(e, item);
                              }}
                              defaultValue={() => setDefaultOption(item)}
                              disabled={item?.isChecked}
                              // onSearch={onSearch}
                              filterOption={(input, option) =>
                                (option?.label ?? "")
                                  .toLowerCase()
                                  .includes(input.toLowerCase())
                              }
                              options={options}
                            />

                            <Checkbox
                              checked={item.isChecked}
                              onChange={(e) => onChangeOfCheckBox(e, item)}
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
