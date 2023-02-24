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
import Select from "react-select";

import { ToastContainer, toast } from "react-toastify";
import FormikControl from "../../public/formik/formikControl";
import SubmitButton from "../../public/formik/submitButton";
// import { createBrandApi } from "../../utility/apiUtility";
import * as Yup from "yup";
import { updateBrandApi } from "../../../redux/actions/brand";
import { useDispatch, useSelector } from "react-redux";
import style from "./channel.module.css";
import { getCountryApi ,getBrandDropdownApi,getMarketplaceApi} from "../../../redux/actions/onboardQuery";

function UpdateChannelForm({ classModal, onSuccess, notifySucess }) {
  const [itemData, setItemData] = useState();
  const [brandActive, setBrandActive]= useState();
  const toastId = React.useRef(null);
  const [countryName, setCountryName] = useState();
  const [brandName, setBrandName] = useState();
  const [marketplaceName, setMarketplaceName] = useState();



  const dispatch = useDispatch();


  const selectOpts = [
    { value: "true", label: "Active" },
    { value: "false", label: "In-Active" }
  ];

  const { brandByIdData,loading } = useSelector(state => {
		return state.onBoardQueryReducer;
});

useEffect(() => {
  dispatch(getCountryApi());
  dispatch(getBrandDropdownApi());
  dispatch(getMarketplaceApi());
  
}, []);

useEffect(() => {
  if(itemData){
  dispatch(updateBrandApi(itemData));
  }

}, [itemData]);


const { countryData,brandDropdownGet,MarketplaceData } = useSelector(state => {
  // console.log("hello",state)
  return state.onBoardQueryReducer;
});

  const notify = (type) => {
    if (!toast.isActive(toastId.current)) {
      if (type !== "err") {
        toastId.current = toast.success("Brand added Successfully !!!");
      } else {
        toastId.current = toast.error("Brand fields cannot be empty !!!");
      }
    }
  };

  // const initialValues = {
  //   brandName: brandByIdData?.brandName,
  //   description:brandByIdData?.description,
  //   contactPerson:brandByIdData?.contactPerson,
  //   emailId: brandByIdData?.emailId,
  //   mobile: brandByIdData?.mobile,
  //   // brandStatus:brandByIdData?.isActive
  // };

 
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
  //     console.log("infoData",infoData);
  //     const apiRes = await updateBrandApi(brndName);
  //     if (apiRes === "err") {
  //       formik.setSubmitting(false);
  //     } else {    
  //       notifySucess(true);
  //       classModal();
  //     }
  //   }
  // };

  const countryHandler = (e) => {
  
    setCountryName(e.target.value);
  
  };

  return (
    <>
      <div className="bg-white p-3 br3">
        {loading ? <p>Loading...</p>:null}
        {!loading  ?( 
          <>
             <Form>
            <Row style={{ marginBottom: "2rem" }}>
            <div className="col-sm-12">
              <Form.Group>
                <Form.Label>
                  <b> Country </b>
                </Form.Label>
                <Form.Control
                  as="select"
                  name="countryId"
                  value={countryName}
                  onChange={(e) => countryHandler(e)}
                  required
                  // style={countryError ? { borderColor: "red" } : {}}
                  // disabled={disabled}
                >
                  <option value="">Select Country</option>
                  {
                    countryData &&
                    countryData.map((item, i) => {
                      return (
                        <option key={item.countryId}>{item.label}</option>
                      );
                    })
                    }
                </Form.Control>
               
              </Form.Group>
            </div>
            </Row>
            <Row style={{ marginBottom: "2rem" }}>
            <div className="col-sm-12">
              <Form.Group>
                <Form.Label>
                  <b> Brand </b>
                </Form.Label>
                <Form.Control
                  as="select"
                  name="brandNameId"
                  value={brandName}
                  onChange={(e) => brandHandler(e)}
                  required
                  // style={countryError ? { borderColor: "red" } : {}}
                  // disabled={disabled}
                >
                  <option value="">Select Brand</option>
                  {
                    brandDropdownGet &&
                    brandDropdownGet.map((item, i) => {
                      return (
                        <option key={item.brandId}>{item.label}</option>
                      );
                    })
                    }
                </Form.Control>
               
              </Form.Group>
            </div>
            </Row>
            <Row style={{ marginBottom: "2rem" }}>
            <div className="col-sm-12">
              <Form.Group>
                <Form.Label>
                  <b> Market place </b>
                </Form.Label>
                <Form.Control
                  as="select"
                  name="marketplaceId"
                  value={marketplaceName}
                  onChange={(e) => marketplaceHandler(e)}
                  required
                  // style={countryError ? { borderColor: "red" } : {}}
                  // disabled={disabled}
                >
                  <option value="">Select Marketplace</option>
                  {
                    MarketplaceData &&
                    MarketplaceData.map((item, i) => {
                      return (
                        <option key={item.marketplaceId}>{item.label}</option>
                      );
                    })
                    }
                </Form.Control>
               
              </Form.Group>
            </div>
            </Row>
             </Form>

          </>
       
       ):null}
       
      </div>
      <ToastContainer />
    </>
  );
}

export default React.memo(UpdateChannelForm);
