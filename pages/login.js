import React, { useContext, useEffect,useState } from "react";

import { Grid, Rating, Box, Typography } from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";
import FeatherIcon from "feather-icons-react";
import { useDispatch,useSelector} from "react-redux";
import {userLoginApi,getUserListApi } from "../redux/actions/login";


const Login = () => {
  const dispatch = useDispatch();


  const { userGet,roleGet } = useSelector(state => {
   
    return state.loginReducer;
  });

  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
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
    <Grid container spacing={0}>
      
      <Grid item xs={12} lg={12}>
        <BaseCard title="LOGIN">
          <Box
            sx={{
              "& > legend": { mt: 2 },
            }}
          >
            <Typography component="legend">LOGIN PIM</Typography>
           
           
          </Box>
        </BaseCard>
      </Grid>
     
    </Grid>
  );
};

export default Login;
