import React, { useContext } from "react";
import { GoogleLogout } from "react-google-login";
import { clientId } from "./commonUtility";
import Cookies from "universal-cookie";
import { Auth } from "../../pages/_app";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import actions from "../../redux/action";

function GoogleSignOut({ userLogin, userTenetID }) {
  const cookies = new Cookies();
  const { dispatch } = useContext(Auth);
  const router = useRouter();

  const logout = () => {
    userLogin({
      isLogin: false,
      token: null,
    });
    userTenetID(undefined);
    localStorage.removeItem("tokenLocal");
    cookies.remove("token");
    cookies.remove("isLogin");
    cookies.remove("tenantId");
    cookies.remove("tokenExp");
    cookies.remove("refreshToken");
    dispatch({ type: "logout" });
    setTimeout(() => router.push("/"), 300);
    console.log("token after logout", cookies.get("token"));
  };

  return (
    <>
      <GoogleLogout
        clientId={clientId}
        onLogoutSuccess={logout}
        buttonText="LogOut"
        icon={false}
        className="btn btn-sm"
        // render={renderProps => <a onClick={renderProps.onClick} className="">
        //     LogOut
        // </a>}
      />
    </>
  );
}

const mapDispatchToProps = {
  userLogin: actions.userLogin,
  userTenetID: actions.userTenetID,
};
export default connect(null, mapDispatchToProps)(React.memo(GoogleSignOut));
