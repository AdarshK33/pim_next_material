import "bootstrap/dist/css/bootstrap.min.css";
import React, { useReducer, Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import withRedux from "next-redux-wrapper";
import PublicHeader from "../components/public/publicHeader";
import "../styles/globals.css";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import { refreshTokenApi } from "../components/utility/apiUtility";
import { mainStore } from "../redux/store";
// import RouteGuard from "../components/RouteGuard";

export const Auth = React.createContext();

function MyApp({ Component, pageProps }) {
  const LoginStat = {
    isLogin: useSelector((state) => state.reducer.isLogin),
    token: useSelector((state) => state.reducer.token),
  };
  const router = useRouter();
  const cookies = new Cookies();
  const [loading, setLoading] = useState(
    cookies.get("tokenExp") ? cookies.get("tokenExp") > Date.now() : false
  );

  const refreshToken = async () => {
    const refreshData = await refreshTokenApi();
    if (refreshData === "err") {
    } else {
      cookies.set("token", refreshData.data.accessToken);
      cookies.set("tokenExp", refreshData.data.accessTokenExpiryTime);
      cookies.set("refreshToken", refreshData.data.refreshToken);
      setLoading(false);
    }
  };

  return loading ? (
    <div className="d-flex min90vh">Loading...</div>
  ) : (
    <Fragment>
      <Auth.Provider value={{ loginState: LoginStat }}>
        {router.route !== "/login" && router.route !== "/signup" &&router.route !== "/dashboard/dashboard" && (
          <PublicHeader />
        )}
        {/* <RouteGuard> */}
          <Component {...pageProps} />
        {/* </RouteGuard> */}
      </Auth.Provider>
    </Fragment>
  );
}

export default withRedux(mainStore, { debug: false })(MyApp);
