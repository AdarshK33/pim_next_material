import { Form, Formik } from "formik";
import React, { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import FormikControl from "../../public/formik/formikControl";
import SubmitButton from "../../public/formik/submitButton";
import { createBrandApi } from "../../utility/apiUtility";

function BrandForm({ classModal, onSuccess, notifySucess }) {
  const toastId = React.useRef(null);
  const notify = (type) => {
    if (!toast.isActive(toastId.current)) {
      if (type !== "err") {
        toastId.current = toast("Brand Name added Successfully !!!");
      } else {
        toastId.current = toast("Brand Name cannot be empty !!!");
      }
    }
  };
  const initialValues = {
    name: "",
  };

  const onSubmit = async (values, formik) => {
    let brndName = {
      name: values.name.trim(),
    };
    console.log("val", brndName);
    if (brndName.name === "") {
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
                  label="Enter the Brand Name"
                  name="name"
                  id="brandName"
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
