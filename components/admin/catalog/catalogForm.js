import { Form, Formik } from "formik";
import React, { Fragment } from "react";
import FormikControl from "../../public/formik/formikControl";
import formJson from "../../utility/catalogFields.json";
// import SubmitButton from "../../public/formik/submitButton";

function CatalogFrom({ data }) {

    const initialValues = {
        id: data?.catalogueId || "",
        name: data?.name || "",
        brand_name: data?.brand.name || ""
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
                                {formJson.fields.map((eachField, index) => eachField.heading ? <h5 className="font14 f500">{eachField.heading}</h5> : <FormikControl key={`catalogForm${index}`} {...eachField} />)}
                                {/* <div className="col-12 text-end pt-5">
                                    <SubmitButton type="submit" name="UPDATE" className="btn btn-sm btn-outline-success py-1 px-5 br3 mx-3"  />
                                    <SubmitButton type="button" name="CANCEL" className="btn btn-sm btn-outline-danger py-1 px-5 br3"  />
                                </div> */}
                            </Form>
                        )
                    }
                }
            </Formik>
        </div>
    )
};

export default React.memo(CatalogFrom);