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
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import {
  channelAttributeApiList,
  channelMappingApi,
} from "../../../redux/actions/channel";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import PaginationItem from "@mui/material/PaginationItem";
import Pagination from "react-js-pagination";

const ChannelAttributes = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [modifiedPimRecord, setModifiedPimRecord] = useState([]);
  const [channel, setChannel] = useState("Shopify");
  const [checkbox, setCheckbox] = useState([]);
  const [checkedData, setCheckedData] = useState([]);
  const [updatedPimAttributes, setUpdatedPimAttributes] = useState();

  const { channelAttribute } = useSelector((state) => {
    return state.channelReducer;
  });

  console.log("channelAttribute", channelAttribute, updatedPimAttributes);

  const [age, setAge] = useState("");

  const tableData = [];

  for (let i = 1; i <= 5; i++) {
    tableData.push({
      attributes: "AirEnabled" + i,
    });
  }
  //<<<<<<<<<<<<<<<<<<<<<PAGINATION>>>>>>>>>>>>>>>>>>>>>>

  const recordPerPage = 5;
  const totalRecords = channelAttribute?.totalElements;
  const pageRange = 5;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  // const currentRecords = tableData;
  const handlePageChange = (value) => {
    // console.log("vvvvvvvvvvvvvvvvvvvvvvv", value);
    setCurrentPage(value);
    dispatch(channelAttributeApiList("Shopify", value - 1, 10));
    // dispatch(getChannelAttributes(pageNumber));
  };

  //<<<<<<<<<<<<<<<<<<<<<PAGINATION>>>>>>>>>>>>>>>>>>>>>>

  const pimAttributes = channelAttribute?.content?.pimAttributes;
  const channelAttributes =
    channelAttribute?.content?.channelAttributes?.Shopify?.attributes;
  const mappedAttributes =
    channelAttribute?.content?.channelAttributes?.Shopify?.mappedAttributes;
  // console.log(
  //   "primAttributes,channelAttributes",
  //   pimAttributes,
  //   channelAttributes,
  //   mappedAttributes,
  //   updatedPimAttributes
  // );
  // const attributes = channelAttributes?.[channel]?.attributes;

  // const handlePaginationChange = (event, value) => {
  //   setCurrentPage(value);
  // };

  const handleChange = (event) => {
    setAge(event.target.value);
    // console.log("event.target.value", event.target.value);
    // dispatch(channelAttributeApiList(event.target.value, 0, 5));
  };
  // console.log("age", age);

  useEffect(() => {
    dispatch(channelAttributeApiList("Shopify", 0, 10));
  }, []);

  useEffect(() => {
    if (pimAttributes?.length) {
      // console.log(
      //   "pimAttributes",
      //   pimAttributes,
      //   mappedAttributes,
      //   channelAttributes
      // );
      const array = [];

      pimAttributes.map((item) => {
        const channel = channelAttributes.find(
          (channel) =>
            mappedAttributes[item.attributeId] === channel.attributeId
        );

        if (channel) {
          array.push({ ...item, isChecked: true, channel: channel });
        } else {
          array.push({ ...item, isChecked: false, channel: {} });
        }
      });
      console.log("arrayyyyyyyyy", array);

      // pimAttributes.map(item => array.push({ ...item, isChecked: false }))
      // console.log('array in use', array)
      setUpdatedPimAttributes(array);
    }
  }, [pimAttributes, mappedAttributes, channelAttributes]);

  useEffect(() => {
    const updatedRecord = pimAttributes?.map((obj) => {
      const hasChannelAttribute =
        obj.channelAttributes && Object.keys(obj.channelAttributes).length;
      const hasSelectedChannelAttr = obj.channelAttributes === null;
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

  // useEffect(() => {
  //   dispatch(getChannelsApi());
  // }, []);

  const handleFilterChange = () => {
    setCurrentPage(0);
    dispatch(channelAttributeApiList(channel, 0, 10));
  };

  const onChangeOfCheckBox = (e, pim) => {
    // console.log("e,pim", e.target.checked, pim);
    let array = [...checkedData];
    let pims = [...updatedPimAttributes];
    if (e.target.checked) {
      const checkedPim = pims.map((item) =>
        item.attributeId === pim
          ? { ...item, isChecked: e.target.checked }
          : item
      );
      // console.log("checkedPim", checkedPim);
      setUpdatedPimAttributes(checkedPim);
      const checkedAttributes = checkbox.filter(
        (item) => item.pimAttributesId === pim
      );
      // console.log("checkedAttributes", checkedAttributes);
      const checked = { checkedAttributes, isChecked: e.target.checked };
      array.push({ checkedAttributes, isChecked: e.target.checked });
      setCheckedData([
        ...checkedData,
        { checkedAttributes, isChecked: e.target.checked },
      ]);
    } else {
      const checkedPim = pims.map((item) =>
        item.attributeId === pim
          ? { ...item, isChecked: e.target.checked }
          : item
      );
      // console.log("checkedPim", checkedPim);
      setUpdatedPimAttributes(checkedPim);
      const findIndex = checkbox.findIndex(
        (item) => item.pimAttributesId === pim
      );
      const checkedAttributes = checkbox.filter(
        (item) => item.pimAttributesId === pim
      );
      const unChecked = { checkedAttributes, isChecked: e.target.checked };
      // console.log("findIndex", findIndex, unChecked);
      if (findIndex !== -1) {
        const updatedCheckboxData = [...array];
        // console.log("updatedCheckboxData", updatedCheckboxData);
        updatedCheckboxData[findIndex] = unChecked;
        setCheckedData(updatedCheckboxData);
      }
    }
    // const data = modifiedPimRecord.map((arr) => {
    //   if (arr.id === item.id) {
    //     return {
    //       ...arr,
    //       isChecked: !item.isChecked,
    //     };
    //   } else return arr;
    // });
    // setModifiedPimRecord(data);
  };

  // console.log("checkedData", checkedData);

  const onSelectdropdown = (e, pim) => {
    const array = {
      pimAttributesId: pim,
      channelAttributeId: e.target.value,
    };

    const findIndex = checkbox.findIndex(
      (item) => item.pimAttributesId === pim
    );
    // console.log("findIndex", findIndex);
    if (findIndex !== -1) {
      const updatedCheckboxData = [...checkbox];
      updatedCheckboxData[findIndex] = array;
      setCheckbox(updatedCheckboxData);
    } else {
      setCheckbox([...checkbox, array]);
    }

    // const channelAttributes = channelAttribute?.content?.channelAttributes;
    // const attributes = channelAttributes?.[channel]?.attributes;
    // const selectedChannelAttributes = attributes.filter(
    //   (arr) => arr.id === value
    // );

    // const pimAttribute = modifiedPimRecord.map((arr) => {
    //   if (arr.id === item.id) {
    //     return {
    //       ...arr,
    //       selectedChannelAttributes: selectedChannelAttributes[0],
    //     };
    //   } else return arr;
    // });
    // setModifiedPimRecord(pimAttribute);
  };

  // console.log("checkbox", checkbox);

  const onSelectedData = (item) => {
    const selectedData = modifiedPimRecord.filter((arr) => {
      if (arr.id === item.id) {
        return {
          ...arr,
          isChecked: !item.isChecked,
        };
      } else return arr;
    });
  };

  const onSubmit = () => {
    // const mappedAttributes = modifiedPimRecord
    //   .map((arr) => {
    //     if (Object.keys(arr.selectedChannelAttributes).length) {
    //       return {
    //         attributeId: arr.id,
    //         channelAttribute: arr.selectedChannelAttributes,
    //       };
    //     }
    //   })
    //   .filter((arr) => arr);
    // let unMappedAttributes = {};
    // modifiedPimRecord.forEach((arr, i) => {
    //   const hasChannelAttributeMapped = arr?.channelAttributes?.id;
    //   const hasChannelAttributeUpdated =
    //     arr?.selectedChannelAttributes?.id !== arr?.channelAttributes?.id;

    //   if (hasChannelAttributeMapped) {
    //     if (hasChannelAttributeUpdated) {
    //       unMappedAttributes = {
    //         ...unMappedAttributes,
    //         [arr?.id]: arr?.channelAttributes?.id,
    //         // [`additionalProp1${i}`]: arr?.channelAttributes?.id,
    //       };
    //     }
    //   }
    // });

    // const data = {
    //   mappedAttributes,
    //   unMappedAttributes,
    // };
    const array = [];
    const result = checkedData?.map((item) => {
      if (item.isChecked) {
        // console.log("item", item.checkedAttributes);
        array = [...array, item.checkedAttributes.map((item) => item)];
        // console.log("array", array.flat());
        dispatch(channelMappingApi("Shopify", array.flat()));
      }
    });
  };

  const setDefaultOption = (item) => {
    const { selectedChannelAttributes: attr } = item;
    if (attr && Object.keys(attr).length) {
      return {
        value: attr.id,
        label: attr.aliasKeyName,
      };
    }
    return {
      value: "",
      label: "Select an attribute",
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

  useEffect(() => { }, []);

  return (
    <>
      <Grid container>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={12}>
          <Card sx={{ p: 5 }}>
            <Grid container spacing={2} justifyContent="space-between">
              <Typography variant="h2" className={styles.main_title}>
                Channel Attribute Mapping
              </Typography>
              {/* <FormControl style={{ width: "200px" }}>
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
              </FormControl> */}

              <Button
                variant="outlined"
                color="success"
                component="label"
                onClick={() => onSubmit()}
              >
                Submit
                {/* <input hidden accept="image/*" multiple type="file" /> */}
              </Button>
            </Grid>
            <FormControl style={{ width: "200px", marginTop: "2rem" }}>
              <InputLabel id="demo-simple-select-label">Shopify</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Shopify"
                onChange={handleChange}
              >
                <MenuItem value="Shopify">Shopify</MenuItem>
                <MenuItem value="Amazon">Amazon</MenuItem>
                <MenuItem value="Myntra">Myntra</MenuItem>
              </Select>
            </FormControl>
            <CardContent>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {/* <TableCell>#</TableCell> */}
                      <TableCell align="right">PIM ATTRIBUTES</TableCell>
                      <TableCell align="right">CHANNEL ATTRIBUTES</TableCell>
                    </TableRow>
                  </TableHead>
                  {updatedPimAttributes?.length &&
                    updatedPimAttributes.map((pim) => (
                      <TableBody>
                        <TableRow>
                          <TableCell align="left">{pim.displayName}</TableCell>
                          <TableCell align="right">
                            <FormControl
                              style={{ width: "200px" }}
                              // disabled={item.isChecked ? true : false}
                              disabled={pim.isChecked ? true : false}
                            >
                              <InputLabel id="demo-simple-select-label">
                                Select an Attribute
                              </InputLabel>
                              {console.log(
                                "pim?.channel",
                                pim?.channel.attributeId
                              )}
                              <Select
                                labelId={"demo-simple-select-label"}
                                id="demo-simple-select"
                                label="Select an Attribute"
                                onChange={(e) =>
                                  onSelectdropdown(e, pim.attributeId)
                                }
                                value={
                                  pim?.channel ? pim.channel.attributeId : ""
                                }
                              >
                                {channelAttributes?.map((channel) => (
                                  <MenuItem
                                    value={channel?.attributeId}
                                    key={channel?.attributeId}
                                  >
                                    {channel?.displayName}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                            <Checkbox
                              checked={pim.isChecked}
                              onChange={(e) =>
                                onChangeOfCheckBox(e, pim.attributeId)
                              }
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    ))}
                  {/* {modifiedPimRecord?.length ?
                   (
                    modifiedPimRecord.map((item, i) => {
                      return (
                        <TableBody>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="right">
                              {item?.aliasKeyName}
                            </TableCell>
                            <TableCell align="right">
                              <FormControl style={{ width: "200px" }} disabled={item.isChecked ? true : false}>
                                <InputLabel id="demo-simple-select-label">
                                  Select an Attribute
                                </InputLabel>
                                <Select
                                  labelId={"demo-simple-select-label"}
                                  id="demo-simple-select"
                                  label="Select an Attribute"
                                  onChange={(e) => onSelectdropdown(e.target.value, item)}
                                  value={setDefaultOption(item).value}
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
                  )
                    : (
                      <TableRow>
                        <TableCell colSpan={12}> No Record Found</TableCell>
                      </TableRow>
                    )} */}
                </Table>
              </TableContainer>
            </CardContent>
            {/* <Stack> */}
            <div className={styles.category_pagination}>
              {/* <Pagination 
                  // count={Math.ceil(totalRecords / recordPerPage)}
                  count={200}
                  page={currentPage}
                  showFirstButton
                  showLastButton
                  onChange={handlePageChange}
                  // NOT WORKING
                /> */}

              <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={currentPage}
                itemsCountPerPage={recordPerPage}
                totalItemsCount={totalRecords}
                pageRangeDisplayed={pageRange}
                firstPageText="First"
                lastPageText="Last"
                onChange={handlePageChange}
              />
            </div>
            {/* </Stack> */}
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ChannelAttributes;
