import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import user1 from "../../../assets/images/backgrounds/u2.jpg";
import user2 from "../../../assets/images/backgrounds/u3.jpg";
import user3 from "../../../assets/images/backgrounds/u4.jpg";
import styles from "./dashboard.module.css";

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
  ["Task", "Hours per Day"],
  ["Partially  Completed", 11],
  ["Fully Completed", 12],
  ["No Data", 10],
];

export const options = {
  title: [
    { text: "Ax master", textStyle: { fontSize: 16, bold: true } },
    { text: "Keymed master", textStyle: { fontSize: 14 } },
  ],
  pieHole: 0.4,
  is3D: false,
  legend: "none",
  colors: ["#D9D9D9", "#419794", "#FDB834"],
};

const DummiyData = [
  {
    title: "AX MASTER",
  },
  {
    title: "KEYMED MASTER",
  },
  {
    title: "HIPER MASTER",
  },
  {
    title: "R_DRUGS",
  },
  {
    title: "ONLINE MASTER",
  },
];

const ProductChart = () => {
  return (
    <>
      <Grid container>
        {DummiyData.map((blog, index) => (
          <Grid
            key={index}
            item
            xs={12}
            lg={2.34}
            sx={{
              display: "flex",
              alignItems: "stretch",
            }}
          >
            <Box
              sx={{
                p: 0,
                width: "100%",
                // alignItems: "stretch",
                // border: "1px solid blue",
              }}
            >
              <Box
                sx={{
                  textAlign: "center",
                }}
                className={styles.text_title}
              >
                <p className={styles.text_main_title}> {blog.title}</p>
              </Box>
              <Box
                sx={{
                  // border: "5px solid green",
                  textAlign: "center",
                }}
              >
                <Chart
                  chartType="PieChart"
                  width="200px"
                  height="200px"
                  data={data}
                  options={options}
                  // style={{ border: ".6px solid red" }}
                />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Box className={styles.partially_completed}></Box>
          <Box> Partially Completed</Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
          className={styles.text_data}
        >
          <Box className={styles.data_completed}></Box>
          <Box> Fully Completed</Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
          className={styles.text_data}
        >
          <Box className={styles.no_data_completed}></Box>
          <Box> No Data</Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductChart;
