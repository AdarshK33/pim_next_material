import React, { Fragment, useContext } from "react";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import { loginApiCall } from "./apiUtility";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
// import { Auth } from "../../pages/_app";
import { clientId } from "./commonUtility";
import actions from "../../redux/action";

function GoogleAuth({ userLogin, userTenetID }) {
  const router = useRouter();
  const cookies = new Cookies();
  // const { dispatch } = useContext(Auth);

  const success = async (res) => {
    const userData = {
      name: res.profileObj.name,
      email: res.profileObj.email,
      imageUrl: res.profileObj.imageUrl,
      providerId: res.googleId,
      provider: "GOOGLE",
    };
    const apiRes = await loginApiCall(JSON.stringify(userData));

    if (apiRes === "err") {
    } else {
      console.log("tenId", apiRes.data.tenantId);
      let payload = {
        isLogin: true,
        token: apiRes.data.accessToken,
      }
      userLogin(payload);
      userTenetID(apiRes.data.tenantId);
      if (typeof window !== 'undefined') {
        // Perform localStorage action
        localStorage.setItem("tokenLocal", apiRes.data.accessToken);
      }
      cookies.set("isLogin", true, { path: "/" });
      cookies.set("tenantId", apiRes.data.tenantId, { path: "/" });
      cookies.set("token", apiRes.data.accessToken, { path: "/" });
      cookies.set("tokenExp", apiRes.data.accessTokenExpiryTime, { path: "/" });
      cookies.set("refreshToken", apiRes.data.refreshToken, { path: "/" });
      router.push("/pim/dashboard");
    }
  };

  const error = () => {};

  return (
    <Fragment>
      <GoogleLogin
        onSuccess={success}
        onFailure={error}
        clientId={clientId}
        cookiePolicy="single_host_origin"
        // buttonText="Continue with Google"
        // className="btn btn-block btn-login-google w-100"
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            className="btn btn-block btn-login-google"
          >
            <img src="/google-icon.png" alt="Google-icon" height="100%" />{" "}
            Continue with Google
          </button>
        )}
      />
    </Fragment>
  );
}

const mapDispatchToProps = {
  userLogin: actions.userLogin,
  userTenetID: actions.userTenetID,
};
export default connect(null, mapDispatchToProps)(React.memo(GoogleAuth));
