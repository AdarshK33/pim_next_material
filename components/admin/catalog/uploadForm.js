import { Form, Formik } from "formik";
import React, { Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";
import FormikControl from "../../public/formik/formikControl";
import SubmitButton from "../../public/formik/submitButton";
import { uploadBulkFile } from "../../utility/apiUtility";

function UploadForm() {
  const toastId = React.useRef(null);
  const initialValues = {
    catalog_name: [],
  };
  const notify = (type) => {
    if (!toast.isActive(toastId.current)) {
      if (type !== "err") {
        toastId.current = toast("Updated Successfully !!!");
      } else {
        toastId.current = toast("Something went wrong!!!");
      }
    }
  };
  const bulkUploadHandler = async (value) => {
    console.log("value", value.catalog_name[0]);
    if (value.catalog_name[0] !== undefined) {
      const handlerRes = await uploadBulkFile(value.catalog_name[0]);
      if (handlerRes == "err") {
        notify("err");
      } else {
        notify("success");
      }
    } else {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast("Please select the file.");
      }
    }
  };
  return (
    <Fragment>
      <div className="p-md-4">
        <Formik initialValues={initialValues} onSubmit={bulkUploadHandler}>
          {({ isSubmitting, setFieldValue }) => {
            return (
              <Form>
                <FormikControl
                  control="dropZone"
                  name="catalog_name"
                  setFieldValue={setFieldValue}
                />
                <div className="col-12 text-center pt-md-4 pt-3">
                  <SubmitButton
                    name="Submit"
                    isLoading={isSubmitting}
                    className="btn btn-outline-success px-3 py-1"
                    type="submit"
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
        <ToastContainer limit={1} />
      </div>
    </Fragment>
  );
}

export default React.memo(UploadForm);
