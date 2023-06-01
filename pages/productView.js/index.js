import React from "react";
import ProductViewDetails from "../../src/components/catalog/activeProducts/activeProductView.js";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOption } from "../../utils/session";
const index = (user) => {
  return (
    <div>
      <ProductViewDetails user={user} />
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
