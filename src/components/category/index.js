import React, {
  Fragment,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import edit from "../../../assets/icons/edit.svg";
import Image from "next/image";

import styles from "./category.module.css";

import { Button, Card, CardContent, Typography } from "@mui/material";

import {
  Grid,
  FormControl,
  FormLabel,
  InputLabel,
  Input,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesApi } from "../../../redux/actions/catalogServiceNew";

const Category = () => {
  const dispatch = useDispatch();

  const { catagories } = useSelector((state) => state.catalogQueryReducer);

  useEffect(() => {
    dispatch(getCategoriesApi());
  }, []);

  const data = [
    {
      id: "root-1",
      name: "Parent 1",
      children: [
        {
          id: "1",
          name: "Child - 1",
        },
        {
          id: "3",
          name: "Child - 3",
          children: [
            {
              id: "4",
              name: "Child - 4",
            },
          ],
        },
      ],
    },
    {
      id: "root-2",
      name: "Parent 2",
      children: [
        {
          id: "5",
          name: "Child - 5",
        },
        {
          id: "6",
          name: "Child - 6",
          children: [
            {
              id: "7",
              name: "Child - 7",
            },
          ],
        },
      ],
    },
  ];
  const renderTree = (nodes) => {
    return (
      <>
        {nodes?.length > 0 &&
          nodes.map((node) => (
            <TreeItem
              key={node.id}
              nodeId={node.id}
              label={node.name}
              style={{ margin: 10 }}
            >
              <ChevronRightIcon />
              {Array.isArray(node.children) ? renderTree(node.children) : null}
            </TreeItem>
          ))}
      </>
    );
  };
  return (
    <div className={styles.catogory_container}>
      <Card sx={{ p: 5 }}>
        <CardContent>
          <Grid spacing={1} justifyContent="space-between">
            <Typography variant="h8" className={styles.main_title}>
              Category
            </Typography>
          </Grid>

          <Grid spacing={2} className={styles.category_menu}>
            <Grid md={3}>
              <TreeView
                aria-label="rich object"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpanded={["root-1", "root-2"]}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{
                  height: 400,
                  flexGrow: 1,
                  maxWidth: 400,
                  overflowY: "auto",
                }}
              >
                {renderTree(catagories)}
              </TreeView>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default Category;
