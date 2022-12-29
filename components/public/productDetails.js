import React, { Fragment, useState, useMemo } from "react";
import { Navbar, Container } from "react-bootstrap";
import Link from "next/link";
import { Tabs } from 'antd';
import FormikControl from "../public/formik/formikControl";
import { Form, Formik } from "formik";
import styles from "./common.module.css";

function ProductDetail() {
    const attributeRender=()=>{
        return (<>
        <div className="main_Attri"> 
            <div className="row">
                    <div className="col-12 p-0">
                        <p className="sub_title_name">Bussiness Attributes</p>
                    </div>
                </div>
        </div>
        </>)
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


   
  const initialItems = [
    {
      label: 'Default',
      children: (
      <>
     <div className={styles.main_Attri}> 
               <div className="row ">
                    <div className="col-12 ">
                        <p className="sub_title_name">Bussiness Attributes</p>
                    </div>
                  
                </div>
                <div className="row">
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({ isSubmitting }) => {
                        return (
                        
                        <Form className="mx-0 font12">
                            <div className="row w-80">
                            <div className="col-3  ">
                            <FormikControl
                            control="input"
                            type="input"
                            classprops="form-group mb-3 col-md-12"
                            className="form-control form-control-sm px-0 py-2 text-center border-0"
                            placeholder="Product Name"
                            name="Name"
                            id="Name"
                            />
                            </div>
                            <div className="col-3  ">
                            <FormikControl
                            control="input"
                            type="input"
                            classprops="form-group mb-3 col-md-12"
                            className="form-control form-control-sm px-0 py-2 text-center border-0"
                              placeholder="Product Name"
                            name="Name"
                            id="Name"
                            />
                            </div>
                        <div className="col-3  ">
                            <FormikControl
                            control="input"
                            type="input"
                            classprops="form-group mb-3 col-md-12"
                            className="form-control form-control-sm px-0 py-2 text-center border-0"
                              placeholder="Product Name"
                            name="Name"
                            id="Name"
                            />
                            </div>
                            <div className="col-3  ">
                            <FormikControl
                            control="input"
                            type="input"
                            classprops="form-group mb-3 col-md-12"
                            className="form-control form-control-sm px-0 py-2 text-center border-0"
                              placeholder="Product Name"
                            name="Name"
                            id="Name"
                            />
                            </div>
                            </div>
                            <div className="row w-80">
                            <div className="col-3  ">
                            <FormikControl
                            control="input"
                            type="input"
                            classprops="form-group mb-3 col-md-12"
                            className="form-control form-control-sm px-0 py-2 text-center border-0"
                              placeholder="Product Name"
                            name="Name"
                            id="Name"
                            />
                            </div>
                            <div className="col-3  ">
                            <FormikControl
                            control="input"
                            type="input"
                            classprops="form-group mb-3 col-md-12"
                            className="form-control form-control-sm px-0 py-2 text-center border-0"
                              placeholder="Product Name"
                            name="Name"
                            id="Name"
                            />
                            </div>
                        <div className="col-3  ">
                            <FormikControl
                            control="input"
                            type="input"
                            classprops="form-group mb-3 col-md-12"
                            className="form-control form-control-sm px-0 py-2 text-center border-0"
                              placeholder="Product Name"
                            name="Name"
                            id="Name"
                            />
                            </div>
                            <div className="col-3  ">
                            <FormikControl
                            control="input"
                            type="input"
                            classprops="form-group mb-3 col-md-12"
                            className="form-control form-control-sm px-0 py-2 text-center border-0"
                              placeholder="Product Name"
                            name="Name"
                            id="Name"
                            />
                            </div>
                            </div>


                        </Form>
                        );
                    }}
                    </Formik>  
         
              </div>

              
    </div>
    <div className={styles.main_Attri}> 
               <div className="row ">
                    <div className="col-12 ">
                        <p className="sub_title_name">Marketing Attributes</p>
                    </div>
                  
                </div>
                <div className="row">
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({ isSubmitting }) => {
                        return (
                        
                        <Form className="mx-0 font12">
                            <div className="row w-80">
                            <div className="col-3  ">
                            <FormikControl
                            control="input"
                            type="input"
                            classprops="form-group mb-3 col-md-12"
                            className="form-control form-control-sm px-0 py-2 text-center border-0"
                              placeholder="Product Name"
                            name="Name"
                            id="Name"
                            />
                            </div>
                        <div className="col-3  ">
                            <FormikControl
                            control="input"
                            type="input"
                            classprops="form-group mb-3 col-md-12"
                            className="form-control form-control-sm px-0 py-2 text-center border-0"
                              placeholder="Product Name"
                            name="Name"
                            id="Name"
                            />
                            </div>
                            <div className="col-3 ">
                            <FormikControl
                            control="input"
                            type="input"
                            classprops="form-group mb-3 col-md-12"
                            className="form-control form-control-sm px-0 py-2 text-center border-0"
                              placeholder="Product Name"
                            name="Name"
                            id="Name"
                            />
                            </div>
                            </div>
                            <div className="row w-80">
                            <div className="col-3 ">
                            <FormikControl
                            control="input"
                            type="input"
                            classprops="form-group mb-3 col-md-12"
                            className="form-control form-control-sm px-0 py-2 text-center border-0"
                              placeholder="Product Name"
                            name="Name"
                            id="Name"
                            />
                            </div>
                        <div className="col-3  ">
                            <FormikControl
                            control="input"
                            type="input"
                            classprops="form-group mb-3 col-md-12"
                            className="form-control form-control-sm px-0 py-2 text-center border-0"
                              placeholder="Product Name"
                            name="Name"
                            id="Name"
                            />
                            </div>
                            <div className="col-3  ">
                            <FormikControl
                            control="input"
                            type="input"
                            classprops="form-group mb-3 col-md-12"
                            className="form-control form-control-sm px-0 py-2 text-center border-0"
                              placeholder="Product Name"
                            name="Name"
                            id="Name"
                            />
                            </div>
                            </div>


                        </Form>
                        );
                    }}
                    </Formik>  
         
              </div>

              
    </div>
    <div className="button_section">
        <div className={styles.add_buttons}>
            <div className="col-2 p-3 text-end align-self-center">
            <button
                onClick={() => setShowBrandCreationForm(true)}
                className={`btn btn-sm ${styles.add_button_text}`}

            >
                {/* <img src="/icons/add.png" alt="add-icon" /> */}
                + New Group
            </button>
            </div>
            <div className="col-2 p-3 ">
            <button
                onClick={() => setShowBrandCreationForm(true)}
                className={`btn btn-sm ${styles.add_button_text}`}

            >
                {/* <img src="/icons/add.png" alt="add-icon" /> */}
                + New Group
            </button>
            </div>
        </div>
  
    </div>
      </>),
      key: '1',
    },
    {
      label: 'Shopify',
      children: ' Shopify Content of Tab 2',
      key: '2',
    },
    {
      label: 'Amazon',
      children: ' Amazon Content of Tab 3',
      key: '3'
    },
    {
      label: 'Gallery',
      children: 'Gallery Content of Tab 4',
      key: '4'
    },
  ];
const [activeKey, setActiveKey] = useState(initialItems[0].key);
const [items, setItems] = useState(initialItems);

  const onChange = (newActiveKey) => {
    console.log("hello newActiveKey",newActiveKey)
    // setActiveKey(newActiveKey);
  };



    return (
        <Fragment>
            <div className="row">
                <div className="col-12 p-0">
                     <p className="title_name">Product Detail</p>
                </div>
            </div>
             <Tabs
                onChange={onChange}
                type="card"
                items={items}
            />
        </Fragment>
      
    )
}

export default React.memo(ProductDetail);