import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Image from "next/image";
import user1 from "../../../assets/images/backgrounds/u2.jpg";
import user2 from "../../../assets/images/backgrounds/u3.jpg";
import user3 from "../../../assets/images/backgrounds/u4.jpg";
import styles from "./dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";

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
import loginReducer from "../../../redux/reducer/loginReducer";
import { Chart } from "react-google-charts";

// const Chart = dynamic(() => import("react-google-charts"), { ssr: false });
// const Chart = dynamic(() => import("react-google-charts"));

const ProductChart = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { dashBoardData } = useSelector((state) => {
    return state.loginReducer;
  });
  const [masterData, setMasterData] = useState();
  const [chartData, setChartData] = useState();

  // console.log(masterData, "masterData");
  // console.log(chartData, "chartData");

  const data = [
    ["attributeSetName", "Ax master"],
    ["Partially_Completed", 11],
    ["Fully_Completed", 12],
    ["No_Data", 10],
  ];
  // console.log("dashBoardData :>> ", dashBoardData);

  // console.log("data :>> ", data);

  const options = {
    // title: [{ text: "Ax master" }],
    pieHole: 0.4,
    is3D: false,
    legend: "none",
    colors: ["#419794", "#fd7439", "#99b6f8"],
  };

  // title: "Ready for review",
  //       color: "#FD4539",

  useEffect(() => {
    if (!dashBoardData?.dashboardResponses) {
      return;
    }
    // const convertedData = dashBoardData?.dashboardResponses.map((response) => [
    //   response.attributeSetName,
    // ]);
    // setMasterData(convertedData);

    const dynamicData = dashBoardData?.dashboardResponses.map((response) => {
      return Object.entries(response).map(([key, value]) => {
        if (key === "attributeSetName") {
          return [key, value];
        } else {
          return [key, value];
        }
      });
    });
    setChartData(dynamicData);
  }, [dashBoardData]);
  // console.log(chartData, "chartData");

  // const DummiyData = [
  //   {
  //     title: "AX MASTER",
  //   },
  //   {
  //     title: "KEYMED MASTER",
  //   },
  //   {
  //     title: "HIPER MASTER",
  //   },
  //   {
  //     title: "R_DRUGS",
  //   },
  //   {
  //     title: "ONLINE MASTER",
  //   },
  // ];
  function handleFormation() {
    console.log("hello allProducts");
    router.push(`/allProducts`);
  }
  return (
    <>
      <Grid container>
        {chartData &&
          chartData !== null &&
          chartData !== undefined &&
          chartData.length !== 0 &&
          chartData.map((blog, index) => (
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
                  <Typography
                    className={styles.text_main_title}
                    sx={{
                      fontWeight: "600",
                    }}
                  >
                    {blog.find(([key]) => key === "attributeSetName")[1]}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    // border: "5px solid green",
                    textAlign: "center",
                  }}
                  className={styles.main_chart_dashboard}
                  onClick={(e) => handleFormation(e)}
                >
                  <Chart
                    chartType="PieChart"
                    width="200px"
                    height="200px"
                    data={blog}
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
