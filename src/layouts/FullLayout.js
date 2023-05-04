import React from "react";
import {
  experimentalStyled,
  useMediaQuery,
  Container,
  Box,
} from "@mui/material";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./footer/Footer";
import { useRouter } from "next/router";

const MainWrapper = experimentalStyled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
  width: "100%",
}));

const PageWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",

  backgroundColor: theme.palette.secondary.dark, //use for layout
  [theme.breakpoints.up("lg")]: {
    paddingTop: "64px",
  },
  [theme.breakpoints.down("lg")]: {
    paddingTop: "64px",
  },
}));

const FullLayout = ({ children }) => {
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  return (
    <div className={style.main_fullLayout}>
      {router.route !== "/" && router.route !== "/login" && (
        <Header
          sx={{
            paddingLeft: isSidebarOpen && lgUp ? "265px" : "",
            backgroundColor: "#fbfbfb",
          }}
          toggleMobileSidebar={() => setSidebarOpen(!isSidebarOpen)}
          moduleName={"NAME"}
        />
      )}

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setSidebarOpen(!isSidebarOpen)}
      />
      <PageWrapper>
        <Container
          maxWidth={false}
          sx={{
            paddingTop: "20px",
            paddingLeft: isSidebarOpen && lgUp ? "280px!important" : "",
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
          <Footer />
        </Container>
      </PageWrapper>
    </div>
  );
};

export default FullLayout;
