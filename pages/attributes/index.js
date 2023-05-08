import React, {
  Fragment,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import Attributes from "../../src/components/attributes";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOption } from "../../utils/session";
function index(user) {
  // useEffect(() => {
  //   if (!user) {
  //     window.location.reload();
  //   }
  // }, [user]);
  return (
    <>
      <Attributes />
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
