import React, {
  Fragment,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import styles from "./channelAttributes.module.css";
import {
  Grid,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import { channelAttributeApiList } from "../../../redux/actions/channel";
import { useDispatch, useSelector } from "react-redux";

const ChannelAttributes = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [modifiedPimRecord, setModifiedPimRecord] = useState([]);
  const [channel, setChannel] = useState("Shopify");
  console.log("modifiedPimRecord", modifiedPimRecord);

  const { channelAttribute } = useSelector((state) => {
    return state.channelReducer;
  });

  console.log("channelAttribute", channelAttribute);

  const [age, setAge] = useState("");

  const tableData = [];

  for (let i = 1; i <= 5; i++) {
    tableData.push({
      attributes: "AirEnabled" + i,
    });
  }

  const recordPerPage = 5;
  const totalRecords = channelAttribute?.totalElements;
  const pageRange = 5;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  // const currentRecords = tableData;
  const pimAttributes = channelAttribute?.content?.pimAttributes;
  const channelAttributes = channelAttribute?.content?.channelAttributes;
  // const attributes = channelAttributes?.[channel]?.attributes;

  // const handlePaginationChange = (event, value) => {
  //   setCurrentPage(value);
  // };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    dispatch(channelAttributeApiList("Shopify", 0, 5));
  }, []);

  useEffect(() => {
    const updatedRecord = pimAttributes?.map((obj) => {
      const hasChannelAttribute =
        obj.channelAttributes && Object.keys(obj.channelAttributes).length;
      console.log("obj.chaannelAttributes", obj.channelAttributes);
      const hasSelectedChannelAttr = obj.channelAttributes === null;
      console.log("hasSelectedChannelAttr", hasSelectedChannelAttr);
      return {
        ...obj,
        isChecked: hasChannelAttribute,
        selectedChannelAttributes: hasSelectedChannelAttr
          ? {}
          : obj.channelAttributes,
      };
    });
    setModifiedPimRecord(updatedRecord);
  }, [pimAttributes]);

  const handlePageChange = (value) => {
    setCurrentPage(value);
    console.log("1st api called");
    dispatch(channelAttributeApiList("Shopify", value - 1, 5));
    // dispatch(getChannelAttributes(pageNumber));
  };

  // useEffect(() => {
  //   dispatch(getChannelsApi());
  // }, []);

  const handleFilterChange = () => {
    setCurrentPage(0);
    console.log("api called in filter");
    dispatch(channelAttributeApiList(channel, 0, 5));
  };

  const onChangeOfCheckBox = (e, item) => {
    const data = modifiedPimRecord.map((arr) => {
      if (arr.id === item.id) {
        return {
          ...arr,
          isChecked: !item.isChecked,
        };
      } else return arr;
    });
    setModifiedPimRecord(data);
  };

  const onSelectdropdown = (value, item) => {
    const selectedChannelAttributes = attributes.filter(
      (arr) => arr.id === value
    )[0];
    console.log("selectedChannelAttributes", selectedChannelAttributes);
    const pimAttribute = modifiedPimRecord.map((arr) => {
      if (arr.id === item.id) {
        return {
          ...arr,
          selectedChannelAttributes,
        };
      } else return arr;
    });
    console.log("pimAttribute", pimAttribute);
    setModifiedPimRecord(pimAttribute);
  };

  const onSelectedData = (item) => {
    const selectedData = modifiedPimRecord.filter((arr) => {
      if (arr.id === item.id) {
        return {
          ...arr,
          isChecked: !item.isChecked,
        };
      } else return arr;
    });
    console.log("selectedData", selectedData);
  };

  const onSubmit = () => {
    const mappedAttributes = modifiedPimRecord
      .map((arr) => {
        if (Object.keys(arr.selectedChannelAttributes).length) {
          return {
            attributeId: arr.id,
            channelAttribute: arr.selectedChannelAttributes,
          };
        }
      })
      .filter((arr) => arr);
    let unMappedAttributes = {};
    modifiedPimRecord.forEach((arr) => {
      const hasChannelAttributeMapped = arr?.channelAttributes?.id;
      const hasChannelAttributeUpdated =
        arr?.selectedChannelAttributes?.id !== arr?.channelAttributes?.id;

      if (hasChannelAttributeMapped) {
        if (hasChannelAttributeUpdated) {
          unMappedAttributes = {
            ...unMappedAttributes,
            [arr?.id]: arr?.channelAttributes?.id,
          };
        }
      }
    });

    const data = {
      mappedAttributes,
      unMappedAttributes,
    };
    console.log("unmapped data", data);
    // dispatch(channelMappingApi(data));
  };

  const setDefaultOption = (item) => {
    const { selectedChannelAttributes: attr } = item;
    if (attr && Object.keys(attr).length)
      return {
        value: attr.id,
        label: attr.aliasKeyName,
      };
  };

  const getChannelAttributesOptions = () => {
    const channelAttributes = channelAttribute?.content?.channelAttributes;
    const attributes = channelAttributes?.[channel]?.attributes;

    return attributes?.map((attr) => ({
      value: attr.id,
      label: attr.aliasKeyName,
    }));
  };

  const options = getChannelAttributesOptions();

  return (
    <>
      <Grid container>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={12}>
          <Card sx={{ p: 5 }}>
            <Grid spacing={2} justifyContent="space-between">
              <Typography variant="h2" className={styles.main_title}>
                Channel Attribute Mapping
              </Typography>
              <FormControl style={{ width: "200px" }}>
                <InputLabel id="demo-simple-select-label">Shopify</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Shopify"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Shopify</MenuItem>
                  <MenuItem value={20}>Amazon</MenuItem>
                  <MenuItem value={30}>Myntra</MenuItem>
                </Select>
              </FormControl>

              <Button variant="outlined" color="success" component="label">
                Submit
                {/* <input hidden accept="image/*" multiple type="file" /> */}
              </Button>
            </Grid>
            <CardContent>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {/* <TableCell>#</TableCell> */}
                      <TableCell align="right">ATTRIBUTE</TableCell>
                      <TableCell align="right">SHOPIFY</TableCell>
                    </TableRow>
                  </TableHead>
                  {modifiedPimRecord?.length ? (
                    modifiedPimRecord.map((item, i) => {
                      return (
                        <TableBody>
                          <TableRow
                            // key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            {/* <TableCell component="th" scope="row">
                              {i + 1 + indexOfFirstRecord}
                            </TableCell> */}
                            <TableCell align="right">
                              {item?.aliasKeyName}
                            </TableCell>
                            <TableCell align="right">
                              <FormControl style={{ width: "200px" }}>
                                <InputLabel id="demo-simple-select-label">
                                  Select an Attribute
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  label="Select an Attribute"
                                  onChange={(e) => onSelectdropdown(e, item)}
                                  value={setDefaultOption(item)}
                                  // disabled={item?.isChecked}
                                >
                                  {options?.map((option) => (
                                    <MenuItem value={option?.value}>
                                      {option?.label}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <Checkbox
                                checked={item.isChecked}
                                onChange={(e) => onChangeOfCheckBox(e, item)}
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={12}> No Record Found</TableCell>
                    </TableRow>
                  )}
                </Table>
              </TableContainer>
              <Stack spacing={2}>
                <div className={styles.category_pagination}>
                  <Pagination
                    count={Math.ceil(totalRecords / recordPerPage)}
                    page={currentPage}
                    showFirstButton
                    showLastButton
                    onChange={handlePageChange}
                  />
                </div>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ChannelAttributes;
