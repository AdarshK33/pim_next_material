import { Form, Formik } from "formik";
import React from "react";
import FormikControl from "../../public/formik/formikControl";
import SubmitButton from "../../public/formik/submitButton";

function PublishForm({ classModal, onSuccess }) {

    const initialValues = {
        brandName: ""
    }

    const onSubmit = async (values) => {
        console.log(values)
        onSuccess(values.brandName);
    }

    const actionList = [{ value: "Channel1", label: "Shopify" }];

    return (
        <div className="bg-white p-3 br3">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                {
                    ({ isSubmitting, setFieldValue }) => {
                        return (
                            <Form className="row mx-0 font12">
                                <label className="mb-2">Sure You Want to Publish?</label>
                                <FormikControl
                                    control="reactSelect"
                                    name="brandName"
                                    id="brandName"
                                    selectOpts={actionList}
                                    placeholder="Action"
                                    isMulti={false}
                                    setFieldValue={setFieldValue}
                                    label=""
                                />
                                <div className="col-12 text-end pt-5">
                                    <SubmitButton onClick={classModal} type="button" name="No, CANCEL" className="btn btn-sm btn-outline-secondary py-1 px-5 br3" />
                                    <SubmitButton isLoading={isSubmitting} type="submit" name="Yes, Submit" className="btn btn-sm btn-secondary py-1 px-5 br3 mx-2" />
                                </div>
                            </Form>
                        )
                    }
                }
            </Formik>
        </div>
    )
};

export default React.memo(PublishForm)