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
import CustomTable from "../../../public/customTable";
import TabView from "../../catalog/tabView";
import { unstable_batchedUpdates } from "react-dom";
import { getAllBrands, getBrandById } from "../../../utility/apiUtility";
import PropertiesForm from "./propertiesForm";
import CustomModal from "../../../public/customModal";
import BrandForm from "./categoryForm";
import ToastComponenet from "../../../public/toastComponenet";
import PageLoader from "../../../public/pageLoader";
import PaginationView from "../../../public/paginationView";
import actions from "../../../../redux/action";
import Link from 'next/link'
import Breadcrumb from "../../../public/breadcrumb"
import styles from "./category.module.css";
// import CommonPaginationTable from "../../public/commonPaginationTable"
import TABLE_HEADERS  from "../../../public/tableHeader";
import Pagination from "react-js-pagination";
import { Edit2, Eye, Search, AlertCircle } from "react-feather";
// import { Container, Form, Row, Col, Table, Button } from "react-bootstrap";
import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import { Form, Formik } from "formik";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Switch, Space } from 'antd';

import FormikControl from "../../../public/formik/formikControl"
import SubmitButton from "../../../public/formik/submitButton";
import { useDispatch, useSelector } from "react-redux";


function classifyingCategory({ currentPgNo }) {
  const [list, setList] = useState({ content: [] });
  const [loading, setLoading] = useState(true);
  const [showBrandCreationForm, setShowBrandCreationForm] = useState(false);
  const [itemData, setItemData] = useState({});
  const toastRef = useRef(null);
  const [itemsCount, setItemsCount] = useState(null);
  const toastId = React.useRef(null);


  // const { loginUser } = useSelector(({app}) => {
  //   console.log("hello app",app)
  //   return {loginUser: app?.loggedIn,};
  // });
  
  // console.log("hello bbbbbbbbbbbbbbbbb",loginUser)
  
  
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

  useEffect(() => {
    getAllBrandsData({ pageSize: 10, pageNo: 0 });
    currentPgNo(0);
  }, []);

  const onBrandCreationSuccess = useCallback(() => {
    setShowBrandCreationForm(false);
    getAllBrandsData({ pageSize: 10, pageNo: 0 });
    toastRef.current.toastHandler({
      response: "suc",
      // position: "middle-center",
    });
  }, []);

  const tableHeadings = useMemo(() => {
    const arr = [
      { name: "Parent Category Id" },
      { name: "Category L1" },
      { name: "Category L2" },
      { name: "Category L3" },
      // { name: "Category L4" },
      // { name: "Category L5" },
      // { name: "Category L6" },
      // { name: "Category L7" },
      // { name: "Category L8" },
      // { name: "Category L9" },
      // { name: "Category L10" },
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

  const tableData = [];

  for (let i = 1; i <= 10; i++) {
    tableData.push({
      id: "11100"+i,
      Parent_Category_Id: "Parent Category Id" + i,
      CategoryL1: "Category" + (i),
      CategoryL2: "Category" + (i),
      CategoryL3: "Category" + (i),

    });
  }
 //   /*-----------------Pagination------------------*/
 const [currentPage, setCurrentPage] = useState(1);
 const recordPerPage = 10;
 const totalRecords = tableData.length;
 const pageRange = 10;
 const indexOfLastRecord = currentPage * recordPerPage;
 const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
 const currentRecords = tableData;

 const handlePageChange = pageNumber => {
   setCurrentPage(pageNumber);
 }
 /*-----------------Pagination------------------*/

 const treeData1 = [
  {
    title: "Health & Nutrition",
    key: "MainStructure",
    children: [
      {
        title: "Health Drinks",
        key: "layoutFolder",
        children: [ //child element
          {
            title: "Coconut Drinks.js",
            key: "coconut Drinks.js"
          }
        ]
      },
      {
        title: "Kids Nutrition",
        key: "layoutFolder Kids Nutrition",
        children: [ //child element
          {
            title: "MIlk Drinks.js",
            key: " milk Kids Nutrition"
          }
        ]
      }
    ]
  },
  {
    title: "women & health care",
    key: "MainStructure women",
    children: [
      {
        title: "Health health care",
        key: "layoutFolder no",
        children: [ //child element
          {
            title: "women health care.js",
            key: "coconut Drinks.NodeNo"
          }
        ]
      },


    ]
  },

  {
    title: "Personal Care",
    key: "MainStructure Personal Care",
    children: [
      {
        title: "Health health Personal Care",
        key: "layoutFolder Personal Care",
        children: [ //child element
          {
            title: "women Personal Care care.js",
            key: "coconut DrinksPersonal Care"
          }
        ]
      },


    ]
  },
  {
    title: "Ayurveda",
    key: "MainStructure Ayurveda",
    children: [ 
    ]
  },
  {
    title: "Health Devices",
    key: "MainStructure Health Devices",
    children: [ 
    ]
  },
];

const treeData = [
  {
    title: 'Health & Nutrition ',
    key: '0-0',
    children: [
      {
        title: 'H&N',
        key: '0-0-0',
        children: [
          {
            title: 'Health Drinks',
            key: '0-0-0-0',
          },
          {
            title: 'Health Drinks2',
            key: '0-0-0-1',
          },
          {
            title: 'Health Drinks3',
            key: '0-0-0-2',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
          },
        ],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        children: [
          {
            title: 'leaf',
            key: '0-0-2-0',
          },
          {
            title: 'leaf',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },

  {
    title: 'Women Care',
    key: 'Women Care 0-0',
    children: [
      {
        title: 'W&C',
        key: 'Women Care 0-0-0',
        children: [
          {
            title: 'Women Care',
            key: 'Women Care 0-0-0-0',
          },
          {
            title: 'Women Care2',
            key: 'Women Care 0-0-0-1',
          },
          {
            title: 'Health Drinks3',
            key: 'Women Care 0-0-0-2',
          },
        ],
      },
      {
        title: ' Women Careparent 1-1',
        key: 'Women Care0-0-1',
        children: [
          {
            title: ' Women Careleaf',
            key: 'Women Care 0-0-1-0',
          },
        ],
      },
      {
        title: ' Women Careparent 1-2',
        key: 'Women Care 0-0-2',
        children: [
          {
            title: 'Women Care leaf',
            key: 'Women Care 0-0-2-0',
          },
          {
            title: 'Women Care leaf',
            key: 'Women Care 0-0-2-1',
          },
        ],
      },
    ],
  },

  {
    title: 'Personal Care',
    key: 'Personal Care 0-0',
    children: [
      {
        title: 'W&C',
        key: 'Personal Care0-0-0',
        children: [
          {
            title: 'Personal Care',
            key: 'Personal Care 0-0-0-0',
          },
          {
            title: 'Personal Care2',
            key: 'Personal Care 0-0-0-1',
          },
          {
            title: 'Personal Care3',
            key: 'Personal Care 0-0-0-2',
          },
        ],
      },
      {
        title: ' Personal Care 1-1',
        key: 'Personal Care0-0-1',
        children: [
          {
            title: ' Personal Careleaf',
            key: 'Personal Care 0-0-1-0',
          },
        ],
      },
      {
        title: 'Personal Care 1-2',
        key: 'Personal Care 0-0-2',
        children: [
          {
            title: 'Personal Care leaf',
            key: 'Personal Care 0-0-2-0',
          },
          {
            title: 'Personal Care leaf',
            key: 'Personal Care 0-0-2-1',
          },
        ],
      },
    ],
  },
];
const onSelect = (selectedKeys, info) => {
  console.log('hello selected', selectedKeys,'hello info',info);
};
const initialValues = {
  name: "",
  discription: ""
};

const onSubmit = async (values, formik) => {
  let brndName = {
    name: values.name.trim(),
  };
  let brndDiscription = {
    name: values.discription.trim(),
  };
  console.log("val", brndName);
  if (brndName.name === "" || brndDiscription.name === "" ) {
    notify("err");
  } else {
    const apiRes = await createBrandApi(brndName);
    if (apiRes === "err") {
      formik.setSubmitting(false);
    } else {
      notifySucess(true);
      classModal();
    }
  }
};

  return (
    <Fragment>
      <ToastComponenet ref={toastRef} />
      <div className={styles.main_category}>
      <div className="row">
      <div className="col-10">
      <p className={styles.title_name}>Categories</p>
      </div>
      <div className="col-2 p-0 text-end align-self-center">
          <button
            onClick={() => setShowBrandCreationForm(true)}
            className={`btn btn-sm ${styles.add_button_text}`}
          >
            + Add New
          </button>
        </div>
      </div>
     
      <div className="row">
        <div className="col-3">
        <div className={`card ${styles.category_list} `}>
        <div className="card-body" style={{maxHeight: "392px"}}>
        <div className={styles.category_menu_overflow}>
          <Tree
            showLine
            switcherIcon={<DownOutlined />}
            // defaultExpandedKeys={['0-0-0']}
            onSelect={onSelect}
            treeData={treeData}
            autoExpandParent ={false}
            defaultExpandAll={false}
          />
        </div>
        </div>
        </div>
        </div>
      <div className="col-9">
      <div className="row mx-0 font14">
        <div className="col-10 p-0">
          {/* <div className="catelog-search font12 txt_gray">Search</div> */}
        </div>
       
        <div className={`card ${styles.category_card}`}>
        <div className="card-body">
         <div className="row">
         <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting }) => {
            return (
              
              <Form className="mx-0 font12">
                <div className="row">
                <div className="col-4 my-2">
                <FormikControl
                  control="input"
                  type="input"
                  classprops="form-group mb-3 col-md-12"
                  className="form-control form-control-sm px-0 py-2 text-center border-0"
                  placeholder="Name"
                  name="Name"
                  id="Name"
                />
                </div>
                <div className="col-4 mt-4 my-2">
                <FormikControl
                  control="reactSelect"
                  selectOpts={null}
                  placeholder="Parent Category"
                  isMulti={false}
                />
                </div>
                <div className="col-4 mt-4 my-2">
                <FormikControl
                  control="reactSelect"
                  selectOpts={null}
                  placeholder="Sub Category"
                  isMulti={false}
                />
                </div>
                </div>
                <div className="row">
                <div className="col-4 my-2">
                <FormikControl
                  control="input"
                  type="input"
                  classprops="form-group mb-3 col-md-12"
                  className="form-control form-control-sm px-0 py-2 text-center border-0"
                  placeholder="Slug"
                  name="Slug"
                  id="Slug"
                />
                </div>
                <div className="col-4 mt-4 my-2">
                <FormikControl
                  control="reactSelect"
                  selectOpts={null}
                  placeholder="Brand (Multi Select)"
                  isMulti={true}
                />
                </div>
                </div>
                <div className="row">
                <div className={`col-4 category_dropZone my-3`}>
                <FormikControl
                  control="dropZone"
                  name="category drop Images/file"
                  setFieldValue="Image Upload"
                  placeholder="Image Upload"

                />
                </div>
              
                <div className="col-8 my-0">
                 <FormikControl
                  // label="First Name"
                  control="text-area"
                  type="text"
                  classprops="form-group mb-3 col-md-12"
                  className="form-control form-control-sm px-0 py-2 text-center border-0"
                  placeholder="Category descriptions..."
                  name="CategoryDescriptions"
                  id="Category_descriptions"
                  rows="5"
                />
                </div>
                </div>


<div className={styles.btn_section}>
  <div className={styles.switch_btn}>
        <Space >
          <Switch checkedChildren="Active" unCheckedChildren="Not Active" />
        </Space>
            </div>
            <div className={styles.submit_btn}>
                  <SubmitButton
                    isLoading={isSubmitting}
                    type="submit"
                    name="Submit"
                    className={`btn btn-sm py-1 px-4 br3 mx-2 ${styles.submit_button}`}
                  />
            </div>
        </div>
                
              </Form>
            );
          }}
        </Formik>  
         
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
      
      </div>
</div>
</div>
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
)(React.memo(classifyingCategory));
