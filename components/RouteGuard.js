import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { connect, useSelector } from "react-redux";
// import { Auth } from "../pages/_app";

function RouteGuard({ children }) {
  const LoginStat = {
    isLogin: useSelector((state) => state.reducer.isLogin),
    token: useSelector((state) => state.reducer.token),
  };
  // const { loginState } = useContext(Auth);
  const isToken = useSelector((state) => state.reducer.userTokenId);
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // console.log("LoginStat", LoginStat);
    authCheck(router.asPath);

    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

  }, [LoginStat]);

  function authCheck(url) {
    const publicPaths = ["/login"];
    const path = url.split("?")[0];
    if (!LoginStat.isLogin && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/login",
        query: { returnUrl: router.asPath },
      });
    } else {
      setAuthorized(true);
    }
  }

  return authorized && children;
}

export default connect(null, {})(React.memo(RouteGuard));
