import { Form, Formik } from "formik";
import React from "react";
import FormikControl from "../../public/formik/formikControl";
import formJson from "../../utility/brandsProperties.json";
// import SubmitButton from "../../public/formik/submitButton";

function PropertiesForm({ data }) {

    const initialValues = {
        brand_id: data?.brandId || "",
        brand: data?.brandOwner || "",
        date: data?.createdAt || ""
    }

    return (
        <div className="bg-white p-3 br3">
            <Formik
                initialValues={initialValues}
            >
                {
                    () => {
                        return (
                            <Form className="row mx-0 font12 col-md-8">
                                {formJson.fields.map((eachField, index) => eachField.heading ? <h5 className="font14 f500">{eachField.heading}</h5> : <FormikControl key={`properties${index}`} {...eachField} />)}
                            </Form>
                        )
                    }
                }
            </Formik>
        </div>
    )
};

export default React.memo(PropertiesForm);