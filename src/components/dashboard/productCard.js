import React, { useState, useEffect } from "react";

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
import { useDispatch, useSelector } from "react-redux";

const ProductCard = () => {
  const dispatch = useDispatch();
  // const router = useRouter();
  const { dashBoardData } = useSelector((state) => {
    return state.loginReducer;
  });
  const [productData, setProductData] = useState();

  useEffect(() => {
    const DummiyData = [
      {
        value: dashBoardData?.productStatusCounts?.DRAFT,
        title: "Draft",

        color: "#FDBA39",
        textShadow: "1px 2px 1px #FDBA39",
      },
      {
        value: dashBoardData?.productStatusCounts?.READY_FOR_REVIEW,
        title: "Ready for review",
        color: "#FD4539",
        textShadow: "1px 2px 1px #FDBA39",
      },
      {
        value: dashBoardData?.productStatusCounts?.ACTIVATED,
        title: "Active",
        color: "#419794",
        textShadow: "1px 2px 1px #419794",
      },
      {
        value: dashBoardData?.productStatusCounts?.REVALIDATE,
        title: "Revalidate",
        color: "#838585",
        textShadow: "1px 2px 1px #838585",
      },
      {
        value: dashBoardData?.productStatusCounts?.BLOCKED,
        title: "In Active",
        color: "#838585",
        textShadow: "1px 2px 1px #838585",
      },
    ];
    setProductData(DummiyData);
  }, [dashBoardData]);
  // console.log(productData, "productData");

  return (
    // #F2F0F0
    <Grid container>
      {productData &&
        productData.length &&
        productData.map((blog, index) => (
          <Grid
            key={index}
            item
            xs={12}
            lg={2.33}
            sx={{
              display: "flex",
              alignItems: "stretch",
            }}
          >
            <Card
              sx={{
                p: 0,
                width: "100%",
              }}
            >
              <CardContent
                sx={{
                  paddingLeft: "25px",
                  paddingRight: "25px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "30px",
                    fontWeight: "500",
                    color: blog.color,
                    textShadow: blog.textShadow,
                  }}
                >
                  {blog.value}
                </Typography>
                <Divider />
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                    paddingTop: "5px",
                  }}
                >
                  {blog.title}
                </Typography>

                {/* <Typography
                color="textSecondary"
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  mt: 1,
                }}
              >
                {blog.subtitle}
              </Typography> */}
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};


export default React.memo(ProductCard);
