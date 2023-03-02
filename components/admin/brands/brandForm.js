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
import { createBrandApi, getBrandApi } from "../../../redux/actions/brand";
import { useDispatch, useSelector } from "react-redux";
import style from "./brand.module.css";

function BrandForm({ classModal, onSuccess, notifySucess }) {
  const [itemData, setItemData] = useState();
  const [brandActive, setBrandActive]= useState();
  const [checkValidation, setcheckValidation]= useState(false);
  const toastId = React.useRef(null);
  const dispatch = useDispatch();


  const selectOpts = [
    { value: "true", label: "Active" },
    { value: "false", label: "In-Active" }
  ];

  useEffect(() => {
    if(itemData){
    // console.log("itemData",itemData);
    dispatch(createBrandApi(itemData));
    }
    // dispatch(getBrandApi()); 

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
    brandName: "",
    description:"",
    contactPerson: "",
    emailId: "",
    mobile: ""
  };

  const onSubmit = async (values, formik) => {
    // console.log("values",values);

    let brndName = {
      name: values.brandName.trim(),
    };
    let brndDiscription = {
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

    if (brndName.name === "" || brndDiscription.name === "" || brandEmail.name === "" || brandContact.name === "" || brandMobile.name === "") {
      console.log("notify");
      notify("err");
    } 
    else {
      let infoData={
        brandName: brndName.name,
        description:brndDiscription.name,
        contactPerson: brandContact.name,
        emailId: brandEmail.name,
        mobile: brandMobile.name
      }
      setItemData(infoData)
      // console.log("infoData--brand",infoData);

      const apiRes = await createBrandApi(infoData);
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
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting }) => {
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
                  name="isActive"
                  id="isActive"
                  setFieldValue={(n,v)=>
                  v==="true" && setBrandActive(true) }
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
                    // onClick={classModal}
                    // onClick={checkValidation}
                    type="submit"
                    name="ADD"
                    className="btn btn-sm save_btn_secondary py-1 px-5 br3 mx-2"
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <ToastContainer />
    </>
  );
}

export default React.memo(BrandForm);
