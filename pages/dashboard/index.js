import React, { useState, useEffect } from "react";

import { withIronSessionSsr } from "iron-session/next";
import { sessionOption } from "../../utils/session";
import { Grid } from "@mui/material";
import BlogCard from "../../src/components/dashboard/BlogCard";
import SalesOverview from "../../src/components/dashboard/SalesOverview";
import DailyActivity from "../../src/components/dashboard/DailyActivity";
import ProductPerfomance from "../../src/components/dashboard/ProductPerfomance";
function index() {
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <SalesOverview />
        </Grid>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={4}>
          <DailyActivity />
        </Grid>
        <Grid item xs={12} lg={8}>
          <ProductPerfomance />
        </Grid>
        <Grid item xs={12} lg={12}>
          <BlogCard />
        </Grid>
      </Grid>
    </>
  );
}

export default index;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    try {
      const user = req?.session?.user || null;
      if (!user) {
        return {
          redirect: {
            destination: "/",
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
  sessionOption
);
