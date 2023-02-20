import Head from 'next/head'
import styles from '../styles/Home.module.css';
import Login from"./login";
import {initApplication} from "../redux/actions/app"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useUser from "../utils/useUser";

export default function Home() {

  const { user, mutateUser } = useUser();
  const dispatch = useDispatch();
  // useEffect(() => {
	// 	dispatch(initApplication());
	// }, []);




  
// const { loginUser } = useSelector(({app}) => {
//   console.log("hello app",app)
//   return {loginUser: app?.loggedIn,};
// });

// console.log("hello uuuuuuuu",loginUser)

  return (
    <div className={styles.container}>
      <Head>
        {/* <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;1,200;1,300;1,400;1,500;1,600&display=swap" rel="stylesheet"/> */}
        <title>Apollo_PIM</title>       
      </Head>

      {/* {user?.isLoggedIn === false && ( */}
             <Login />
          {/* )} */}

   
    </div>
  )
}

