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
import { userLoginApi } from "../redux/actions/login";
import { withIronSessionSsr } from "iron-session/next";

const Login = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [itemData, setItemData] = useState();
  console.log("username", username, password);
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
      alert("Plase Enter UserName and Password");
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
      dispatch(userLoginApi(itemData));
    }
  }, [itemData]);

  return (
    <div className={styles.mainContainer}>
      <Grid spacing={0} className={styles.container}>
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
    </div>
  );
};

export default Login;

// // its working
export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = await req?.session?.user;

    console.log("hello login", user);

    if (user) {
      return {
        redirect: {
          destination: "/userManagement",
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
  {
    cookieName: "PIMSESSION",
    password: "760848aa-c385-4321-ba49-75201fa0de80",
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      maxAge: 60 * 60 * 24,
    },
  }
);
