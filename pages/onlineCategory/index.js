import OnlineCategory from "../../src/components/onlineCategory";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOption } from "../../utils/session";
// import AddCategory from "../../src/components/category/addCategory";

function index() {
  return (
    <div
    // style={{
    //   display: "flex",
    //   flexDirection: "row",
    //   // justifyContent: "center",
    //   // alignItems: "center",
    //   width: "100%",
    //   height: "100%",
    //   "webkit-scrollbar": "none",
    // }}
    >
      <OnlineCategory />
      {/* <AddCategory /> */}
    </div>
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
