import React from "react";
import { Grid, Rating, Box, Typography } from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";
import FeatherIcon from "feather-icons-react";


const Login = () => {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
console.log("bulkListData",process.env.SYNC_QUERY_SERVICE_URL)

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
