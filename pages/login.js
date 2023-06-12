import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  TextField,
  Button,
  InputAdornment,
  FormControl,
  OutlinedInput,
  InputLabel,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import styles from "./login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { userLoginApi, getNotificationApi } from "../redux/actions/login";
import { withIronSessionSsr } from "iron-session/next";
import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { sessionOption } from "../utils/session";
import logo_loginpage from "../assets/icons/logo_2_2022.svg";
import Image from "next/image";

const Login = (user) => {
  const dispatch = useDispatch();
  const { loginReducer } = useSelector((state) => {
    return state.loginReducer;
  });

  const { isLogin, userRole } = useSelector((state) => {
    return state.loginReducer;
  });
  // console.log('testing isLogin', isLogin, userRole)

  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [itemData, setItemData] = useState();
  // console.log("username", username, password);
  // const { userGet,roleGet } = useSelector(state => {
  //   return state.loginReducer;
  // });
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submitHandler = () => {
    if (username === "" || password === "") {
      toast.error("Please enter UserName and Password");
    } else {
      let loginData = {
        email: username,
        password: password,
      };
      setItemData(loginData);
    }
  };

  useEffect(() => {
    if (itemData) {
      console.log("itemData", itemData);
      dispatch(userLoginApi(itemData));
    }
  }, [itemData]);

  useEffect(() => {
    // dispatch(getNotificationApi());
    if (isLogin === 201 && userRole !== "ADMIN") {
      Router.push("/allProducts");
    } else if (isLogin === 201 && userRole === "ADMIN") {
      Router.push("/userDetails");
    }
  }, [isLogin, userRole, user]);

  return (
    <>
      <Box className={styles.mainBGContainer}>
        <Box className={styles.logo_Image}>
          <Image
            // className="px-2 "
            src={logo_loginpage}
            alt="edit"
            width={150}
            height={150}
          />
        </Box>
      </Box>
      <Box className={styles.mainContainer}>
        <Grid className={styles.container}>
          <Grid item xs={12} lg={12}>
            <Card sx={{ p: 4 }} className={styles.loginCard}>
              <Typography variant="h1" className={styles.loginPara}>
                Login
              </Typography>
              <Box
                sx={{
                  "& > legend": { mt: 2 },
                }}
              >
                <Stack spacing={3}>
                  {/* <TextField
                  id="email-basic"
                  label="User Name"
                  variant="outlined"
                /> */}
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-account">
                      User Name
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-account"
                      endAdornment={
                        <InputAdornment position="end">
                          <AccountCircleIcon />
                        </InputAdornment>
                      }
                      label="User Name"
                      value={username}
                      onChange={handleUsernameChange}
                    />
                  </FormControl>
                  {/* <TextField
                  id="pass-basic"
                  label="Password"
                  type="password"
                  variant="outlined"
                /> */}
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </FormControl>
                  <Button
                    style={{
                      color: "#fff",
                      background: "#fdb834",
                      borderRadius: "30px",
                      padding: "10px",
                      margin: "40px 0 10px 0",
                    }}
                    mt={2}
                    onClick={() => {
                      submitHandler();
                    }}
                  >
                    Get Started
                  </Button>
                </Stack>
              </Box>
            </Card>

            <Typography
              variant="h3"
              component="legend"
              className={styles.paragraph}
            >
              PRODUCT INFORMATION MANAGEMENT
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <ToastContainer />
    </>
  );
};

export default Login;

// // its working
export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = await req?.session?.user;

    // console.log("hello login", user);

    if (user) {
      return {
        redirect: {
          destination: "/userDetails",
          permanent: false,
        },
      };
    }

    return {
      props: {
        user: req.session.user || null,
      },
    };
  },
  sessionOption
);
