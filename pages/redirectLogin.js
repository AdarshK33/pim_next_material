import React, { useContext, useEffect,useState } from "react";
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

import { Form, Formik } from "formik";
import FormikControl from "../components/public/formik/formikControl";
import SubmitButton from "../components/public/formik/submitButton";
import user from "../assets/icons/userLogin.svg"
import key from "../assets/icons/loginkey.svg"
import { useDispatch } from "react-redux";


import {userLoginApi } from "../redux/actions/login";
import useUser  from "../utils/useUser"
import styles from "./pages.module.css"
import Button from "../components/public/button"
import fetchJson from "../utils/fetchJson"
function RedirectLogin() {
    const { user, mutateUser } = useUser({
        redirectTo: "",
        redirectIfFound: false,
      });
  

    const router = useRouter();

     async function redirectLoginPage() {
        mutateUser(
          await fetchJson("/api/login/logOut", { method: "POST" }),
          false,
        );
      router.push("/login")
    }
    return (
        <>
         {!user?.isLoggedIn === true ? (
          <div className={styles.redirectPage}>

         <div className="card">
      
            <div className="card-body">
                <h5 className="card-title text-center">Redirect To Login</h5>
                <div className="col-12 text-center pt-5">
               
                  <Button
                    ButtonName="OK"
                    className={`btn btn-sm btn-secondary py-1 px-5 br3 mx-2 ${styles.redirect_button}`}
                    onClick={()=>redirectLoginPage()}
                  />
                </div>
            </div>
         </div>

        </div>
         ):null}
        </>
      
     
    )
};

export default React.memo(RedirectLogin);