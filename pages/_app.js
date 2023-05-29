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
import { getNotificationApi } from "../redux/actions/login";
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
        console.log('MyApp => useEffect => response =>', response)
        console.log("testing response", response?.data?.role);
        dispatch(
          userRole(
            response?.data?.role,
            "Login role saved Successfully",
            "LOGIN DETAILS"
          )
        );
        dispatch(userAuthorities(response.data.authorities))
      })
      .catch((err) => {
        console.log("err in catch", err);
      });
  }, []);

  useEffect(() => {
    dispatch(getCategoriesApi());
    dispatch(getNotificationApi());
    dispatch(getChannelListApi(0, 1000));
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

// export const getServerSideProps = withIronSessionSsr(
//   async function getServerSideProps({ req }) {
//     try {
//       const user = req?.session?.user || null;
//       console.log("hello app", user);
//       if (!user) {
//         return {
//           redirect: {
//             destination: "/login",
//             permanent: false,
//           },
//         };
//       }

//       return {
//         props: {
//           user: req?.session?.user || null,
//         },
//       };
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   },
//   {
//     cookieName: "PIMSESSION",
//     password: "760848aa-c385-4321-ba49-75201fa0de80",
//     cookieOptions: {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production" ? true : false,
//       maxAge: 60 * 2,
//     },
//   }
// );

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
export default withRedux(mainStore, { debug: false })(MyApp);
