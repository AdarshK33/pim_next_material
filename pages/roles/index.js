import React from "react";
import Role from "../../src/components/role";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOption } from "../../utils/session";
const index = () => {
  return (
    <div>
      <Role />
    </div>
  );
};

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
      if (req?.session?.user?.role !== "ADMIN") {
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
