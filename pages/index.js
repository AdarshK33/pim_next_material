import Head from 'next/head'
import styles from '../styles/Home.module.css';
import Login from"./login";
import {initApplication} from "../redux/actions/app"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useUser from "../utils/useUser";


import RedirectLogin from "../pages/redirectLogin";

import sessionOption from "../utils/session"

import { withIronSessionSsr } from "iron-session/next";

export default function Home(user) {

  // const { user, mutateUser } = useUser();
  const dispatch = useDispatch();
  // useEffect(() => {
	// 	dispatch(initApplication());
	// }, []);


  
// const { loginUser } = useSelector(({app}) => {
//   console.log("hello app",app)
//   return {loginUser: app?.loggedIn,};
// });



  return (
    <div className={styles.container}>
      <Head>
        {/* <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;1,200;1,300;1,400;1,500;1,600&display=swap" rel="stylesheet"/> */}
        <title>Apollo_PIM</title>       
      </Head>

    
     <Login />
    
            
           

    </div>
  )
}



export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    try {
    const user = req?.session?.user ||null;

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
        user: req?.session?.user|| null,
      },
    };
  }catch(error){
    console.error(error);
    throw error;
  }
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


