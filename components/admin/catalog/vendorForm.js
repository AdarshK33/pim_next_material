import { Form, Formik } from "formik";
import React, { Fragment, useState } from "react";
import FormikControl from "../../public/formik/formikControl";
import { updateProductById } from "../../utility/apiUtility";
import formJson from "../../utility/vendor.json";
import SubmitButton from "../../public/formik/submitButton";

function VendorForm({ data }) {

    const [showSubmit, setShowSubmit] = useState(false);
    const initialValues = {
        productId: data?.productId,
        vendor: data?.vendor || "",
        preferred_vendor: data?.preferred_vendor || "",
        vendor_description: data?.vendor_description || "",
        purchase_currency: data?.purchase_currency || "",
        vendor_purchase_price: data?.vendor_purchase_price || "",
        catalog_version: data?.catalog_version || "",
        item_code: data?.item_code || "",
        vendor_packaging_unit: data?.vendor_packaging_unit || "",
        qty_per_packing_unit: data?.qty_per_packing_unit || "",
        carton_dimensions: data?.carton_dimensions || "",
        carton_unit: data?.carton_unit || "",
        carton_weight: data?.carton_weight || ""
    }

    const onSubmit = async (values, formik) => {
        const apiRes = await updateProductById(values);

        if (apiRes === "err") {

        } else {

        }

    }

    return (
        <div className="bg-white p-3 br3 position-rel">
            {/* <button onClick={() => setShowSubmit(!showSubmit)} className="btn btn-sm btn-show-submit">Edit</button> */}

            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                {
                    ({ isSubmitting }) => {
                        return (
                            <Form className="row mx-0 font12 col-md-8">
                                {formJson.fields.map((eachField, index) => <FormikControl key={`catalogForm${index}`} {...eachField} />)}
                                {showSubmit && <div className="col-12 text-end pt-5">
                                    <SubmitButton type="submit" name="SAVE" className="btn btn-sm btn-outline-success py-1 px-5 br3 mx-3" isLoading={isSubmitting} />
                                </div>}
                            </Form>
                        )
                    }
                }
            </Formik>
        </div>
    )
};

export default React.memo(VendorForm);