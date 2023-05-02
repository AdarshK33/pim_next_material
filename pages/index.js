import { Grid } from "@mui/material";
import BlogCard from "../src/components/dashboard/BlogCard";
import SalesOverview from "../src/components/dashboard/SalesOverview";
import DailyActivity from "../src/components/dashboard/DailyActivity";
import ProductPerfomance from "../src/components/dashboard/ProductPerfomance";
import { withIronSessionSsr } from "iron-session/next";

import Login from "./login";

export default function Index() {
  return (
    <>
      <Login />
    </>
    // <Grid container spacing={0}>
    //   <Grid item xs={12} lg={12}>
    //     <SalesOverview />
    //   </Grid>
    //   {/* ------------------------- row 1 ------------------------- */}
    //   <Grid item xs={12} lg={4}>
    //     <DailyActivity />
    //   </Grid>
    //   <Grid item xs={12} lg={8}>
    //     <ProductPerfomance />
    //   </Grid>
    //   <Grid item xs={12} lg={12}>
    //     <BlogCard />
    //   </Grid>
    // </Grid>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    try {
      const user = req?.session?.user || null;
      console.log("hello index", user);
      if (user) {
        return {
          redirect: {
            destination: "/userManagement",
            permanent: false,
          },
        };
      }

      return {
        props: {
          user: req?.session?.user || null,
        },
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  {
    cookieName: "PIMSESSION",
    password: "760848aa-c385-4321-ba49-75201fa0de80",
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      maxAge: 60 * 60 * 24,
    },
  }
);
