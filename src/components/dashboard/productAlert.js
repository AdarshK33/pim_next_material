import React from "react";
import Image from "next/image";
import { Edit2, Bell, Search, Download } from "react-feather";
import styles from "./dashboard.module.css";

import {
  IconButton,
  Input,
  Box,
  Alert,
  Drawer,
  Menu,
  Button,
  List,
  Divider,
  MenuItem,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
// import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";

const ProductAlert = () => {
  const dispatch = useDispatch();
  // const router = useRouter();

  const { dashBoardData } = useSelector((state) => {
    return state.loginReducer;
  });

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    // #F2F0F0
    <Grid container>
      <Card
        sx={{
          p: 0,
          width: "100%",
        }}
      >
        <CardContent
          sx={{
            paddingLeft: "25px",
            paddingRight: "25px",
          }}
        >
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <Box sx={{ display: "flex", flexShrink: 0 }}>
              <Typography sx={{ width: "5%", flexShrink: 0 }}>
                <Bell width="30" height="25" />
              </Typography>
              <Typography
                sx={{ color: "#00000", fontSize: "18px", fontWeight: "600" }}
              >
                Actions Pending & Recent Updates
              </Typography>
            </Box>
            {/* <AccordionDetails>
              <Typography className={styles.product_alert_dropdown_message}>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                feugiat. Aliquam eget maximus est, id dignissim quam.
              </Typography>
            </AccordionDetails> */}
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              {/* <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Users
              </Typography> */}
              <Typography sx={{ color: "text.secondary" }}>
                18 Products are under review and waiting for Approval
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={styles.product_alert_dropdown_message}>
                **No new message
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              {/* <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Advanced settings
              </Typography> */}
              <Typography sx={{ color: "text.secondary" }}>
                2 new products are under active now and waiting to push to
                respective channels
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={styles.product_alert_dropdown_message}>
                **No new message
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              {/* <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Personal data
              </Typography> */}
              <Typography sx={{ color: "text.secondary" }}>
                11 products got removed from 2 channels
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={styles.product_alert_dropdown_message}>
                **No new message
              </Typography>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductAlert;
