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
import {  createUserApi } from "../../../redux/actions/login";
import { useDispatch, useSelector } from "react-redux";

function BrandForm({ classModal, onSuccess, notifySucess }) {
  const [itemData, setItemData] = useState();
  const toastId = React.useRef(null);
  const dispatch = useDispatch();


  const { userGet,roleGet } = useSelector(state => {
   
    return state.loginReducer;
  });
  const { brandDropdownGet } = useSelector(state => {
   
    return state.onBoardQueryReducer;
  });

  const roleOpts = [
    { value: "admin", label: "Admin" },
    { value: "brandmanager", label: "Brand Manager" },
    { value: "user", label: "User" }
  ];

  const brandOpts = [
    { value: "brand1", label: "Brand1" },
    { value: "brand2", label: "Brand2" },
    { value: "brand3", label: "Brand3" },
    { value: "brand4", label: "Brand4" }
  ];
  

  useEffect(() => {
    if(itemData){
    // console.log("itemData",itemData);
    dispatch(createUserApi(itemData));
    // dispatch(getBrandApi()); 
    }
  }, [itemData]);

  const notify = (type) => {
    if (!toast.isActive(toastId.current)) {
      if (type !== "err") {
        toastId.current = toast.success("Brand added Successfully !!!");
      } else {
        toastId.current = toast.error("User fields cannot be empty !!!");
      }
    }
  };
  const initialValues = {
    email: "",
    role: "",
    brand:""
  };

  const onSubmit = async (values, formik) => {
    console.log("hello values",values);
    let userEmail = {
      name: values.email.trim(),
    };
    let userRole = {
      name: values.role,
    };
    let userBrand = {
      name: values.brand,
    };
    // console.log("val", brndName);
    if (userEmail.name === "" || userRole.name === "" || userBrand.name === "" ) {
      notify("err");
    } else {
      let infoData={
        email: userEmail.name,
        brandId: userBrand.name,
        roleId: userRole.name
      }
    // console.log("hello infoData", infoData);

      setItemData(infoData)
      const apiRes = await createUserApi(infoData);
      if (apiRes === "err") {
        formik.setSubmitting(false);
      } else {    
        // notifySucess(true);
        classModal();
      }
    }
  };

  return (
    <>
      <div className="bg-white p-3 br3">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting ,setFieldValue}) => {
            return (
              <Form className="row mx-0 font12">

                <FormikControl
                  control="input"
                  type="text"
                  classprops="form-group mb-3 col-md-12 boldtxt"
                  className="form-control form-control-sm bb_only px-0 py-2"
                  label="Email Id"
                  name="email"
                  id="email"
                />

                {/* <FormikControl
                  control="input"
                  type="text"
                  classprops="form-group mb-3 col-md-12 boldtxt"
                  className="form-control form-control-sm bb_only px-0 py-2"
                  label="Password"
                  name="password"
                  id="password"
                /> */}

              <p className="px-2 py-0 boldtxt">Role Type</p>
                <FormikControl
                  control="reactSelect"
                  className="px-2 py-1"
                  selectOpts={roleGet}
                  placeholder="Select"
                  name="role"
                  label="Role Type"
                  isMulti={false}
                  setFieldValue={setFieldValue}
                />
             

              <p className="px-2 py-2 boldtxt">Brand</p>
                <FormikControl
                  control="reactSelect"
                  className="px-2 py-1"
                  selectOpts={brandDropdownGet}
                  placeholder="Select"
                  isMulti={false}
                  name="brand"
                  setFieldValue={setFieldValue}
                />

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
        </Formik>
      </div>
      <ToastContainer />
    </>
  );
}

export default React.memo(BrandForm);
