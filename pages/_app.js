import * as React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme/theme";
import createEmotionCache from "../src/createEmotionCache";
import FullLayout from "../src/layouts/FullLayout";
import "../styles/style.css";
import withRedux from "next-redux-wrapper";
import { mainStore } from "../redux/store";
// import { withIronSessionSsr } from "iron-session/next";
import { client } from "../utils/axios";
import { userAuthorities, userRole } from "../redux/actions/login";
import { useDispatch } from "react-redux";
import { getCategoriesApi } from "../redux/actions/catalogServiceNew";
import {
  getNotificationApi,
  getDashBoardApi,
  getRoleApi,
} from "../redux/actions/login";
import { getChannelListApi } from "../redux/actions/channel";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  let dispatch = useDispatch();
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    // user,
  } = props;

  useEffect(() => {
    client
      .post("api/userApi")
      .then((response) => {
        console.log("MyApp => useEffect => response =>", response);
        console.log("testing response", response?.data?.role);
        dispatch(
          userRole(
            response?.data?.role,
            "Login role saved Successfully",
            "LOGIN DETAILS"
          )
        );
        dispatch(userAuthorities(response.data.authorities));
      })
      .catch((err) => {
        console.log("err in catch", err);
      });
  }, []);

  // useEffect(() => {
  //   dispatch(getCategoriesApi());
  //   dispatch(getNotificationApi());
  //   dispatch(getDashBoardApi());
  //   dispatch(getRoleApi());

  //   dispatch(getChannelListApi(0, 1000));
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(getCategoriesApi()),
          dispatch(getNotificationApi()),
          dispatch(getDashBoardApi()),
          dispatch(getRoleApi()),
          dispatch(getChannelListApi(0, 1000))
        ]);
      } catch (error) {
        console.log(error)
      }
    };

    fetchData();
  }, []);
  // useeffect and dispatch called -init
  // client to server call - use : api/userApi
  // get the response in client side
  // store the response in redux - loginReducer

  // console.log("hello user", user);
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>PIM</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FullLayout>
          <Component {...pageProps} />
        </FullLayout>
      </ThemeProvider>
    </CacheProvider>
  );
}


MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
export default withRedux(mainStore, { debug: false })(MyApp);
