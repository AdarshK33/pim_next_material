import React, { useContext, useEffect,useState } from "react";
import Link from 'next/link';
import GoogleAuth from "../components/utility/googleAuth";
// import { Auth } from "./_app";
import Router from "next/router";
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
import { useDispatch } from "react-redux";


import {userLoginApi } from "../redux/actions/login";
import useUser  from "../utils/useUser"
import RedirectLogin from "../pages/redirectLogin";
import { withIronSessionSsr } from "iron-session/next";

function Login() {
  // const router = useRouter();
  const dispatch = useDispatch();
  // const { user, mutateUser } = useUser();

  const [itemData, setItemData] = useState();
  


  const { isLogin } = useSelector(state => {
   
    return state.loginReducer;
  });

  console.log("userlogin",isLogin)
    useEffect(() => {
      if(isLogin===201){
  console.log("userlogin useeeffect 201",isLogin)

        Router.push("/pim/dashboard");
      }
    }, [isLogin]);

useEffect(() => {
  // console.log("itemData",itemData);
  if(itemData){
  dispatch(userLoginApi(
    itemData
  ));
  }
}, [itemData]);

    


    const initialValues = {
      userName: "",
      password: ""
    };
  
    const onSubmit = async (values, formik) => {
      let userName = {
        name: values.userName.trim(),
      };
      let userPassword = {
        passwordKey: values.password.trim(),
      };
      // console.log("val", userName);
      if (userName.name === "" || userPassword.passwordKey === "" ) {
        notify("err");
      } else {
        let infoData={
          email: userName.name,
          password:userPassword.passwordKey,
        }

        setItemData(infoData)
        const apiRes = await userLoginApi(infoData);
        // if (apiRes === "err") {
        //   formik.setSubmitting(false);
        // } else {
        //   notifySucess(true);
        //   classModal();
        // }
      }
    };

    return (
      <>
       {user  && (
        <>
          <div className="page-container d-flex p-2">
           
           <div className="m-auto">
             
               <div className={styles.left_box}>
              
                        <Image
                           className="login-concept-logo"
                       src={loginLeft}
                       alt="loginLeft"
                       width={666}
                       height={666}
                     />
                </div>
           </div>
           <div className={styles.mid_box}>
                        <Image
                           className="login-concept-logo"
             src={loginLine1}
             alt="loginLeft"
             width={600}
             height={600}
           />
                       </div>
           <div className={`login-main-container ${styles.last_box}`}>
              
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
             
             <Form className="row mx-0 font16">
               <div className={styles.login_icon_user}>
               {/* <Image
                   // className={}
                   src={user}
                   alt="loginUser"
                   width={40}
                   height={35}
                 /> */}
               </div>
               <div className="login_username">
               <FormikControl
                 control="input"
                 type="text"
                 classprops="form-group"
                 className={`form-control form-control bb_only px-0 py-2 text-center`}
                 placeholder="Username"
                 name="userName"
                 id="userName"
               />
               </div>
                <div className={styles.login_icon_key}>
                  {/* <Image
                   className="login-concept-logo"
                   src={key}
                   alt="loginKey"
                   width={40}
                   height={35}
                 /> */}
                 </div>
                 
                 <div className="login_password">
                 <FormikControl
                 control="input"
                 type="password"
                 classprops="form-group"
                 className={`form-control form-control bb_only px-0 py-2 text-center`}
                 placeholder="Password"
                 name="password"
                 id="password"
               />
              </div>

               <div className="col-12 text-center pt-5">
                 <SubmitButton
                  // onClick={() => nullAddField()} // direct redirect
                   isLoading={isSubmitting}  //its working
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
                   <div className="w-100 text-end not-registered"> 
                   {/* <Link href="/signup"> */}
                     <a href="/signup" className={`txt_black px-1 ${styles.forget_pasword}`}>
                       Forget Password
                       </a>
                   {/* </Link> */}
                   </div>
               </div>
                 </div>
               </div>      
            </div>
           </div>
       </div>

        </>

      )
}
      
        </>
    )
};

export default React.memo(Login);

// // its working
export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps ({ req }) {
    const user = await req?.session?.user ;
// console.log("oooooooooooooooo", user)
      if (user) {
        return {
          redirect: {
            destination: '/pim/dashboard',
            permanent: false,
          },
        }
      }

    return {
      props: {
        user: req.session.user || null,
      },
    };
  },
  {
    cookieName: "PIMSESSION",
    password: "760848aa-c385-4321-ba49-75201fa0de81",
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      maxAge: 60 * 60 * 24,
    },
  },
);
