import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Grid,
  FormControl,
  FormLabel,
  InputLabel,
  Input,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import {
  statusChangedApis,
} from "../../../../redux/actions/catalogServiceNew";
import styles from "./activeProducts.module.css";

import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";

const ProductStatusForm = ({
  classModal,
  formation,
  pimModelCode,
  statusApiCalled,
}) => {
  const dispatch = useDispatch();

  const router = useRouter();
  // console.log("rrrrrrrrrrrrrrrr", pimModelCode);

  const submitHandlerDraft = (e) => {
    e.preventDefault();
    let infoData = {
      pimModelCode: pimModelCode,
      status: "DRAFT",
    };
    dispatch(statusChangedApis(infoData));
    classModal();
    statusApiCalled()
  };

  const submitHandlerReadyForReview = (e) => {
    e.preventDefault();
    let infoData = {
      pimModelCode: pimModelCode,
      status: "READY_FOR_REVIEW",
    };
    dispatch(statusChangedApis(infoData));
    classModal();

    statusApiCalled()
  };



  return (
    <>
      {formation < 100 ? (
        <>
          <Alert severity="info">
            Do you want to move the product to its previous status?
          </Alert>
          <Grid
            container
            justifyContent="space-evenly"
            // className={styles.addButton}
            className={styles.alert_button_active_product}
          >
            <Button onClick={classModal} variant="outlined" color="secondary">
              No
            </Button>

            <Button

              variant="outlined"
              onClick={submitHandlerDraft}
              type="submit"
              // variant="contained"
              color="success"
            >
              Yes
            </Button>
          </Grid>
        </>

      ) : (<>
        <Alert severity="warning">
          Do you want to move the product to its previous status?
        </Alert>
        <Grid
          container
          justifyContent="space-evenly"
          // className={styles.addButton}
          className={styles.alert_button_active_product}
        >
          <Button onClick={classModal} variant="outlined" color="secondary">
            No
          </Button>

          <Button

            variant="outlined"
            onClick={submitHandlerReadyForReview}
            type="submit"
            // variant="contained"
            color="success"
          >
            Yes
          </Button>
        </Grid>
      </>
      )
      }


      <ToastContainer />
    </>
  );
};

export default React.memo(ProductStatusForm);
