import React,{useState, useEffect} from "react";
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
import { useDispatch,useSelector} from "react-redux";
import {userLoginApi,getUserListApi } from "../redux/actions/login";


const Login = () => {
  const dispatch = useDispatch();


  const { userGet,roleGet } = useSelector(state => {
   
    return state.loginReducer;
  });

  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  console.log("bulkListData", process.env.SYNC_QUERY_SERVICE_URL);
console.log("userGet",userGet)




useEffect(() => {
  // let infoData={
  //   email: 'demo@gmail.com',
  //   password:'@gmail.com$Apollo',
  // }

  // console.log("itemData",itemData);
 
  dispatch(getUserListApi(
    0,10
  ));
  
}, []);
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
                <FormControl  variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-account">
                    User Name
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-account"
                    endAdornment={
                      <InputAdornment position="end">
                        <AccountCircleIcon/>
                      </InputAdornment>
                    }
                    label="User Name"
                  />
                </FormControl>
                {/* <TextField
                  id="pass-basic"
                  label="Password"
                  type="password"
                  variant="outlined"
                /> */}
                <FormControl  variant="outlined">
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
                  onClick={(e) => {
                    submitHandler(e);
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
