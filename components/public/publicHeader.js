import React, { Fragment, useContext, useMemo } from "react";
import { Navbar, Container } from "react-bootstrap";
import Link from "next/link";
import { Auth } from "../../pages/_app";
import GoogleSignout from "../utility/googleSignout";

function PublicHeader() {

    const { loginState } = useContext(Auth);

    const loginButton = useMemo(() => {
        const login = <Link key="login" href="/login"><a className="txt_blue">Login</a></Link>;
        const logOut = <GoogleSignout key="logout" />
        return (loginState.isLogin ? logOut : login)
    }, [loginState]);

    return (
        <Fragment>
            <Navbar className="bg_light_gray px-md-5">
                {/* <Container> */}
                    <Navbar.Brand as={Link} href="/">
                        <a><img src="/logo.png" alt="/logo" /></a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        {loginButton}
                    </Navbar.Collapse>
                {/* </Container> */}
            </Navbar>
            <div className="divider w-100"></div>
        </Fragment>
    )
}

export default React.memo(PublicHeader);