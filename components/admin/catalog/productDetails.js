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
        <p> No Record found</p>
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
              <TabPane tab="Amazon" key="3">{shopifyAttributeRender()}</TabPane>
              <TabPane tab="Images" key="4">{shopifyAttributeRender()}</TabPane>
             </Tabs>
        </Fragment>
      
    )
}

export default React.memo(ProductDetail);