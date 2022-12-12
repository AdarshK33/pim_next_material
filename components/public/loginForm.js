import { Form, Formik } from "formik";
import React, { Fragment, useRef, useState } from "react";
import FormikControl from "./formik/formikControl";
import loginJson from "../utility/login.json";
import SubmitButton from "./formik/submitButton";
import * as Yup from "yup";
import { loginApiCall } from "../utility/apiUtility";
import AlertUtility from "../utility/alertUtility";
import { Alert } from "react-bootstrap";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";

function LoginForm() {

    const { singnInJson } = loginJson;
    const alertRef = useRef(null);
    const [msg, setMsg] = useState(null);
    const router = useRouter();
    const cookies = new Cookies();

    const initialValues = {
        email: "",
        password: ""
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Must be a  Valid Email").required("Required!"),
        password: Yup.string().required("Required!"),
    });

    const submitApi = async (values) => {
        const apiRes = await loginApiCall(values);
        // if (apiRes === "err") {
        //     alertRef.current.err();
        // } else {
        //     // setMsg(apiRes.message);
        //     // alertRef.current.suc();
        //     cookies.set("isLogin",true);
        //     router.push("/dashboard/dashboard");
        //     // setTimeout(() => setMsg(""), 3000);
        // }
    }

    return (
        <Fragment>
            <div className="login-form-fields">
                <AlertUtility ref={alertRef} />
                {msg && <Alert>{msg}</Alert>}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={submitApi}
                >
                    {
                        ({ isSubmitting }) => {
                            return (
                                <Form className="row mx-0 w-100 p-0">
                                    {singnInJson.map((eachField, index) => <FormikControl key={`signin${index}`} {...eachField} />)}

                                    <FormikControl
                                        control="checkbox"
                                        name="remember"
                                        label="RemeberMe"
                                        classprops="form-group mb-md-4 mb-2 d-flex col-6 p-0 font12"
                                        className="my-auto"
                                        id="rememberId"
                                        labelProps="px-1 my-auto txt_gray"
                                    />

                                    <div className="col-6 p-0 text-end mb-3 font12 txt_blue">Forgot Password?</div>

                                    <div className="col-md-12 text-center p-0">
                                        <SubmitButton
                                            className="btn btn-blue w-100"
                                            type="submit"
                                            isLoading={isSubmitting}
                                            name="Login"
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

export default React.memo(LoginForm);