import React, { useState, useEffect } from "react";
import styles from "./role.module.css";
import {
  Grid,
  Button,
  Card,
  CardContent,
  Typography,
  FormControl,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import { getRolePrivilegeApi } from "../../../redux/actions/login";
import { useDispatch, useSelector } from "react-redux";
import AddForm from "./AddForm";
import CustomModal from "../../common/customModal";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const Role = () => {
  const { loginReducer } = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [showUserAddForm, setShowUserAddForm] = useState(false);
  const [expanded, setExpanded] = React.useState(true);

  const StyledContainer = styled("div")({
    display: "flex",
    flexWrap: "wrap",
  });
  const AllPrivileges = styled("div")(({ focused }) => ({
    padding: "8px",
    margin: "7px",
    border: "1px solid #ccc",
    cursor: "pointer",
    borderRadius: "5px",
    ...(focused && { borderColor: "#419794" }),
  }));

  useEffect(() => {
    dispatch(getRolePrivilegeApi());
  }, []);

  const handlePrivileges = (index) => {
    setFocusedIndex(index);
  };

  const sectionAccordionSetUpRender = () => {
    if (!loginReducer.rolePrivilege) {
      return;
    }
    const obj = loginReducer.rolePrivilege;
    return Object.entries(obj).map(([key, value]) => {
      // console.log("hello 1", key);
      if (key) {
        return AccordionSetUp(key, value);
      }
    });
  };

  const AccordionSetUp = (key, value) => {
    return (
      <>
        <Accordion expanded={expanded}>
          <AccordionSummary id="panel2a-header">
            <Typography className={styles.role_name_heading}>
              NAME OF ROLE :
            </Typography>
            {"  "}&nbsp;
            {key}
          </AccordionSummary>

          <AccordionDetails>
            <Typography className={styles.role_name_heading}>
              PRIVILEGES
            </Typography>
            <StyledContainer>
              {Object.values(loginReducer.rolePrivilege[key]).map(
                (item, index) => (
                  <AllPrivileges
                    key={index}
                    focused={index === focusedIndex}
                    onClick={() => handlePrivileges(index)}
                    onFocus={() => handlePrivileges(index)}
                    onBlur={() => setFocusedIndex(null)}
                    tabIndex={index}
                  >
                    {item}
                  </AllPrivileges>
                )
              )}
            </StyledContainer>
          </AccordionDetails>
        </Accordion>
      </>
    );
  };

  return (
    <>
      <Grid container spacing={0}>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={12}>
          <Card sx={{ p: 5 }}>
            <Grid container spacing={2} justifyContent="space-between">
              <Typography variant="h7" className={styles.main_title}>
                Roles
              </Typography>
              {/* <Button
                variant="outlined"
                color="success"
                component="label"
                onClick={() => setShowUserAddForm(true)}
              >
                Add New
              </Button> */}
              {/* <CustomModal
                openModal={showUserAddForm}
                closeModal={() => setShowUserAddForm(!showUserAddForm)}
                body={
                  <AddForm
                    classModal={() => setShowUserAddForm(!showUserAddForm)}
                  />
                }
              /> */}
            </Grid>
            <CardContent>{sectionAccordionSetUpRender()}</CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(Role);

