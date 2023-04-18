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

import SubmitButton from "../../public/formik/submitButton";


function ProductDetail() {
  const TabPane = Tabs.TabPane;
  const { query } = useRouter();
  const dispatch = useDispatch();
 const [codeBrand, setCodeBrand] = useState([]);
 const [stateInput, setStateInput] = useState();
 const [channelData, setChannelData] = useState();
 const [shopifyChannelData, setShopifyChannelData] = useState();

 

 const [checkUpdate, setcheckUpdate]= useState(false);

const InputChangeHandler = (e) => {
 
  setStateInput({
    ...stateInput,
    [e.target.name]: e.target.value,
  });
  setcheckUpdate(true)
}

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
  
//useEffect(() =>{
//   const inputState = new Object()
//   productPimCodeData?.master?.modelAttributes?.General.forEach((item) => {
//     return inputState[item.keyName] = item.value
//   })

//   setStateInput(inputState);



// }, [productPimCodeData])
  console.log("hello shopifyChannelData",shopifyChannelData)

  useEffect(() =>{

    if(!productPimCodeData.master){
      return ;
    }

    // mapping the master.modelAttributes for input field
    const obj=productPimCodeData.master.modelAttributes;
    const inputState = new Object()
    Object.entries(obj).forEach(value => {

      value.forEach((val ) => {
      inputState[val.keyName] = val.value
     })
    });
  
    setStateInput(inputState);
 
  
  }, [productPimCodeData])
    console.log("hello stateInput",stateInput)


  useEffect(() => {
    // / mapping the master.channel tab for input field
    if( productPimCodeData?.channel!== undefined &&
      productPimCodeData?.channel !== null &&
      productPimCodeData?.channel){
        const dynamicMapObject = Object.keys(productPimCodeData?.channel).reduce((result, key) => {
          result[key] = productPimCodeData?.channel[key];
          return result;
          }, {});
          // console.log("hello cccccccc",dynamicMapObject);
     
           const data2 = Object.entries(dynamicMapObject);
          let result={};
          for(let [key, {value}] of data2) {
            result[key] = value;
          }
          /* console.log("result",result); */
            
            // console.log("ddddddddddddddd",data2)
            setChannelData(data2)
      }
    
      


  }, [productPimCodeData]);


const sectionChannelRender = screenType => {
  if(screenType==="SHOPIFY"){
    if(!productPimCodeData?.channel?.SHOPIFY?.modelAttributes){
        return ;
      }

const obj2=productPimCodeData?.channel?.SHOPIFY?.modelAttributes;
return Object.entries(obj2).map(([key, value]) => {
  console.log("hello 1",key,value)
  return  value.map((val, index) => {
    // if (screenType === "DESKTOP") {
      return inputChannelRender(val);
    //  }
    })

});

        }
   if(screenType==="amazon"){
          if(!productPimCodeData?.channel?.amazon?.modelAttributes){
              return ;
            }
      
      const obj2=productPimCodeData?.channel?.amazon?.modelAttributes;
      return Object.entries(obj2).map(([key, value]) => {
        console.log("hello 1",key,value)
        return  value.map((val, index) => {
          // if (screenType === "DESKTOP") {
            return inputChannelRender(val);
          //  }
          })
      
      });
      
              }
  }; 


const inputChannelRender = (sectionItem, index) => {
      // console.log("hello sectionItem",sectionItem)
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
                    // onChange={changeHandler}
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
      

    
     // set value in input filed  in master attribute
  const getInputValue = (keyName) =>{
   try{
      return stateInput[keyName]
   }catch(error){
    return ''
   } 
  }
  const submitInputHandler = async (e) => {
    e.preventDefault();
    console.log("hello input called")
    setcheckUpdate(false)

  }

  // master input render
  const sectionMasterRender = screenType => {
    if(!productPimCodeData.master){
      return ;
    }
    const obj=productPimCodeData.master.modelAttributes;
     return Object.entries(obj).map(([key, value]) => {
    console.log("key",value)
    return  value.map((val, index) => {
      if (screenType === "DESKTOP") {
     
        return inputMasterRender(val, index);
       }
  
     })
    });


 



     };

    const inputMasterRender = (sectionItem, index) => {
           

      // console.log("sectionItem",sectionItem)
            return (

               
            <div className="col-sm-3 " style={{ marginBottom: "1rem" }}key={index}>
              <Form.Group>
                <Form.Label>
                  <span className=".font12">{sectionItem.displayName}</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name={sectionItem.keyName}
                  value={getInputValue(sectionItem.keyName)}
                  onChange={InputChangeHandler}
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
    
//  *   //
//sku render
    const sectionSkuRender = screenType => {
      if(!productPimCodeData.master){
        return ;
      }
      const obj2=productPimCodeData.master.skuAttributes;
      return Object.entries(obj2).map(([key, value]) => {
      return Object.entries(value).map(([key, val]) => {

      return  val.map((sku, index) => {
     console.log("key2222",sku)

       if (screenType === "DESKTOP") {
         return inputSkuRender2(sku);
        }
       })
      })
     });
       };

       const inputSkuRender2 = (sectionItem, index) => {
           

        console.log("sectionItemmm",sectionItem)
              return (
  
       
                 
              <div className="col-sm-3 " style={{ marginBottom: "1rem" }}key={index}>
                <Form.Group>
                  <Form.Label>
                    <span className=".font12">{sectionItem.displayName}</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name={sectionItem.keyName}
                    value={getInputValue(sectionItem.keyName)}
                    onChange={InputChangeHandler}
                     
                    maxLength="250"
                    // style={channelNameError ? { borderColor: "red" } : {}}
                    placeholder={sectionItem.keyName}
                    // disabled={sectionItem.mutable}
                  />
                 
                </Form.Group>
              </div>
      
              );
          };
      
//    *   //



    const attributeMasterRender=()=>{
        return (
          <>
          <div className={styles.main_Attri}> 
                    <div className="row ">
                         <div className="col-12 ">
           
                             <p className="sub_title_name">modelAttributes</p>
                         </div>
                       
                     </div>
                     <Form>
         <Row style={{ marginBottom: ".2rem" }}>
         {sectionMasterRender('DESKTOP')}
            </Row>
            {checkUpdate &&
               <div className="col-12 text-center pt-3">
               {/* <SubmitButton
                 onClick={ setcheckUpdate(false)}
                 type="button"
                 name="CANCEL"
                 className="btn btn-sm save_btn_secondary py-1 px-5 br3"
               /> */}
               <SubmitButton
                onClick={submitInputHandler}
                 type="submit"
                 name="UPDATE"
                 className="btn btn-sm save_btn_secondary py-1 px-5 br3 mx-2"
               />
             </div>
            }
            </Form>
     
                   
         </div>
         <div className={styles.main_Attri}> 
                    <div className="row ">
                         <div className="col-12 ">
                             <p className="sub_title_name">skuAttributes</p>
                         </div>
                       
                     </div>
                     <Form>

                     <Row style={{ marginBottom: ".2rem" }}>
                     {sectionSkuRender('DESKTOP')}
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
    const channelAttributeRender=(channelType)=>{
    
      return(
        <>
        <div className={styles.main_Attri}> 
                  <div className="row ">
                       <div className="col-12 ">
                           <p className="sub_title_name">modelAttributes</p>
                       </div>
                     
                   </div>
                   <Form>
       <Row style={{ marginBottom: ".2rem" }}>
       {sectionChannelRender(channelType)}
          </Row>
      
          </Form>
   
                 
       </div>
       <div className={styles.main_Attri}> 
                    <div className="row ">
                         <div className="col-12 ">
                             <p className="sub_title_name">skuAttributes</p>
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
             <TabPane tab="Master" key="1">

      {attributeMasterRender()}

             </TabPane>
              
             
              {channelData?.map((tab, index) => (
    <TabPane tab={tab[0]} key={index+2}>
      {/* {tab[0]} */}
     {channelAttributeRender(tab[0])}
    </TabPane>
  ))}

             </Tabs>
        </Fragment>
      
    )
}

export default React.memo(ProductDetail);