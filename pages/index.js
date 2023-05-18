import React, { useState, useEffect } from "react";

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
  sessionOption
);
