import { Form, Formik } from "formik";
import React, { Fragment, useMemo, useRef, useState } from "react";
import FormikControl from "./formik/formikControl";
import loginJson from "../utility/login.json";
import SubmitButton from "./formik/submitButton";
import * as Yup from "yup";
import { createUserApi } from "../utility/apiUtility";
import AlertUtility from "../utility/alertUtility";
import { Alert } from "react-bootstrap";
import Link from "next/link";

function SignUpForm() {

    const { singupJson } = loginJson;
    const alertRef = useRef(null);
    const [msg, setMsg] = useState(null);
    const initialValues = {
        name: "",
        email: "",
        password: ""
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Must be a  Valid Email").required("Required!"),
        name: Yup.string().required("Required!"),
        password: Yup.string().required("Required!"),
    });

    const submitApi = async (values) => {
        const apiRes = await createUserApi(values);
        console.log(apiRes);
        if (apiRes === "err") {
            alertRef.current.err();
        } else {
            setMsg(apiRes.data.message);
            alertRef.current.suc();
            setTimeout(() => setMsg(""), 2000);
        }
    }

    const extraTandCLabel=useMemo(() => <Link href="/"><a className="txt_blue">Terms and Conditions</a></Link>,[])

    return (
        <Fragment>
            <div className="login-form-fields">
                <AlertUtility ref={alertRef} />               
                {msg && <Alert>{msg}</Alert>}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={submitApi} >
                    {
                        ({ isSubmitting }) => {
                            return (
                                <Form >
                                    {singupJson.map((eachField, index) => <FormikControl key={`signUp${index}`} {...eachField} />)}
                                    <FormikControl
                                        control="checkbox"
                                        name="tandc"
                                        label="I agree to the"
                                        extraLabel={extraTandCLabel}
                                        classprops="form-group mb-md-4 mb-2 d-flex font12"
                                        className="my-auto"
                                        id="tandc"
                                        labelProps="px-1 my-auto txt_gray"
                                    />
                                    <div className="col-md-12 text-center py-2">
                                        <SubmitButton
                                            className="btn btn-blue w-100"
                                            type="submit"
                                            isLoading={isSubmitting}
                                            name="Sign up"
                                        />
                                    </div>
                                </Form>
                            )
                        }
                    }
                </Formik>
            </div>
        </Fragment>
    )
};

export default React.memo(SignUpForm);