import { Form, Formik } from "formik";
import React, { Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { connect, useSelector } from "react-redux";
import FormikControl from "../../public/formik/formikControl";
import SubmitButton from "../../public/formik/submitButton";
import { updateProductById } from "../../utility/apiUtility";
import formJson from "../../utility/attributes.json";
import "react-toastify/dist/ReactToastify.css";
// import SubmitButton from "../../public/formik/submitButton";

function AttributesForm({ data, show, getAllProductData }) {
  const [showSubmit, setShowSubmit] = useState(false);
  const pgNO = useSelector((state) => state.reducer.currPgNo);
  const toastId = React.useRef(null);
  const initialValues = {
    productId: data?.productId,
    articleNumber: data?.articleNumber || "",
    brand: data?.categories?.catalogue?.brand?.brandOwner || "",
    name: data?.name || "",
    item: data?.item || "",
    catalog_version: data?.categories?.catalogue?.version || "",
    brand_website: data?.brand_website || "",
    itemCode: data?.itemCode || "",
    warehouse: data?.warehouse || "",
    sku_dimensions: `${data?.skuDimensions?.length || ""}*${
      data?.skuDimensions?.width || ""
    }*${data?.skuDimensions?.height || ""}`,
    sku_unit: data?.skuDimensions?.unitOfMeasure || "",
    sku_weight: data?.skuDimensions?.unitWeight || "",
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
  const onSubmit = async (values, formik) => {
    const apiRes = await updateProductById(values);
    if (apiRes === "err") {
      notify("err");
    } else {
      notify("success");
      console.log("pgNo", pgNO);
      getAllProductData({
        //page number should change dynamically
        pageSize: 10,
        pageNo: pgNO,
      });
    }
  };

  return (
    <div className="bg-white p-3 br3 position-rel">
      {show && (
        <Fragment>
          {/* <button
            onClick={() => setShowSubmit(!showSubmit)}
            className="btn btn-sm btn-show-submit"
          >
            Edit
          </button> */}
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ isSubmitting }) => {
              return (
                <Form className="row mx-0 font12 col-md-8 top_space">
                  {formJson.fields.map((eachField, index) => (
                    <FormikControl
                      key={`atrributeFrom${index}`}
                      {...eachField}
                    />
                  ))}
                  {/* {showSubmit && ( */}
                    <div className="col-12 text-end pt-5">
                      <SubmitButton
                        type="submit"
                        name="SAVE"
                        className="btn btn-sm btn-outline-success py-1 px-5 br3 mx-3 btn-show-submit"
                        isLoading={isSubmitting}
                      />
                    </div>
                  {/* )} */}
                </Form>
              );
            }}
          </Formik>
          <ToastContainer />
        </Fragment>
      )}
    </div>
  );
}

export default connect(null, {})(React.memo(AttributesForm));
