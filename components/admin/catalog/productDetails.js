import React, { Fragment, useState, useMemo, useEffect } from "react";
import { Navbar, Container } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from 'next/router'
import { Row, Col, Form, Button } from "react-bootstrap";

// import { Tabs } from 'antd';
import FormikControl from "../../../components/public/formik/formikControl";
// import { Form, Formik } from "formik";
import styles from "../../../components/public/common.module.css";
import { Tabs } from 'antd';
import {  getProductPimCodeApi } from "../../../redux/actions/catalogQuery";//testing

import { useDispatch, useSelector } from "react-redux";


function ProductDetail() {
  const TabPane = Tabs.TabPane;
  const { query } = useRouter();
  const dispatch = useDispatch();
 const [codeBrand, setCodeBrand] = useState([]);
 const [state, setState] = useState();


const changeHandler = (e) => {
  setState({
    ...state,
    [e.target.name]: e.target.value,
  });

};

 useEffect(() => {
  setCodeBrand(query.list) //testing
}, []);

useEffect(() => {
  if (
    codeBrand  &&
    codeBrand !== null &&
    codeBrand !== undefined &&
    Object.keys( codeBrand).length !== 0

  ) {
// console.log(codeBrand,"codeBrand")
const info = codeBrand?.split("/");
// console.log("split 1",info[1])
// console.log("split 2",info[2])
dispatch(getProductPimCodeApi(info[1],info[2])); //testing //pim code and brand name

  }
  
}, [codeBrand]);
 
 

const { productPimCodeData } = useSelector(state => {
  // console.log("hello",state)
  return state.catalogQueryReducer;
});
  
  // console.log("hello productPimCodeData",productPimCodeData)


  const shopifydata= {
    "pimShopifyModelSku": {
      "Shopify": {
        "xyz": [
          {
            "displayName": "Vendor",
            "keyName": "vendor",
            "value": "APOLLO RI",
            "mutable": true
          },
          {
            "displayName": "Title",
            "keyName": "title",
            "value": "SUZUKI",
            "mutable": true
          },
          {
            "displayName": "Status",
            "keyName": "status",
            "value": "Active",
            "mutable": true
          },
          {
            "displayName": "Product_type",
            "keyName": "product_type",
            "value": "",
            "mutable": true
          },
          {
            "displayName": "Tags",
            "keyName": "tags",
            "value": "Tag3,Tag4",
            "mutable": true
          },
          {
            "displayName": "ProductImage",
            "keyName": "productImage",
            "value": "",
            "mutable": true
          },
          {
            "displayName": "ProductUrl",
            "keyName": "productUrl",
            "value": "diet-coke",
            "mutable": true
          },
          {
            "displayName": "Price",
            "keyName": "price",
            "value": "",
            "mutable": true
          },
          {
            "displayName": "Sku",
            "keyName": "sku",
            "value": "DTE1000",
            "mutable": true
          },
          {
            "displayName": "Position",
            "keyName": "position",
            "value": "ml",
            "mutable": true
          },
          {
            "displayName": "UOMValue",
            "keyName": "uomValue",
            "value": "300",
            "mutable": true
          },
          {
            "displayName": "PkgType",
            "keyName": "pkgType",
            "value": "box",
            "mutable": true
          },
          {
            "displayName": "PkgQty",
            "keyName": "pkgQty",
            "value": "10",
            "mutable": true
          },
          {
            "displayName": "Mrp",
            "keyName": "mrp",
            "value": "400",
            "mutable": true
          },
          {
            "displayName": "UPC",
            "keyName": "upc",
            "value": "UP32423",
            "mutable": true
          },
          {
            "displayName": "ExpiryDate",
            "keyName": "expiryDate",
            "value": "20-02-2024",
            "mutable": true
          },
          {
            "displayName": "Manufacturer",
            "keyName": "manufacturer",
            "value": "stepto",
            "mutable": true
          },
          {
            "displayName": "ManufacturerLocation",
            "keyName": "manufacturingLocation",
            "value": "mumbai",
            "mutable": true
          },
          {
            "displayName": "ManufactureDate",
            "keyName": "manufacturedDate",
            "value": "12-01-2022",
            "mutable": true
          },
          {
            "displayName": "BatchNo",
            "keyName": "batchNo",
            "value": "BCH_123",
            "mutable": true
          },
          
          {
            "displayName": "Comments",
            "keyName": "comments",
            "value": "Test comments",
            "mutable": true
          },
          {
            "displayName": "IsVariant",
            "keyName": "isVariant",
            "value": "Y",
            "mutable": true
          },
           {
            "displayName": "Weight",
            "keyName": "weight",
            "value": "89",
            "mutable": true
          },
           {
            "displayName": "Weight_unit",
            "keyName": "weight_unit",
            "value": "Kg",
            "mutable": true
          }
        ]
      }
    },
   
  }
  

  const sectionShopifyRender = screenType => {
            return shopifydata?.pimShopifyModelSku?.Shopify?.xyz.map((item, index) => {
      
                if (screenType === "DESKTOP") {
     
                    return inputRender(item, index);
                }
             
            });
        };

   

    
    


  const sectionRender = screenType => {
            return productPimCodeData?.pimModelSku?.Master?.xyz.map((item, index) => {
      
                if (screenType === "DESKTOP") {
     
                    return inputRender(item, index);
                }
             
            });
        };

   

    const inputRender = (sectionItem, index) => {
            return (

               
            <div className="col-sm-3 " style={{ marginBottom: "1rem" }}key={index}>
              <Form.Group>
                <Form.Label>
                  <span className=".font12">{sectionItem.displayName}</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="channelName"
                  value={sectionItem.value}
                  onChange={changeHandler}
                  required
                  maxLength="250"
                  // style={channelNameError ? { borderColor: "red" } : {}}
                  placeholder={sectionItem.keyName}
                  // disabled={sectionItem.mutable}
                />
               
              </Form.Group>
            </div>
            );
        };
    
    
 

  
    const attributeRender=()=>{
        return (
          <>
          <div className={styles.main_Attri}> 
                    <div className="row ">
                         <div className="col-12 ">
                             <p className="sub_title_name">Bussiness Attributes</p>
                         </div>
                       
                     </div>
                     <Form>
         <Row style={{ marginBottom: ".2rem" }}>
         {sectionRender('DESKTOP')}
            </Row>
        
            </Form>
     
                   
         </div>
         <div className={styles.main_Attri}> 
                    <div className="row ">
                         <div className="col-12 ">
                             <p className="sub_title_name">Marketing Attributes</p>
                         </div>
                       
                     </div>
                     <Form>

                     <Row style={{ marginBottom: ".2rem" }}>
         <div className="col-sm-3 ">
              <Form.Group>
                <Form.Label>
                  {/* <span className=".font12">Channel Name</span> */}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="channelName"
                  // value={state.channelName}
                  // onChange={changeHandler}
                  required
                  maxLength="250"
                  // style={channelNameError ? { borderColor: "red" } : {}}
                  placeholder="Product Name"
                  // disabled={disabled}
                />
               
              </Form.Group>
            </div>
            <div className="col-sm-3 ">
              <Form.Group>
                <Form.Label>
                  {/* <span className=".font12">Channel Name</span> */}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="channelName"
                  // value={state.channelName}
                  // onChange={changeHandler}
                  required
                  maxLength="250"
                  // style={channelNameError ? { borderColor: "red" } : {}}
                  placeholder="Product Name"
                  // disabled={disabled}
                />
               
              </Form.Group>
            </div>
            <div className="col-sm-3 ">
              <Form.Group>
                <Form.Label>
                  {/* <span className=".font12">Channel Name</span> */}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="channelName"
                  // value={state.channelName}
                  // onChange={changeHandler}
                  required
                  maxLength="250"
                  // style={channelNameError ? { borderColor: "red" } : {}}
                  placeholder="Product Name"
                  // disabled={disabled}
                />
               
              </Form.Group>
            </div>
            </Row>
            <Row style={{ marginBottom: ".2rem" }}>
         <div className="col-sm-3 ">
              <Form.Group>
                <Form.Label>
                  {/* <span className=".font12">Product Name</span> */}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="channelName"
                  // value={state.channelName}
                  // onChange={changeHandler}
                  required
                  maxLength="250"
                  // style={channelNameError ? { borderColor: "red" } : {}}
                  placeholder="Product Name"
                  // disabled={disabled}
                />
               
              </Form.Group>
            </div>
            <div className="col-sm-3 ">
              <Form.Group>
                <Form.Label>
                  {/* <span className=".font12">Channel Name</span> */}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="channelName"
                  // value={state.channelName}
                  // onChange={changeHandler}
                  required
                  maxLength="250"
                  // style={channelNameError ? { borderColor: "red" } : {}}
                  placeholder="Product Name"
                  // disabled={disabled}
                />
               
              </Form.Group>
            </div>
            <div className="col-sm-3 ">
              <Form.Group>
                <Form.Label>
                  {/* <span className=".font12">Channel Name</span> */}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="channelName"
                  // value={state.channelName}
                  // onChange={changeHandler}
                  required
                  maxLength="250"
                  // style={channelNameError ? { borderColor: "red" } : {}}
                  placeholder="Product Name"
                  // disabled={disabled}
                />
               
              </Form.Group>
            </div>
            </Row>
            </Form>
     
                   
         </div>
         <div className="button_section">
             <div className={styles.add_buttons}>
                 <div className="col-2 p-3 text-end align-self-center">
                 <button
                    //  onClick={() => setShowBrandCreationForm(true)}
                     className={`btn btn-sm ${styles.add_button_text}`}
     
                 >
                     {/* <img src="/icons/add.png" alt="add-icon" /> */}
                     + New Group
                 </button>
                 </div>
                 <div className="col-2 p-3 ">
                 <button
                    //  onClick={() => setShowBrandCreationForm(true)}
                     className={`btn btn-sm ${styles.add_button_text}`}
     
                 >
                     {/* <img src="/icons/add.png" alt="add-icon" /> */}
                     + New Attribute
                 </button>
                 </div>
             </div>
       
         </div>
         
           </>
        )
    }

    const shopifyAttributeRender=()=>{
      return(
        <>
        <div className={styles.main_Attri}> 
                  <div className="row ">
                       <div className="col-12 ">
                           <p className="sub_title_name">Bussiness Attributes</p>
                       </div>
                     
                   </div>
                   <Form>
       <Row style={{ marginBottom: ".2rem" }}>
       {sectionShopifyRender('DESKTOP')}
          </Row>
      
          </Form>
   
                 
       </div>
      
       
         </>
      )
    }

    
    const amazonAttributeRender=()=>{
      return(
        <>
        <div>
        No Record Found
        </div>
      
        </>
      )
    }
    const imagesAttributeRender=()=>{
      return(
        <>
        <div>
        No Record Found
        </div>
      
        </>
      )
    }
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


   
  function selectedTab(key) {
    console.log(key);
  }

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 p-0">
                     <p className="title_name">Product Detail</p>
                </div>
            </div>
             <Tabs onChange={selectedTab} type="card">
              <TabPane tab="Master" key="1">{attributeRender()}</TabPane>
              <TabPane tab="Shopify" key="2">{shopifyAttributeRender()}</TabPane>
              <TabPane tab="Amazon" key="3">{amazonAttributeRender()}</TabPane>
              <TabPane tab="Images" key="4">{imagesAttributeRender()}</TabPane>
             </Tabs>
        </Fragment>
      
    )
}

export default React.memo(ProductDetail);