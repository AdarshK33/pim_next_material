import { Grid } from "@mui/material";
import ProductPerfomance from "../src/components/dashboard/ProductPerfomance";

const Tables = () => {
  return (
    <Grid container>
      <Grid item xs={12} lg={12}>
        <ProductPerfomance />
      </Grid>
    </Grid>
  );
};

export default Tables;
