import React, { useState, useEffect } from "react";
import styles from "./dashboard.module.css";
import ProductCard from "./productCard";
import ProductChart from "./productChart";
import ProductGraph from "./productGraph";
import ProductAlert from "./productAlert";

import { Box } from "@mui/material";

// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DashBoard = () => {
  return (
    <>
      <Box className={styles.bg_color}>
        <ProductCard />
        <ProductChart />
        <ProductGraph />
        <ProductAlert />
      </Box>
    </>
  );
};

export default DashBoard;
