import React, { useState, useEffect } from "react";
import styles from "./dashboard.module.css";

import dynamic from 'next/dynamic'

// const ProductCard = dynamic(() => import('./ProductCard'), { ssr: false })
// const ProductChart = dynamic(() => import('./ProductChart'), { ssr: false })
// const ProductAlert = dynamic(() => import('./ProductAlert'), { ssr: false })


import ProductCard from "./productCard";
import ProductChart from "./productChart";
// import ProductGraph from "./productGraph";
import ProductAlert from "./productAlert";
import { useDispatch, useSelector } from "react-redux";
import {

  getDashBoardApi,
  userLoginSuccess,
  getNotificationApi
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
    dispatch(getNotificationApi())

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

