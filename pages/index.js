import { Grid } from "@mui/material";
import BlogCard from "../src/components/dashboard/BlogCard";
import SalesOverview from "../src/components/dashboard/SalesOverview";
import DailyActivity from "../src/components/dashboard/DailyActivity";
import ProductPerfomance from "../src/components/dashboard/ProductPerfomance";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOption } from "../utils/session";

import Login from "./login";

export default function Index() {
  return (
    <>
      <Login />
    </>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    try {
      const user = req?.session?.user || null;
      // console.log("hello index", user);
      if (user) {
        return {
          redirect: {
            destination: "/dashboard",
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
