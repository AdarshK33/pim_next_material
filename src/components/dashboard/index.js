import React, { useState, useEffect } from "react";
import styles from "./dashboard.module.css";
import ProductCard from "./productCard";
import ProductChart from "./productChart";
// import ProductGraph from "./productGraph";
import ProductAlert from "./productAlert";
import { useDispatch, useSelector } from "react-redux";
import {

  getDashBoardApi,
  userLoginSuccess

} from "../../../redux/actions/login";

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
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


const DashBoard = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(userLoginSuccess(0))
    dispatch(getDashBoardApi());

  }, []);
  return (
    <>
      <Box className={styles.bg_color}>
        <ProductCard />
        <Card>
          <ProductChart />
        </Card>
        {/* <ProductGraph /> */}
        <ProductAlert />
      </Box>
    </>
  );
};


export default React.memo(DashBoard);

