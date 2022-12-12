import React from "react";
import SignUpForm from "../components/public/signUpForm";
import Link from 'next/link';

function Login() {
    return (
        <div className="page-container d-flex p-2">
            {/* <img src="/logo.png" alt="RI" className="login-logo" /> */}
            <div className="m-auto">
                <img src="/sign-in-logo.png" alt="sign-up" className="login-concept-logo" />
            </div>
            <div className="login-main-container">
                <img src="/logo2.png" alt="login-header-logo" className="login-logo-header" />
                <div className="p-1">
                    <h5 className="login-head">Sign up to your Account</h5>
                    <p className="sub-text">See what is going with your buisness</p>
                    <button className="btn btn-block btn-login-google"><img src="/google-icon.png" alt="Google-icon" height="100%"/> Continue with Google</button>
                    {/* <hr /> */}
                    <div className="text-center font12 txt_gray my-3">--------------- or Sign In With Email ---------------</div>
                    <SignUpForm />
                    <div className="w-100 text-center not-registered">Already have an Account? <Link href="/login"><a className="txt_blue px-1">Sign In</a></Link></div>
                </div>
            </div>
        </div>
    )
};

export default React.memo(Login);