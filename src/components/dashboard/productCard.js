import React from "react";
import Image from "next/image";
import user1 from "../../../assets/images/backgrounds/u2.jpg";
import user2 from "../../../assets/images/backgrounds/u3.jpg";
import user3 from "../../../assets/images/backgrounds/u4.jpg";
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

const DummiyData = [
  {
    value: 68,
    title: "Draft",

    color: "#FDBA39",
    textShadow: "1px 2px 1px #FDBA39",
  },
  {
    value: 10,
    title: "Redy for review",
    color: "#FD4539",
    textShadow: "1px 2px 1px #FDBA39",
  },
  {
    value: 12345,
    title: "Active",
    color: "#419794",
    textShadow: "1px 2px 1px #419794",
  },
  {
    value: 123,
    title: "Revalidate",
    color: "#838585",
    textShadow: "1px 2px 1px #838585",
  },
  {
    value: 45,
    title: "In Active",
    color: "#838585",
    textShadow: "1px 2px 1px #838585",
  },
];

const ProductCard = () => {
  const dispatch = useDispatch();
  // const router = useRouter();
  const { dashBoardData } = useSelector((state) => {
    return state.loginReducer;
  });
  return (
    // #F2F0F0
    <Grid container>
      {DummiyData.map((blog, index) => (
        <Grid
          key={index}
          item
          xs={12}
          lg={2.3}
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
                  fontSize: "15px",
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

export default ProductCard;
