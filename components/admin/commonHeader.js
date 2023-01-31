import React, { Fragment, useContext, useMemo } from "react";
import { Navbar, Container } from "react-bootstrap";
import Link from "next/link";
// import { Auth } from "../../pages/_app";
// import GoogleSignout from "../utility/googleSignout";
import Image from "next/image";

import styles from "../../pages/dashboard/dashboard.module.css";
import logo from "../../assets/icons/logo_2_2022.svg";
import user from "../../assets/icons/user1.png";
import MyProfile from "./myProfile";

function CommonHeader() {

    // const { loginState } = useContext(Auth);

    // const loginButton = useMemo(() => {
    //     const login = <Link key="login" href="/login"><a className="txt_blue">Login</a></Link>;
    //     const logOut = <GoogleSignout key="logout" />
    //     return (loginState.isLogin ? logOut : login)
    // }, [loginState]);

    return (
        // <Fragment>
        //     <Navbar className="bg_light_gray px-md-5">
        //         {/* <Container> */}
        //             <Navbar.Brand as={Link} href="/">
        //                 <a><img src="/logo.png" alt="/logo" /></a>
        //             </Navbar.Brand>
        //             <Navbar.Toggle />
        //             <Navbar.Collapse className="justify-content-end">
        //                 {loginButton}
        //             </Navbar.Collapse>
        //         {/* </Container> */}
        //     </Navbar>
        //     <div className="divider w-100"></div>
        // </Fragment>
        <>
           <div className={styles.header}>
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-10">
                  <div className={styles.header_logo}>
                    <div className="header_logo_img">
                      <Image src={logo} alt="logo" width={55} height={39} />
                    </div>
                    <span className={styles.header_info}>
                      Product information management
                    </span>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className={styles.header_profile}>
                    <div className={styles.header_profile_img}>
                      <Image src={user} alt="logo" width={30} height={30} />
                    </div>
                    <span className={styles.header_profile_info}>
                      {/* myProfile */}
                      <MyProfile />
                    </span>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
    )
}
export default React.memo(CommonHeader);
