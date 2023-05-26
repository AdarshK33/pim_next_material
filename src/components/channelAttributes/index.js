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
  getChannelListApi,
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
  const [selectedAttribute, setSelectedAttribute] = useState([]);
  const [checkedData, setCheckedData] = useState([]);
  const [unCheckedData, setUnCheckedData] = useState([]);
  const [updatedPimAttributes, setUpdatedPimAttributes] = useState();
  const [finalData, setFinalData] = useState()
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [unselectedAttributes, setUnselectedAttributes] = useState([]);
  const [dropdownValue, setDropdownValue] = useState('')
  const [apiCalled, setApiCalled] = useState(false);

  console.log("dcwencdkewjnckjewnc", checkboxChecked, selectedAttributes, unselectedAttributes)

  const { channelAttribute, channelGet } = useSelector((state) => {
    return state.channelReducer;
  });
  const channelOptions = channelGet?.content?.map((item) => ({
    value: item.channelId,
    name: item.channelName,
  }));

  console.log("channelAttribute from reducer", channelAttribute, updatedPimAttributes, channelOptions);

  const [selectChannelName, setSelectChannelName] = useState('');

  const tableData = [];

  for (let i = 1; i <= 5; i++) {
    tableData.push({
      attributes: "AirEnabled" + i,
    });
  }
  //<<<<<<<<<<<<<<<<<<<<<PAGINATION>>>>>>>>>>>>>>>>>>>>>>

  const recordPerPage = 20;
  const totalRecords = channelAttribute?.totalElements;
  const pageRange = 20;
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  // const currentRecords = tableData;
  const handlePageChange = (value) => {
    // console.log("vvvvvvvvvvvvvvvvvvvvvvv", value);
    setCurrentPage(value);
    dispatch(channelAttributeApiList(selectChannelName, value - 1, 20));
    // dispatch(getChannelAttributes(pageNumber));
  };

  //<<<<<<<<<<<<<<<<<<<<<PAGINATION>>>>>>>>>>>>>>>>>>>>>>

  const pimAttributes = channelAttribute?.content?.pimAttributes;
  const channelAttributes =
    channelAttribute?.content?.channelAttributes[selectChannelName]?.attributes;
  const mappedAttributes =
    channelAttribute?.content?.channelAttributes[selectChannelName]?.mappedAttributes;
  console.log(
    "primAttributes,channelAttributes",
    pimAttributes,
    channelAttributes,
    mappedAttributes,
    updatedPimAttributes
  );
  // const attributes = channelAttributes?.[channel]?.attributes;

  // const handlePaginationChange = (event, value) => {
  //   setCurrentPage(value);
  // };

  console.log("channelAttributessss", channelAttributes);
  const handleChange = (event) => {
    setSelectChannelName(event.target.value);
    // console.log("event.target.value", event.target.value);
    dispatch(channelAttributeApiList(event.target.value, 0, 20));
  };

  useEffect(() => {
    dispatch(channelAttributeApiList(selectChannelName, 0, 20));
    dispatch(getChannelListApi(0, 1000));
  }, []);

  useEffect(() => {
    if (channelOptions && channelOptions.length > 0 && !apiCalled) {
      console.log("kjsafakjnfakka", selectChannelName, channelOptions);
      const firstChannelName = channelOptions[0]?.name;
      // Call your API here using the first channel name
      dispatch(channelAttributeApiList(firstChannelName, 0, 20));
      setSelectChannelName(firstChannelName)
      setApiCalled(true);
    }
  }, [channelOptions]);

  useEffect(() => {
    if (pimAttributes?.length) {
      const array = [];

      pimAttributes.map((item) => {
        const channel = channelAttributes?.find(
          (channel) =>
            mappedAttributes[item.attributeId] === channel.attributeId
        );

        console.log("channel inside useEffect", channel)
        if (channel) {
          array.push({ ...item, isChecked: true, channel: channel, selectedChannelAttributeId: '' });
        } else {
          array.push({ ...item, isChecked: false, channel: {}, selectedChannelAttributeId: '' });
        }
      });
      console.log("arrayyyyyyyyy", array, channelAttribute);

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


  const handleFilterChange = () => {
    setCurrentPage(0);
    dispatch(channelAttributeApiList(channel, 0, 20));
  };

  useEffect(() => {
    if (checkedData?.length) {
      const channelMappingPayload = {
        mappedAttributes: [],
        unMappedAttribute: [],
      };

      checkedData?.forEach((item) => {
        if (item?.isChecked && item?.checkedAttributes?.length) {
          channelMappingPayload.mappedAttributes.push(
            ...item.checkedAttributes
          );
        }

        if (!item?.isChecked && item?.checkedAttributes) {
          channelMappingPayload.unMappedAttribute.push(
            ...item.checkedAttributes
          );
        }
      });
      // const channeMappingPayload = {
      //   mappedAttributes: checkedData?.map(item => item?.isChecked && item?.checkedAttributes?.length ? item?.checkedAttributes : []),
      //   unMappedAttribute: checkedData?.map(item => checkedData?.isChecked === false && item?.checkedAttributes)
      // }
      setFinalData(channelMappingPayload);
    }
  }, [checkedData]);


  const onChangeOfCheckBox = (e, pim) => {
    const isChecked = e.target.checked;
    const selectedOption = dropdownValue
    const filteredData = updatedPimAttributes?.filter(item => item.attributeId === pim)
    setCheckboxChecked(e.target.checked);
    let pims = [...updatedPimAttributes];
    const checkedPim = pims.map((item) =>
      item.attributeId === pim
        ? { ...item, isChecked: e.target.checked }
        : item
    );
    setUpdatedPimAttributes(checkedPim);
    handleAttributeChange(isChecked, pim, selectedOption);

  };

  const handleAttributeChange = (isChecked, pim, selectedOption) => {
    console.log("isChecked, pim, selectedOption", isChecked, pim, selectedOption)

    const attribute = {
      pimAttributesId: pim,
      channelAttributeId: selectedOption,
    };

    if (isChecked && selectedOption) {
      const findIndex = selectedAttributes.findIndex(
        (attr) => attr.pimAttributeId === pim
      );

      if (findIndex !== -1) {
        const updatedAttributes = [...selectedAttributes];
        updatedAttributes[findIndex] = attribute;
        setSelectedAttributes(updatedAttributes);
      } else {
        setSelectedAttributes([...selectedAttributes, attribute]);
      }

      setUnselectedAttributes(
        unselectedAttributes.filter(
          (attr) =>
            attr.pimAttributeId !== attribute.pimAttributeId ||
            attr.channelAttributeId !== attribute.channelAttributeId
        )
      );
    } else if (!isChecked) {
      const filteredDataUnChecked = updatedPimAttributes?.filter(item => item.attributeId === pim)
      console.log("filteredDataUnchecked", filteredDataUnChecked, selectedOption)
      const attributeUnchecked = {
        pimAttributesId: pim,
        channelAttributeId: filteredDataUnChecked?.[0]?.channel?.attributeId,
      };
      console.log("arrrrrrrrrrrr", attribute, dropdownValue)
      const findIndex = unselectedAttributes.findIndex(
        (attr) => attr.pimAttributeId === pim
      );

      if (findIndex !== -1) {
        const updatedAttributes = [...unselectedAttributes];
        updatedAttributes[findIndex] = attributeUnchecked;
        setUnselectedAttributes(updatedAttributes);
      } else {
        setUnselectedAttributes([...unselectedAttributes, attributeUnchecked]);
      }

      setSelectedAttributes((prevSelectedAttributes) =>
        prevSelectedAttributes.filter(
          (attr) =>
            attr.pimAttributeId !== attribute.pimAttributeId ||
            attr.channelAttributeId !== attribute.channelAttributeId
        )
      );
    }
    else if (isChecked) {
      const findIndex = selectedAttributes.findIndex(
        (attr) => attr.pimAttributeId === pim
      );

      if (findIndex !== -1) {
        const updatedAttributes = [...selectedAttributes];
        updatedAttributes[findIndex] = attribute;
        setSelectedAttributes(updatedAttributes);
      } else {
        setSelectedAttributes([...selectedAttributes, attribute]);
      }

      setUnselectedAttributes(
        unselectedAttributes.filter(
          (attr) =>
            attr.pimAttributeId !== attribute.pimAttributeId ||
            attr.channelAttributeId !== attribute.channelAttributeId
        )
      );
    }
  };


  const onSelectdropdown = (e, pim) => {
    const selectedOption = e.target.value;
    console.log("kjsdfakljkjalskjfda", selectedOption)
    const isChecked = checkboxChecked
    setDropdownValue(e.target.value)
    let pims = [...updatedPimAttributes];
    const checkedPim = pims.map((item) =>
      item.attributeId === pim
        ? { ...item, selectedChannelAttributeId: e.target.value }
        : item
    );
    setUpdatedPimAttributes(checkedPim);
    handleAttributeChange(isChecked, pim, selectedOption);
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
      }
    });
    const channelMappingPayload = {
      mappedAttributes: selectedAttributes,
      unMappedAttribute: unselectedAttributes
    };
    dispatch(channelMappingApi(selectChannelName, channelMappingPayload));
    setSelectedAttributes([])
    setUnselectedAttributes([])
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
            <Box style={{ width: "60%", paddingTop: "10px" }}>
              <FormControl style={{ width: "25%" }} variant="standard">
                <InputLabel id="demo-standard-select-label">
                  Select Channel
                </InputLabel>
                <Select
                  labelId="demo-standard-select-label"
                  id="demo-standard-select"
                  value={selectChannelName}
                  label="Select Channel"
                  onChange={handleChange}
                >
                  {channelOptions &&
                    channelOptions?.map((item) => (
                      <MenuItem value={item?.name}>{item?.name}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
            <CardContent sx={{ display: "flex", width: "100%" }}>
              <TableContainer component={Paper} sx={{ width: "100%" }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {/* <TableCell>#</TableCell> */}
                      <TableCell align="right">PIM ATTRIBUTES</TableCell>
                      <TableCell align="right">CHANNEL ATTRIBUTES</TableCell>
                    </TableRow>
                  </TableHead>
                  {updatedPimAttributes?.length &&
                    updatedPimAttributes.slice(0, 10).map((pim) => (
                      <TableBody>
                        <TableRow>
                          <TableCell align="left">{pim.displayName}</TableCell>
                          <TableCell align="right">
                            <Checkbox
                              checked={pim.isChecked}
                              onChange={(e) =>
                                onChangeOfCheckBox(e, pim.attributeId)
                              }
                            />
                            <FormControl
                              style={{ width: "200px" }}
                              // disabled={item.isChecked ? true : false}
                              disabled={pim.isChecked ? true : false}
                            >
                              <InputLabel id="demo-simple-select-label">
                                Select an Attribute
                              </InputLabel>
                              <Select
                                labelId={"demo-simple-select-label"}
                                id="demo-simple-select"
                                label="Select an Attribute"
                                onChange={(e) =>
                                  onSelectdropdown(e, pim.attributeId)
                                }
                                value={pim?.selectedChannelAttributeId ? pim?.selectedChannelAttributeId : pim?.channel?.attributeId || ''}
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
              <TableContainer component={Paper} sx={{ width: "100%" }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {/* <TableCell>#</TableCell> */}
                      <TableCell align="right">PIM ATTRIBUTES</TableCell>
                      <TableCell align="right">CHANNEL ATTRIBUTES</TableCell>
                    </TableRow>
                  </TableHead>
                  {updatedPimAttributes?.length &&
                    updatedPimAttributes.slice(10, 20).map((pim) => (
                      <TableBody>
                        <TableRow>
                          <TableCell align="left">{pim.displayName}</TableCell>
                          <TableCell align="right">
                            <Checkbox
                              checked={pim.isChecked}
                              onChange={(e) =>
                                onChangeOfCheckBox(e, pim.attributeId)
                              }
                            />
                            <FormControl
                              style={{ width: "200px" }}
                              // disabled={item.isChecked ? true : false}
                              disabled={pim.isChecked ? true : false}
                            >
                              <InputLabel id="demo-simple-select-label">
                                Select an Attribute
                              </InputLabel>
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
