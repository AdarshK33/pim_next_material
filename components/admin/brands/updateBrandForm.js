import { Form, Formik } from "formik";
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
import style from "./brand.module.css";

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

useEffect(() => {
  if(itemData){
  dispatch(updateBrandApi(itemData));
  }

}, [itemData]);

  const notify = (type) => {
    if (!toast.isActive(toastId.current)) {
      if (type !== "err") {
        toastId.current = toast.success("Brand added Successfully !!!");
      } else {
        toastId.current = toast.error("Brand fields cannot be empty !!!");
      }
    }
  };

  const initialValues = {
    brandName: brandByIdData?.brandName,
    description:brandByIdData?.description,
    contactPerson:brandByIdData?.contactPerson,
    emailId: brandByIdData?.emailId,
    mobile: brandByIdData?.mobile,
    // brandStatus:brandByIdData?.isActive
  };

 
  const onSubmit = async (values, formik) => {
    // formik.setFieldValue("isActive")
   //console.log("hello value",values)
    let brandName = {
      name: values.brandName.trim(),
    };
    let brandDescription = {
      name: values.description.trim(),
    };
    let brandEmail = {
      name: values.emailId.trim(),
    };
    let brandContact = {
      name: values.contactPerson.trim(),
    };
    let brandMobile = {
      name: values.mobile.trim(),
    };
    // let brandStatus = {
    //   name: values.status,
    // };

    if (brandName.name === "" || brandDescription.name === "" || brandEmail.name === "" || brandContact.name === "" || brandMobile.name === "" ) {
      console.log("notify");
      // ||brandStatus.name === "" 
      notify("err");
    }
    else {
      let infoData={
        brandId: brandByIdData?.brandId,
        brandName: brandName.name,
        description:brandDescription.name,
        contactPerson: brandContact.name,
        emailId: brandEmail.name,
        mobile: brandMobile.name,
        //  status:brandStatus.name,
        // status: brandByIdData?.isActive
      }
      setItemData(infoData)
      console.log("infoData",infoData);
      const apiRes = await updateBrandApi(brndName);
      if (apiRes === "err") {
        formik.setSubmitting(false);
      } else {    
        notifySucess(true);
        classModal();
      }
    }
  };

  return (
    <>
      <div className="bg-white p-3 br3">
        {loading ? <p>Loading...</p>:null}
        {!loading &&initialValues.brandName ?( <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting,setFieldValue }) => {
            return (
              <Form className="row mx-0 font12">
                <FormikControl
                  control="input"
                  type="text"
                  classprops="form-group mb-3 col-md-12 boldtxt"
                  className="form-control form-control-sm bb_only px-0 py-2 "
                  label="Brand Name"
                  name="brandName"
                  id="brandName"
                />

                <FormikControl
                  control="input"
                  type="text"
                  classprops="form-group mb-3 col-md-12 boldtxt"
                  className="form-control form-control-sm bb_only px-0 py-2 "
                  label="Email Id"
                  name="emailId"
                  id="emailId"
                />

                <FormikControl
                  control="input"
                  type="text"
                  classprops="form-group mb-3 col-md-12 boldtxt"
                  className="form-control form-control-sm bb_only px-0 py-2"
                  label="Contact Info"
                  name="contactPerson"
                  id="contactPerson"
                />

                <FormikControl
                  control="input"
                  type="text"
                  classprops="form-group mb-3 col-md-12 boldtxt"
                  className="form-control form-control-sm bb_only px-0 py-2"
                  label="Mobile"
                  name="mobile"
                  id="mobile"
                />

                <FormikControl
                  control="text-area"
                  type="text"
                  classprops="form-group mb-3 col-md-12 boldtxt"
                  className="form-control form-control-sm bb_only px-0 py-2"
                  label="Brand Discription"
                  name="description"
                  id="description"
                />

              {/* <p className="boldtxt">Status</p>
                <FormikControl
                  control="reactSelect"
                  selectOpts={selectOpts}
                  placeholder="Select"
                  isMulti={false}
                  name="status"
                  id="status"
                  setFieldValue={setFieldValue}
                /> */}

                <div className="col-12 text-center pt-5">
                  <SubmitButton
                    onClick={classModal}
                    type="button"
                    name="CANCEL"
                    className="btn btn-sm save_btn_secondary py-1 px-5 br3"
                  />
                  <SubmitButton
                    isLoading={isSubmitting}
                    type="submit"
                    name="ADD"
                    className="btn btn-sm save_btn_secondary py-1 px-5 br3 mx-2"
                  />
                </div>
              </Form>
            );
          }}
        </Formik>):null}
       
      </div>
      <ToastContainer />
    </>
  );
}

export default React.memo(UpdateBrandForm);
