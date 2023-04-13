import React, { useState } from "react";
import style from "./channel.module.css";
import FormikControl from "../../public/formik/formikControl";
import TABLE_HEADERS from "../../public/tableHeader";
import Pagination from "react-js-pagination";
import checkbox from "../../public/formik/checkbox";
import Form from "react-bootstrap/Form";
import FormCheck from "react-bootstrap/FormCheck";
import { Checkbox, Button, Dropdown, Select } from "antd";

const ChannelAttributes = () => {
  const { Option } = Select;
  const selectOpts = [
    { value: "Brand 1", label: "xyz" },
    { value: "Brand 2", label: "Brand 2" },
    { value: "Brand 3", label: "Brand 3  " },
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
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const totalRecords = tableData.length;
  const pageRange = 10;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = tableData;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const items = [  // remove it after
    {
      key: "1",
      label: "Attribute",
    },
    {
      key: "2",
      label: "Attribute",
    },
    {
      key: "3",
      label: "Attribute",
    },
  ];

  const obj ={
    item:true,
  }
 const [check, setCheck] = useState(false); 
 const handleCheckChange = (e) => {
  setCheck(e.target.checked);
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
                placeholder="Channel"
                isMulti={false}
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
                {tableData !== null && tableData.length > 0 ? (
                  tableData.map((item, i) => {
                    return (
                      <tbody style={{ borderTop: "0px" }} key={i}>
                        <tr>
                          {/* <td>{i + 1 + indexOfFirstRecord}</td> */}
                          {/* <td>{item.id}</td> */}
                          <td>{item.Attributes}</td>
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
                            {
                              check === true ? 
                            
                            <Select
                              showSearch
                              style={{ width: 150 }}
                              placeholder="Attribute"
                              optionFilterProp="children"
                              // onChange={onChange}
                              // onFocus={onFocus}
                              // onBlur={onBlur}
                              // onSearch={onSearch}
                              filterOption={(input, option) =>
                                option.props.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              <Option value="jack">Jack</Option>
                              <Option value="lucy">Lucy</Option>
                              <Option value="tom">Tom</Option>
                            </Select> :
                            <Select
                              defaultValue="lucy"
                              style={{ width: 150 }}
                              disabled
                            >
                              <Option value="lucy">Lucy</Option>
                            </Select>
                  }
                            <Checkbox  checked={check} onChange={handleCheckChange} />
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
