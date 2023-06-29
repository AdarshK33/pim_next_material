import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

import {
  IconButton,
  Input,
  Box,
  Alert,
  Drawer,
  Menu,
  Button,
  List,
  Divider,
  MenuItem,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";

const Chart = dynamic(() => import("react-google-charts"), { ssr: false });
export const data = [
  ["Month", ""],
  ["January", 2000],
  ["February", 5000],
  ["March", 15000],
  ["April", 0],
  ["May", 10000],
  ["June", 20000],
  ["July", 30000],
  ["August", 19000],
  ["September", 10000],
  ["October", 5000],
  ["November", 15000],
  ["December", 21000],
];

export const options = {
  hAxis: {
    title: "Monthly",
    gridlines: {
      color: "transparent", // Hide horizontal gridlines
    },
  },
  vAxis: {
    title: "",
    minValue: 0, // Set the minimum value for the y-axis
    maxValue: 35000, // Set the maximum value for the y-axis
    ticks: [1000, 5000, 10000, 15000, 20000, 25000, 30000, 35000], //
  },
  series: {
    1: { curveType: "function" },
  },
  legend: "none",
};
const DummiyData = [
  {
    title: "PIM",
  },
  {
    title: "Channel",
  },
];

const ProductGraph = () => {
  return (
    <>
      <Grid container>
        <Grid
          //   key={index}
          item
          xs={6}
          lg={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Card>
            <CardContent>
              <Box
                sx={{
                  width: "100%",
                  alignItems: "stretch",
                  // border: "1px solid blue",
                }}
              >
                {/* <Typography>Total Active Products In PIM</Typography> */}
                <Box
                  sx={{
                    // border: "5px solid green",
                    textAlign: "center",
                    alignItems: "stretch",
                  }}
                >
                  <Chart
                    chartType="LineChart"
                    width="100%"
                    height="400px"
                    data={data}
                    options={options}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          //   key={index}
          item
          xs={6}
          lg={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Card>
            <CardContent>
              <Box
                sx={{
                  width: "100%",
                  alignItems: "stretch",
                  // border: "1px solid blue",
                }}
              >
                {/* <Typography>Total Active Products In PIM</Typography> */}
                <Box
                  sx={{
                    // border: "5px solid green",
                    textAlign: "center",
                    alignItems: "stretch",
                  }}
                >
                  <Chart
                    chartType="LineChart"
                    width="100%"
                    height="400px"
                    data={data}
                    options={options}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(ProductGraph);

