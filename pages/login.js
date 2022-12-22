import React, { useContext, useEffect } from "react";
import Link from 'next/link';
import GoogleAuth from "../components/utility/googleAuth";
// import { Auth } from "./_app";
import { useRouter } from "next/router";
import {connect, useSelector} from 'react-redux'
// import LoginForm from "../components/public/loginForm";
import Image from 'next/image';
import loginLeft from "../assets/images/loginLeft.jpg"
import loginLogo from "../assets/icons/loginLogo.svg"
import loginLine1 from "../assets/icons/Line1.svg"
import styles from "./pages.module.css"
import { Form, Formik } from "formik";
import FormikControl from "../components/public/formik/formikControl";
import SubmitButton from "../components/public/formik/submitButton";
import user from "../assets/icons/userLogin.svg"
import key from "../assets/icons/loginkey.svg"



function Login() {
    const LoginStat = {
        isLogin: useSelector((state) => state.reducer.isLogin),
        token: useSelector((state) => state.reducer.token),
      };
    // const { loginState } = useContext(Auth);
    const router = useRouter();

    useEffect(() => {
        LoginStat.isLogin && router.push("/");
    }, []);





    const initialValues = {
      name: "",
      discription: ""
    };
  
    const onSubmit = async (values, formik) => {
      let brndName = {
        name: values.name.trim(),
      };
      let brndDiscription = {
        name: values.discription.trim(),
      };
      console.log("val", brndName);
      if (brndName.name === "" || brndDiscription.name === "" ) {
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
        <div className="page-container d-flex p-2">
            {/* <img src="/logo.png" alt="RI-brands" className="login-logo" /> */}
            <div className="m-auto">
                {/* <img src="/login-concept.png" alt="login-concept" className="login-concept-logo" /> */}
                <div className={styles.left_box}>
               
                         <Image
                            className="login-concept-logo"
							src={loginLeft}
							alt="loginLeft"
							width={600}
							height={600}
						/>
                        </div>
            </div>
            <div className={styles.mid_box}>
                         <Image
                            className="login-concept-logo"
							src={loginLine1}
							alt="loginLeft"
							width={555}
							height={555}
						/>
                        </div>
            <div className={`login-main-container ${styles.last_box}`}>
                {/* <img src="/logo2.png" alt="login-header-logo" className="login-logo-header" /> */}
               <div className={styles.apollo_login_logo}>
                <Image
                    className="login-logo-header"
                    src={loginLogo}
                    alt="loginLogo"
                    width={150}
                    height={120}
                  />
                  </div>
                <div className={styles.login_form}>
                <div className={`card ${styles.box_shadow}`}>
                  <div className="card-body">
                  <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting }) => {
            return (
              
              <Form className="row mx-0 font12">
                {/* <div className={styles.login_icon}>
                <Image
                    className="login-concept-logo"
                    src={user}
                    alt="loginUser"
                    width={40}
                    height={35}
                  />
                </div> */}
                 <i class="fa fa-user icon"></i>
                <FormikControl
                  control="input"
                  type="text"
                  classprops="form-group mb-3 col-md-12"
                  className="form-control form-control-sm bb_only px-0 py-2 text-center"
                  placeholder="Username"
                  name="userName"
                  id="userName"
                />
                 {/* <div className={styles.login_icon}>
                   <Image
                    className="login-concept-logo"
                    src={key}
                    alt="loginKey"
                    width={40}
                    height={35}
                  />
                  </div> */}
                <FormikControl
                  control="text-area"
                  type="text"
                  classprops="form-group mb-3 col-md-12"
                  className="form-control form-control-sm bb_only px-0 py-2 text-center"
                  placeholder="Password"
                  name="password"
                  id="password"
                />

                <div className="col-12 text-center pt-5">
                  <SubmitButton
                    isLoading={isSubmitting}
                    type="submit"
                    name="Login"
                    className={`btn btn-sm btn-secondary py-1 px-5 br3 mx-2 ${styles.submit_button}`}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>   
                <div>
                    <div className="w-100 text-end not-registered"> <Link href="/signup"><a className={`txt_black px-1 ${styles.forget_pasword}`}>Forget Password</a></Link></div>
                </div>
                  </div>
                </div>      
             </div>
            </div>
        </div>
    )
};

export default React.memo(Login);