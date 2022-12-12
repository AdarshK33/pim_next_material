import React, { useContext, useEffect } from "react";
import Link from 'next/link';
import GoogleAuth from "../components/utility/googleAuth";
// import { Auth } from "./_app";
import { useRouter } from "next/router";
import {connect, useSelector} from 'react-redux'
// import LoginForm from "../components/public/loginForm";

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

    return (
        <div className="page-container d-flex p-2">
            <img src="/logo.png" alt="una-brands" className="login-logo" />
            <div className="m-auto">
                <img src="/login-concept.png" alt="login-concept" className="login-concept-logo" />
            </div>
            <div className="login-main-container">
                <img src="/logo2.png" alt="login-header-logo" className="login-logo-header" />
                <div className="p-1">
                    <h5 className="login-head">Login to your Account</h5>
                    <p className="sub-text">See what is going with your buisness</p>
                    <GoogleAuth />
                    {/* <div className="text-center font12 txt_gray my-3">--------------- or Log In With Email ---------------</div>
                    <LoginForm /> */}
                    <div className="w-100 text-center not-registered">Not Registered Yet? <Link href="/signup"><a className="txt_blue px-1">Create an account</a></Link></div>
                </div>
            </div>

        </div>
    )
};

export default React.memo(Login);