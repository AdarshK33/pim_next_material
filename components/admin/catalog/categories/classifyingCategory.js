//new cartegory
import Image from 'next/image';
import axios from "axios";


import React, {
  Fragment,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { connect } from "react-redux";
// import folder from "../../../assets/icons/folder.svg";
import folder from "../../../../assets/icons/folder.svg";


import { ToastContainer, toast } from "react-toastify";
import CustomTable from "../../../public/customTable";
import TabView from "../../catalog/tabView";
import { unstable_batchedUpdates } from "react-dom";
import { getAllBrands, getBrandById } from "../../../utility/apiUtility";
import PropertiesForm from "./propertiesForm";
import CustomModal from "../../../public/customModal";
import CategoryForm from "./categoryForm";
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
// import { Form, Formik } from "formik";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Switch, Space } from 'antd';

import FormikControl from "../../../public/formik/formikControl"
import SubmitButton from "../../../public/formik/submitButton";
import { useDispatch, useSelector } from "react-redux";
import {getCategoriesApis} from "../../../../redux/actions/catalogQuery"
import {updateCategoryApi} from "../../../../redux/actions/catalog"
import { Row, Col, Form, Button } from "react-bootstrap";
import { createCategoryApi } from "../../../../redux/actions/catalog";



import Dropzone from 'react-dropzone';
import { getBrandDropdownApi} from "../../../../redux/actions/onboardQuery";

function classifyingCategory({ currentPgNo }) {
  const [list, setList] = useState({ content: [] });
  // const [loading, setLoading] = useState(true);
  const [showBrandCreationForm, setShowBrandCreationForm] = useState(false);
  const [itemData, setItemData] = useState({});
  const toastRef = useRef(null);
  const [itemsCount, setItemsCount] = useState(null);
  const toastId = React.useRef(null);

  const dispatch = useDispatch();


  const [brandName, setBrandName] = useState();
  const [parentName, setParentName] = useState(); 
  const [parentId, setParentId] = useState(); 
  const [addNewChild, setAddNewChild] = useState(false); 

  

  console.log("setParentName",parentName)

  const [subCategoryName, setSubCategoryName ]= useState();
   

  const [brandNameError, setBrandNameError] = useState(false);
  const [parentNameError , setParentNameError] = useState(false);
  const [categoryNameError, setCategoryNameError] = useState(false);
  const [categoryDescriptionError, setCategoryDescriptionError] = useState(false);
  const [slugError, setSlugError] = useState(false);
  

  console.log("hello parentName",parentName);
  

  
  const [state, setState] = useState({
    categoryName: "",
    categoryDescription: "",
     slug :""
  });
  const [itemTree, setItemTree] = useState(null);
  const [selectedTreeForUpdate, setSelectedTreeForUpdate] = useState();
  
  useEffect(() => {
   
    dispatch(getBrandDropdownApi());

  }, []);



  // const { loginUser } = useSelector(({app}) => {
  //   console.log("hello app",app)
  //   return {loginUser: app?.loggedIn,};
  // });
  
  console.log("hello selectedTreeForUpdate",selectedTreeForUpdate)
  

  useEffect(() => {
   dispatch(getCategoriesApis("Puma"))
  //  dispatch( updateCategoryApi({
  //   categoryId: 79,
  //   name: 'nokia mobile',
    
  // }))
  }, []);
  




  
const { categoriesData,loading } = useSelector(state => {
  // console.log("hello",state)
  return state.catalogQueryReducer;
});


 //   /*-----------------Dropzone ------------------*/


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
        notify(true,'file_uploaded')
        // alert('File uploaded')
      })
      .catch((error) => {
        console.log(error);
      });
  };


 //   /*----------------- catagory menu list------------------*/

const updateDisplayNameToLabel = (val, keysMap) => {
  if (val == null) return null;
  if (Array.isArray(val)) {
    return val.map(item => updateDisplayNameToLabel(item, keysMap));
  } else if (typeof val == "object") {
    return Object.keys(val).reduce((obj, key) => {
      const propKey = updateDisplayNameToLabel(key, keysMap);
      const propVal = updateDisplayNameToLabel(val[key], keysMap);
      obj[propKey] = propVal;
      return obj;
    }, {});
  } else if (typeof val === "string") {
    return keysMap[val] || val;
  }
  return val;
}

const keysToUpdate = {
  id: 'key',
  name: 'title',
  categories: 'children'
};


const treeUpdated = updateDisplayNameToLabel(categoriesData, keysToUpdate);

console.log("hello tree",treeUpdated);
 //   /*----------------- catagory menu------------------*/




 //   /*-----------------  selected catagory menu------------------*/


function findNested(obj, key, value) {

  // Base case
  if (obj[key] === value) {
    return obj;
  } else {
    var keys = Object.keys(obj); // add this line to iterate over the keys

    for (var i = 0, len = keys.length; i < len; i++) {
      var k = keys[i]; // use this key for iteration, instead of index "i"

      // add "obj[k] &&" to ignore null values
      if (obj[k] && typeof obj[k] == 'object') {
        var found = findNested(obj[k], key, value);
        if (found) {
          // If the object was found in the recursive call, bubble it up.
          return found;
        }
      }
    }
  }
}




 //   /*-----------------  selected catagory menu------------------*/



 //   /*-----------------  selected find Parent id / name ------------------*/



function findNestedObj(entireObj, keyToFind, valToFind) {
  let foundObj;
  JSON.stringify(entireObj, (_, nestedValue) => {
    if (nestedValue && nestedValue[keyToFind] === valToFind) {
      foundObj = nestedValue;
    }
    return nestedValue;
  });
  return foundObj;
};

 //   /*-----------------  selected Parent id / name ------------------*/


  const getAllBrandsData = async (payload) => {
    // !loading && setLoading(true);
    const apiRes = await getAllBrands(payload);
    if (apiRes === "err") {
    } else {
      unstable_batchedUpdates(() => {
        setList(apiRes.data);
        setItemsCount(apiRes.data.totalElements);
        setItemData({});
        // setLoading(false);
      });
    }
  };
  const notify = (val,type) => {
    if (!toast.isActive(toastId.current)) {
      if (val && type=== 'create') {
        toastId.current = toast("Category added Successfully !!!");
        dispatch(getCategoriesApis("Puma")) //login  user brand
      }
      if (val && type=='update') {
        toastId.current = toast("Category Updated Successfully !!!");
       dispatch(getCategoriesApis("Puma")) // login user brand call
      }if(val && type=='file_uploaded')
      toastId.current = toast(" File Uploaded Successfully !!!");
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



const onSelect = (selectedKeys, info) => {
  console.log('hello selected', selectedKeys,'hello info',info);
  if(selectedKeys.length !==0){
  console.log("hello selected match",findNested(treeUpdated, "key", selectedKeys[0])); 

  setSelectedTreeForUpdate(findNested(treeUpdated, "key", selectedKeys[0]))
  }// returns object  selectedKeys  empty dont send
};
const initialValues = {
  name: selectedTreeForUpdate?.title ,
  discription: ""
};

const onSubmit = async (values, formik) => {
  let categoryName = {
    name: values.name.trim(),
  };
  let categoryDiscription = {
    name: values.discription.trim(),
  };
  console.log("val");
  if (categoryName.name === "" || categoryDiscription.name === "" ) {
    notify("err");
  } else {
    let infoData={
      name: categoryName.name,
      // description: categoryDiscription.name,
      // description:brandDescription.name,
      // contactPerson: brandContact.name,
      // emailId: brandEmail.name,
      // mobile: brandMobile.name,
      //  status:brandStatus.name,
      // status: brandByIdData?.isActive
    }
    const apiRes = await updateCategoryApi(infoData);
    if (apiRes === "err") {
      formik.setSubmitting(false);
    } else {
      // notifySucess(true);
      classModal();
    }
  }
};


const { countryData,brandDropdownGet,MarketplaceData } = useSelector(state => {
  // console.log("hello",state)
  return state.onBoardQueryReducer;
});

const changeHandler = (e) => {
  setState({
    ...state,
    [e.target.name]: e.target.value,
  });
  // console.log("hello input",state);
};

const parentHandler = (e) => {
  setParentName(e.target.value);
};
const brandHandler = (e) => {
  
  setBrandName(e.target.value);
};

const categoryNameValidations = () => {
  const nameValid = /^[a-zA-Z\b]+$/;
  if (
    state.categoryName !== "" &&
    state.categoryName !== null &&
    state.categoryName !== undefined
  ) {
    setCategoryNameError(false);
    // console.log("channelNameSuccess");
    return true;
  } else {
    setCategoryNameError(true);
    // console.log("channelNameError");
    return false;
  }
};

const categoryBrandValidations = () => {
  const nameValid = /^[a-zA-Z\b]+$/;
  if (
    brandName !== "" &&
    brandName !== null &&
    brandName !== undefined
  ) {
    setBrandNameError(false);
    // console.log("setBrandNameSuccess");
    return true;
  } else {
    setBrandNameError(true);
    // console.log("setBrandNameError");
    return false;
  }
};

const categoryParentValidations = () => {
  const nameValid = /^[a-zA-Z\b]+$/;
  if (
    parentName !== "" &&
    parentName !== null &&
    parentName !== undefined
  ) {
    setparentNameError(false);
    // console.log("setBrandNameSuccess");
    return true;
  } else {
    setParentNameError(true);
    // console.log("setBrandNameError");
    return false;
  }
};
const categoryDescriptionValidations = () => {
  const nameValid = /^[a-zA-Z\b]+$/;
  if (
    state.categoryDescription !== "" &&
    state.categoryDescription !== null &&
    state.categoryDescription !== undefined
  ) {
    setCategoryDescriptionError(false);
    // console.log("channelNameSuccess");
    return true;
  } else {
    setCategoryDescriptionError(true);
    // console.log("channelNameError");
    return false;
  }
};




const checkValidations = () => {
  // console.log("isChecked");
  if (
    (categoryNameValidations() == true)  &
    (categoryDescriptionValidations() == true)  &
    (categoryBrandValidations() == true)  

  ) {
    return true;
  } else {
    return false;
  }

};

const checkUpdateValidations = () => {
  // console.log("isChecked");
  if (
    (categoryNameValidations() == true) 
    //  &
    // (categoryDescriptionValidations() == true)  &
    // (categoryBrandValidations() == true)  

  ) {
    return true;
  } else {
    return false;
  }

};

const submitHandler = async(e) => {
  e.preventDefault();

  const value = checkValidations();

  if (value === true) {
    // console.log("Inside the channel submit");
    // setSaveclick(true);

     //add true conditions

    const addNewInfo = {
      // new categopry
      //  precedence is zero
      name: state.categoryName,
      description : state.categoryDescription,
      brands : [brandName],
      slug : '' // now empty sending
       // precedence: 

}




  console.log("hello add info", addNewInfo);
  //apis(UpdateInfo)

  dispatch( createCategoryApi(addNewInfo));

const apiRes = await createCategoryApi(addNewInfo);
if (apiRes === "err") {
//  formik.setSubmitting(false);
} else {    
  notify(true,'create')
}
};
  
}




const submitUpdateHandler = async(e) => {
  e.preventDefault();

  const value = checkUpdateValidations();

  if (value === true) {
    // console.log("Inside the channel submit");
    // setSaveclick(true);

    const UpdateInfo = {
      //update categopry name only 
      categoryId: selectedTreeForUpdate?.key,
      name: state.categoryName,

}



// //false
// const addChildInfo ={
//   //precedence is one
//  name: state.categoryName,
//  description : state.categoryDescription,
//  brands : [brandName],
//  parentCategoryId : parentId,
//  slug:"",
//  precedence: 1
// }
// //
// // {
// //   "name": "test2099",
// //   "description": "test2099",
// //   "parentCategoryId": 96,
// //   "brands": [
// //     "Puma"
// //   ],
// //   "slug": "images.jpg",
// // "precedence": 1
// // }
// //
if(!addNewChild){
  console.log("hello update info", UpdateInfo);
  //apis(UpdateInfo)

  dispatch( updateCategoryApi(UpdateInfo));

const apiRes = await updateCategoryApi(UpdateInfo);
if (apiRes === "err") {
//  formik.setSubmitting(false);
} else {    
  notify(true ,'update')
  setState({
    ...state,
    categoryName:'' ,
    categoryDescription :"",
    slug :""
  })
  setBrandName('')
  setParentId('')
  setParentName('')
}
}
 

 // selecteed parent add new child for create category


 if(addNewChild &&selectedTreeForUpdate?.parentCategoryId === null){
  const addFirstChildInfo ={
    //precedence is one
   name: state.categoryName,
   description : state.categoryDescription,
   brands : [brandName],
   parentCategoryId : parentId,
   slug:"",
   precedence: 1
  }


  console.log("hello addFirstChildInfo info", addFirstChildInfo);

  dispatch( createCategoryApi(addFirstChildInfo));

  const apiRes = await createCategoryApi(addFirstChildInfo);
  if (apiRes === "err") {
  //  formik.setSubmitting(false);
  } else {    
    notify(true ,'create')
    setState({
      ...state,
      categoryName:'' ,
      categoryDescription :"",
      slug :""
    })
    setBrandName('')
    setParentId('')
    setParentName('')
    setAddNewChild(false)
  }
  }


if(addNewChild &&selectedTreeForUpdate && parentName ){
  const addChildInfo ={
    //precedence is one
   name: state.categoryName,
   description : state.categoryDescription,
   brands : [brandName],
   parentCategoryId : parentId,
   slug:"",
   precedence: 1
  }


  console.log("hello addChildInfo info", addChildInfo);

  dispatch( createCategoryApi(addChildInfo));

  const apiRes = await createCategoryApi(addChildInfo);
  if (apiRes === "err") {
  //  formik.setSubmitting(false);
  } else {    
    notify(true ,'create')
    setState({
      ...state,
      categoryName:'' ,
      categoryDescription :"",
      slug :""
    })
    setBrandName('')
    setParentId('')
    setParentName('')
    setAddNewChild(false)
  }
  }



};
  
}
useEffect(async () => {
  setState({
    ...state,
    categoryName:'' ,
    categoryDescription :'' ,
    slug :""
  })
  setBrandName('')
  setParentName('')
  setParentId('')

  if(selectedTreeForUpdate){
  setState({
    ...state,
    categoryName:selectedTreeForUpdate?.title ,
    
    slug :""
  })
  setBrandName(selectedTreeForUpdate?.brandName)
  let parentObj=findNestedObj(categoriesData, 'id', selectedTreeForUpdate?.parentCategoryId);
  console.log(parentObj,"parentObj")

  setParentName(parentObj?.name) //selected parent name
  setParentId(selectedTreeForUpdate?.key) // new parent create
  // console.log(selectedTreeForUpdate,"setNewParentId")
  


  }

}, [selectedTreeForUpdate]);


const nullAddField = () => {
  setState({
    ...state,
    categoryName:'' ,
    categoryDescription :"",
    slug :""
  })
  //true or false
  setAddNewChild(true)
  // setBrandName('')
  // setParentName('')
  // setSelectedTreeForUpdate('');
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
            onClick={() => nullAddField()}
            className={`btn btn-sm ${styles.add_button_text}`}
             //Reset the input fields
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
            // title
            switcherIcon={<DownOutlined />}
            // defaultExpandedKeys={['0-0-0']}
            onSelect={onSelect}
            treeData={treeUpdated}
            // sectionRender
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
       {!selectedTreeForUpdate ?(
       <>
        <div className={`card ${styles.category_card}`}>
        <div className="card-body">
         new add  not selected
       
    
         <Form>
         <div className="row">
         <div className="col-4 my-3 ">
              <Form.Group>
               
                <Form.Control
                  type="text"
                  name="categoryName"
                  value={state.categoryName}
                  onChange={changeHandler}
                  required
                  maxLength="250"
                  style={categoryNameError ? { borderColor: "red" } : {}}
                  placeholder="Name"
                  // disabled={disabled}
                />
                {categoryNameError ? (
                  <p style={{ color: "red" }}> ** Please enter Category Name </p>
                ) :state.categoryName && state.categoryName.length === 100 ? (
                  <p style={{ color: "red" }}> Max 100 Characters</p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </div>
          
  
        <div className="col-4 my-3">
          <Form.Group>
          
            <Form.Control
              as="select"
              name="ParentId"
           
             value={parentName}
              // onChange={(e) => parentHandler(e)}
              required
              style={parentNameError ? { borderColor: "red" } : {}}
              disabled={true}
            >
              <option value="">Parent Category </option>
              {/* {
                ParentData &&
                ParentData?.map((item, i) => {
                  return (
                    <option key={item.value}>{item.label}</option>
                  );
                })
                } */}
            </Form.Control>
            {parentNameError ? (
                  <p style={{ color: "red" }}>** Please choose Parent Category</p>
                ) : (
                  <p></p>
                )}
           
          </Form.Group>
        </div>
        
      
        <div className="col-4 my-3">
          <Form.Group>
          
            <Form.Control
              as="select"
              name="subCategoryNameId"
              value={'subCategoryName'}
              // onChange={(e) => brandHandler(e)}
              required
              // style={brandNameError ? { borderColor: "red" } : {}}
              // disabled={disabled}
              disabled={true}

            >
              <option value="">Sub Category</option>
              {/* {
                brandDropdownGet &&
                brandDropdownGet.map((item, i) => {
                  return (
                    <option key={item.value}>{item.label}</option>
                  );
                })
                } */}
            </Form.Control>
            {/* {brandNameError ? (
                  <p style={{ color: "red" }}>** Please choose Sub category</p>
                ) : (
                  <p></p>
                )} */}
          </Form.Group>
        </div>
        </div>
        <div className="row">
        <div className="col-4 my-3">
        <Form.Group>
               
                <Form.Control
                  type="text"
                  name="Slug"
                  value={state.slug}
                  onChange={changeHandler}
                  required
                  maxLength="250"
                  style={slugError ? { borderColor: "red" } : {}}
                  placeholder="Slug"
                 
                  disabled={true}
                />
                {slugError ? (
                  <p style={{ color: "red" }}> ** Please enter Slug </p>
                ) :state.slug && state.slug.length === 100 ? (
                  <p style={{ color: "red" }}> Max 100 Characters</p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
        </div>
        <div className="col-4 my-3">
      
        <Form.Group>
            {/* <Form.Label>
              <span> Brand </span>
            </Form.Label> */}
            <Form.Control
              as="select"
              name="brandNameId"
              value={brandName}
              onChange={(e) => brandHandler(e)}
              required
              style={brandNameError ? { borderColor: "red" } : {}}
              // disabled={disabled}
            >
              <option value="">Brand</option>
              {
                brandDropdownGet &&
                brandDropdownGet.map((item, i) => {
                  return (
                    <option key={item.value}>{item.label}</option>
                  );
                })
                }
            </Form.Control>
            {brandNameError ? (
                  <p style={{ color: "red" }}>** Please choose brand</p>
                ) : (
                  <p></p>
                )}
          </Form.Group>


        </div>
     </div>

     <div className="row">
    
        <div className={`col-4 category_dropZone my-3`}>
          <div className="dropZone-container">
            
        <Dropzone onDrop={onDrop}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} class="dropzone col-2 p-3 text-end align-self-center d-flex">
                    <input {...getInputProps()} />
                    {
                     
                    }
                    <div className='upload_placeholder upload_blk'>

                   
                       <div>
                        <Image
                        className="px-2"
                        src={folder}
                        alt="folder"
                        width={40}
                        height={35}
                        // onClick={() => {
                        //   setShowBrandCreationForm(true)
                        // }}
                        />
                        </div>
                    <div>Image Upload</div>
                    </div>
                  </div>
                )}
              </Dropzone>
              </div>
        </div>
        <div className="col-8 my-3">
        <Form.Group>

            <Form.Control as="textarea"
            placeholder="Category Descriptions..."
            name="categoryDescription"
            rows="5"
            onChange={changeHandler}
            style={categoryDescriptionError ? { borderColor: "red" } : {}}
            
            />
              {categoryDescriptionError ? (
                  <p style={{ color: "red" }}> ** Please enter Descriptions </p>
                ) :state.categoryDescription && state.categoryDescription.length === 100 ? (
                  <p style={{ color: "red" }}> Max 100 Characters</p>
                ) : (
                  <p></p>
                )}
        </Form.Group>


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
                  onClick={submitHandler}
                    type="submit"
                    name="Submit"
                    className={`btn btn-sm py-1 px-4 br3 mx-2 ${styles.submit_button}`}
                  />
            </div>
        </div>
         </Form>
        
        </div>
      </div>
       </>):(
        <>
        submitUpdateHandler
        <div className={`card ${styles.category_card}`}>
        <div className="card-body">
        <Form>
         <div className="row">
         <div className="col-4 my-3 ">
              <Form.Group>
               
                <Form.Control
                  type="text"
                  name="categoryName"
                  value={state.categoryName}
                  onChange={changeHandler}
                  required
                  maxLength="250"
                  style={categoryNameError ? { borderColor: "red" } : {}}
                  placeholder="Name"
                  // disabled={disabled}
                />
                {categoryNameError ? (
                  <p style={{ color: "red" }}> ** Please enter Category Name </p>
                ) :state.categoryName && state.categoryName.length === 100 ? (
                  <p style={{ color: "red" }}> Max 100 Characters</p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </div>
          
  
        <div className="col-4 my-3">

          {parentName ?(<>
            <Form.Group>
               
                <Form.Control
                  type="text"
                  name="parentNameselected"
                  value={parentName}
                  // onChange={changeHandler}
                  required
                  // maxLength="250"
                  // style={categoryNameError ? { borderColor: "red" } : {}}
                  placeholder="Name"
                  disabled={true}
                />
                {/* {categoryNameError ? (
                  <p style={{ color: "red" }}> ** Please enter Category Name </p>
                ) :state.categoryName && state.categoryName.length === 100 ? (
                  <p style={{ color: "red" }}> Max 100 Characters</p>
                ) : (
                  <p></p>
                )} */}
              </Form.Group>
          </>):(<>
            <Form.Group>
          
            <Form.Control
              as="select"
              name="ParentId"
               value={parentName}
              // onChange={(e) => parentHandler(e)}
              required
              style={parentNameError ? { borderColor: "red" } : {}}
              // disabled={disabled}
              disabled={!parentName ? true  : false}

            >
              <option value="">Parent Category </option>
              {/* {
                ParentData &&
                ParentData?.map((item, i) => {
                  return (
                    <option key={item.value}>{item.label}</option>
                  );
                })ś
                } */}
            </Form.Control>
            {parentNameError ? (
                  <p style={{ color: "red" }}>** Please choose Parent Category</p>
                ) : (
                  <p></p>
                )}
           
          </Form.Group>
          </>)}
       
        </div>
        
      
        <div className="col-4 my-3">

        {parentName ?(<>
            <Form.Group>
               
                <Form.Control
                  type="text"
                  name="subParentNameselected"
                  value={selectedTreeForUpdate?.title }
                  // onChange={changeHandler}
                  required
                  // maxLength="250"
                  // style={categoryNameError ? { borderColor: "red" } : {}}
                  placeholder="Name"
                  disabled={true}
                />
                {/* {categoryNameError ? (
                  <p style={{ color: "red" }}> ** Please enter Category Name </p>
                ) :state.categoryName && state.categoryName.length === 100 ? (
                  <p style={{ color: "red" }}> Max 100 Characters</p>
                ) : (
                  <p></p>
                )} */}
              </Form.Group>
          </>):(<>
            <Form.Group>
          
            <Form.Control
              as="select"
              name="subCategoryNameId"
              // value={subCategoryName}
              // onChange={(e) => brandHandler(e)}
              required
              // style={brandNameError ? { borderColor: "red" } : {}}
              // disabled={disabled}
              disabled="true"
            >
              <option value="">Sub Category</option>
              {/* {
                brandDropdownGet &&
                brandDropdownGet.map((item, i) => {
                  return (
                    <option key={item.value}>{item.label}</option>
                  );
                })
                } */}
            </Form.Control>
            {/* {brandNameError ? (
                  <p style={{ color: "red" }}>** Please choose Sub category</p>
                ) : (
                  <p></p>
                )} */}
          </Form.Group>
          </>)}
       
        </div>
        </div>
        <div className="row">
        <div className="col-4 my-3">
        <Form.Group>
               
                <Form.Control
                  type="text"
                  name="Slug"
                  value={state.slug}
                  onChange={changeHandler}
                  required
                  maxLength="250"
                  style={slugError ? { borderColor: "red" } : {}}
                  placeholder="Slug"
                  disabled="true"
                  // disabled={disabled}
                />
                {slugError ? (
                  <p style={{ color: "red" }}> ** Please enter Slug </p>
                ) :state.slug && state.slug.length === 100 ? (
                  <p style={{ color: "red" }}> Max 100 Characters</p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
        </div>
        <div className="col-4 my-3">
      
        <Form.Group>
            {/* <Form.Label>
              <span> Brand </span>
            </Form.Label> */}
            <Form.Control
              as="select"
              name="brandNameId"
              value={brandName}
              onChange={(e) => brandHandler(e)}
              required
              style={brandNameError ? { borderColor: "red" } : {}}
             
              disabled={!addNewChild ? true  : false}
              // disabled="true"
            >
              <option value="">Brand</option>
              {
                brandDropdownGet &&
                brandDropdownGet.map((item, i) => {
                  return (
                    <option key={item.value}>{item.label}</option>
                  );
                })
                }
            </Form.Control>
            {brandNameError ? (
                  <p style={{ color: "red" }}>** Please choose brand</p>
                ) : (
                  <p></p>
                )}
          </Form.Group>


        </div>
     </div>

     <div className="row">
    
        <div className={`col-4 category_dropZone my-3`}>
          <div className="dropZone-container">
            
        <Dropzone onDrop={onDrop}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} class="dropzone col-2 p-3 text-end align-self-center d-flex">
                    <input {...getInputProps()} />
                    {
                     
                    }
                    <div className='upload_placeholder upload_blk'>

                   
                       <div>
                        <Image
                        className="px-2"
                        src={folder}
                        alt="folder"
                        width={40}
                        height={35}
                        // onClick={() => {
                        //   setShowBrandCreationForm(true)
                        // }}
                        />
                        </div>
                    <div>Image Upload</div>
                    </div>
                  </div>
                )}
              </Dropzone>
              </div>
        </div>
        <div className="col-8 my-3">
        <Form.Group>

            <Form.Control as="textarea"
            placeholder="Category Descriptions..."
            name="categoryDescription"
            rows="5"
            onChange={changeHandler}
            // style={categoryDescriptionError ? { borderColor: "red" } : {}}
            disabled={!addNewChild ? true  : false}

            
            />
              {/* {categoryDescriptionError ? (
                  <p style={{ color: "red" }}> ** Please enter Descriptions </p>
                ) :state.categoryDescription && state.categoryDescription.length === 100 ? (
                  <p style={{ color: "red" }}> Max 100 Characters</p>
                ) : (
                  <p></p>
                )} */}
        </Form.Group>


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
                  onClick={submitUpdateHandler}
                    type="submit"
                    name="Submit"
                    className={`btn btn-sm py-1 px-4 br3 mx-2 ${styles.submit_button}`}
                  />
            </div>
        </div>
         </Form>
        </div>
        </div>
        </>
       )}
      
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
          <CategoryForm
            classModal={() => setShowBrandCreationForm(false)}
            onSuccess={onBrandCreationSuccess}
            notifySucess={() => notify(true)}
            type={selectedTreeForUpdate}
         
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
