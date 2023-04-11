// import { Form, Formik } from "formik";
import { Row, Col, Form, Button } from "react-bootstrap";

import React, {
  Fragment,
  useMemo,
  useState,
  useEffect, 
  useCallback,
  useRef,
} from "react";
import { ToastContainer, toast } from "react-toastify";
import FormikControl from "../../public/formik/formikControl";
import SubmitButton from "../../public/formik/submitButton";
// import { createBrandApi } from "../../utility/apiUtility";
import * as Yup from "yup";
import { updateBrandApi } from "../../../redux/actions/brand";
import { useDispatch, useSelector } from "react-redux";
import styles from "./brand.module.css";

function UpdateBrandForm({ classModal, onSuccess, notifySucess }) {
  const [itemData, setItemData] = useState();
  const [brandActive, setBrandActive]= useState();
  const toastId = React.useRef(null);
  const dispatch = useDispatch();


  const selectOpts = [
    { value: "true", label: "Active" },
    { value: "false", label: "In-Active" }
  ];

  const { brandByIdData,loading } = useSelector(state => {
		return state.onBoardQueryReducer;
});


const [brandNameError, setBrandlNameError] = useState(false);
const [brandEmailError, setBrandlEmailError] = useState(false);

const [brandMobileError, setBrandlMobileError] = useState(false);
const [brandContactError, setBrandlContactError] = useState(false);
const [brandDescriptionError, setBrandDescriptionError] = useState(false);


const [state, setState] = useState({
  brandName: "",
  brandEmail: "",
  brandMobile: "",
  brandContact: "",
  brandDescription: ""
});

useEffect(() => {
  setState({
    ...state,
    brandName: brandByIdData?.brandName,
    brandEmail: brandByIdData.emailId, 
    brandMobile: brandByIdData?.mobile,
    brandContact: brandByIdData.contactPerson,
    brandDescription: brandByIdData?.description,
  });
 

  
},[brandByIdData])



// useEffect(() => {
//   if(itemData){
//   dispatch(updateBrandApi(itemData));
//   }

// }, [itemData]);

  const notify = (type) => {
    if (!toast.isActive(toastId.current)) {
      if (type !== "err") {
        toastId.current = toast.success("Brand added Successfully !!!");
      } else {
        toastId.current = toast.error("Brand fields cannot be empty !!!");
      }
    }
  };


 
  // const onSubmit = async (values, formik) => {
  //   // formik.setFieldValue("isActive")
  //  //console.log("hello value",values)
  //   let brandName = {
  //     name: values.brandName.trim(),
  //   };
  //   let brandDescription = {
  //     name: values.description.trim(),
  //   };
  //   let brandEmail = {
  //     name: values.emailId.trim(),
  //   };
  //   let brandContact = {
  //     name: values.contactPerson.trim(),
  //   };
  //   let brandMobile = {
  //     name: values.mobile.trim(),
  //   };
  //   // let brandStatus = {
  //   //   name: values.status,
  //   // };

  //   if (brandName.name === "" || brandDescription.name === "" || brandEmail.name === "" || brandContact.name === "" || brandMobile.name === "" ) {
  //     console.log("notify");
  //     // ||brandStatus.name === "" 
  //     notify("err");
  //   }
  //   else {
  //     let infoData={
  //       brandId: brandByIdData?.brandId,
  //       brandName: brandName.name,
  //       description:brandDescription.name,
  //       contactPerson: brandContact.name,
  //       emailId: brandEmail.name,
  //       mobile: brandMobile.name,
  //       //  status:brandStatus.name,
  //       // status: brandByIdData?.isActive
  //     }
  //     setItemData(infoData)
  //    // console.log("infoData",infoData);
  //     const apiRes = await updateBrandApi(infoData);
  //     if (apiRes === "err") {
  //       console.log("hello  if classModal")  

  //       formik.setSubmitting(false);
  //     } else {  
  //       console.log("hello  else classModal")  
  //       notifySucess(true);
  //       classModal();
  //     }
  //   }
  // };



  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    // console.log("hello input",state);
  };


  const brandEmailValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (
      state.brandEmail !== "" &&
      state.brandEmail !== null &&
      state.brandEmail !== undefined
    ) {
      setBrandlEmailError(false);
      // console.log("channelNameSuccess");
      return true;
    } else {
      setBrandlEmailError(true);
      // console.log("channelNameError");
      return false;
    }
  };


  const brandContactValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (
      state.brandContact !== "" &&
      state.brandContact !== null &&
      state.brandContact !== undefined
    ) {
      setBrandlContactError(false);
      // console.log("channelNameSuccess");
      return true;
    } else {
      setBrandlContactError(true);
      // console.log("channelNameError");
      return false;
    }
  };


  const brandMobileValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (
      state.brandMobile !== "" &&
      state.brandMobile !== null &&
      state.brandMobile !== undefined
    ) {
      setBrandlMobileError(false);
      // console.log("channelNameSuccess");
      return true;
    } else {
      setBrandlMobileError(true);
      // console.log("channelNameError");
      return false;
    }
  };

  const brandDescriptionValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (
      state.brandDescription !== "" &&
      state.brandDescription !== null &&
      state.brandDescription !== undefined
    ) {
      setBrandDescriptionError(false);
      // console.log("channelNameSuccess");
      return true;
    } else {
      setBrandDescriptionError(true);
      // console.log("channelNameError");
      return false;
    }
  };

  const checkValidations = () => {
        // console.log("isChecked");
        if (
        
          (brandDescriptionValidations() == true)  &
          (brandMobileValidations() == true)  &
          (brandContactValidations() == true)  &
          (brandEmailValidations() == true) 

        ) {
          return true;
        } else {
          return false;
        }
 
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const value = checkValidations();

    if (value === true) {
      // console.log("Inside the channel submit");
      // setSaveclick(true);

      const UpdateInfo = {
        // updateData: {
          brandId:brandByIdData?.brandId,
          // brandName: state.brandName,
          brandEmail: state.brandEmail, 
          mobile: state?.brandMobile,
          contactPerson: state.brandContact,
          description: state?.brandDescription,
        // }, 
    }
    // console.log("hello update info", UpdateInfo);
    //apis(UpdateInfo)
   
    dispatch( updateBrandApi(UpdateInfo));
    const apiRes = await updateBrandApi(UpdateInfo);
      if (apiRes === "err") {
        // console.log("hello  if classModal")  

        // formik.setSubmitting(false);
      } else {  
        // console.log("hello  else classModal")  
        // notifySucess(true);
        classModal();
      }
  }; 
}

  return (
    <>
     <div className="bg-white p-3 br3">
    {loading ? <p>Loading...</p>:null}
    {!loading  && brandByIdData?.brandName  ?( 
      <>
      <div className={styles.update_main}>

         <Form>
         <Row style={{ marginBottom: ".2rem" }}>
         <div className="col-sm-12 ">
              <Form.Group>
                <Form.Label>
                  <span className=".font12">Brand Name</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="brandName"
                  value={state.brandName}
                  // onChange={changeHandler}
                  required
                  maxLength="250"
                  // style={setBrandlNameError ? { borderColor: "red" } : {}}
                  placeholder="Brand Name"
                  disabled={true}
                />
                {/* {brandNameError ? (
                  <p style={{ color: "red" }}> ** Please enter brand Name </p>
                ) :state.brandName && state.brandName.length === 100 ? (
                  <p style={{ color: "red" }}> Max 100 Characters</p>
                ) : (
                  <p></p>
                )} */}
              </Form.Group>
            </div>
          </Row>
          <Row style={{ marginBottom: ".2rem" }}>
         <div className="col-sm-12 ">
              <Form.Group>
                <Form.Label>
                  <span className=".font12">Email</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="brandEmail"
                  value={state.brandEmail}
                  onChange={changeHandler}
                  required
                  maxLength="250"
                  style={brandEmailError ? { borderColor: "red" } : {}}
                  placeholder="Email"
                  // disabled={true}
                />
                {brandEmailError ? (
                  <p style={{ color: "red" }}> ** Please enter Email  </p>
                ) :state.brandEmail && state.brandEmail.length === 100 ? (
                  <p style={{ color: "red" }}> Max 100 Characters</p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </div>
          </Row>
          <Row style={{ marginBottom: ".2rem" }}>
         <div className="col-sm-12 ">
              <Form.Group>
                <Form.Label>
                  <span className=".font12">Contact Info</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="brandContact"
                  value={state.brandContact}
                  onChange={changeHandler}
                  required
                  maxLength="250"
                  style={brandContactError ? { borderColor: "red" } : {}}
                  placeholder="Contact Info"
                  // disabled={true}
                />
                {brandContactError ? (
                  <p style={{ color: "red" }}> ** Please enter Contact Info </p>
                ) :state.brandContact && state.brandContact.length === 100 ? (
                  <p style={{ color: "red" }}> Max 100 Characters</p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </div>
          </Row>
     
       
          <Row style={{ marginBottom: ".2rem" }}>
         <div className="col-sm-12 ">
              <Form.Group>
                <Form.Label>
                  <span className=".font12">Mobile</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="brandMobile"
                  value={state.brandMobile}
                  onChange={changeHandler}
                  required
                  maxLength="250"
                  style={brandMobileError ? { borderColor: "red" } : {}}
                  placeholder="Mobile"
                  // disabled={true}
                />
                {brandMobileError ? (
                  <p style={{ color: "red" }}> ** Please enter Brand Mobile </p>
                ) :state.brandMobile && state.brandMobile.length === 11 ? (
                  <p style={{ color: "red" }}> Max 10 Characters</p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </div>
          </Row>

          <Row style={{ marginBottom: ".2rem" }}>
         <div className="col-sm-12 ">
              <Form.Group>
                <Form.Label>
                  <span className=".font12">Brand Description</span>
                </Form.Label>
                <Form.Control
               as="textarea"
                  name="brandDescription"
                  value={state.brandDescription}
                  onChange={changeHandler}
                  required
                  rows="3"
                  maxLength="250"
                  style={brandDescriptionError ? { borderColor: "red" } : {}}
                  placeholder="Brand Description"
                  // disabled={true}
                />
                {brandDescriptionError ? (
                  <p style={{ color: "red" }}> ** Please enter Brand Description </p>
                ) :state.brandDescription && state.brandDescription.length === 100 ? (
                  <p style={{ color: "red" }}> Max 100 Characters</p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </div>
          </Row>
            <div className="col-12 text-center pt-5">
                  <SubmitButton
                    onClick={classModal}
                    type="button"
                    name="CANCEL"
                    className="btn btn-sm save_btn_secondary py-1 px-5 br3"
                  />
                  <SubmitButton
                   onClick={submitHandler}
                    type="submit"
                    name="UPDATE"
                    className="btn btn-sm save_btn_secondary py-1 px-5 br3 mx-2"
                  />
                </div>
         </Form>
         </div>
      </> 
   
   ):null}
   
  </div>
      <ToastContainer />
    </>
  );
}

export default React.memo(UpdateBrandForm);
