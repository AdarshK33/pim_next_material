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

function BrandForm({ classModal, onSuccess, notifySucess }) {
  const [itemData, setItemData] = useState();
  const toastId = React.useRef(null);
  const dispatch = useDispatch();

  const selectOpts = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "InActive" }
  ];

  useEffect(() => {
    console.log("itemData",itemData);
    dispatch(createBrandApi(itemData));
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
    name: "",
    discription: "",
    email:""
  };

  const onSubmit = async (values, formik) => {
    console.log("values",values);
    let brndName = {
      name: values.name.trim(),
    };
    let brndDiscription = {
      name: values.discription.trim(),
    };
    let brandEmail = {
      name: values.email.trim(),
    };
    console.log("val", brndName);
    if (brndName.name === "" || brndDiscription.name === "" || brandEmail.name === "" ) {
      notify("err");
    } else {
      let infoData={
        brandId: 0,
        brandName: brndName.name,
        description:brndDiscription.name,
        address: null,
        contactPerson: null,
        emailId: brandEmail.name,
        mobile: null,
        imageUrl: null,
        brandShortcode: null,
      }
      setItemData(infoData)
      // const apiRes = await createBrandApi(brndName);
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
                  classprops="form-group mb-3 col-md-12"
                  className="form-control form-control-sm bb_only px-0 py-2"
                  label="Brand Name"
                  name="name"
                  id="brandName"
                />

                <FormikControl
                  control="input"
                  type="text"
                  classprops="form-group mb-3 col-md-12"
                  className="form-control form-control-sm bb_only px-0 py-2"
                  label="Email Id"
                  name="email"
                  id="email"
                />

                <FormikControl
                  control="input"
                  type="text"
                  classprops="form-group mb-3 col-md-12"
                  className="form-control form-control-sm bb_only px-0 py-2"
                  label="Contact Info"
                  name="contact"
                  id="contact"
                />

                <FormikControl
                  control="text-area"
                  type="text"
                  classprops="form-group mb-3 col-md-12"
                  className="form-control form-control-sm bb_only px-0 py-2"
                  label="Brand Discription"
                  name="discription"
                  id="brandDiscription"
                />

              <p>Status</p>
                <FormikControl
                  control="reactSelect"
                  selectOpts={selectOpts}
                  placeholder="Status"
                  isMulti={false}
                />

                <div className="col-12 text-end pt-5">
                  <SubmitButton
                    onClick={classModal}
                    type="button"
                    name="CANCEL"
                    className="btn btn-sm btn-outline-secondary py-1 px-5 br3"
                  />
                  <SubmitButton
                    isLoading={isSubmitting}
                    type="submit"
                    name="ADD"
                    className="btn btn-sm btn-secondary py-1 px-5 br3 mx-2"
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
