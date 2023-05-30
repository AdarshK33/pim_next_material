import React, {
  useState,
  useEffect,
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
import Pagination from "react-js-pagination";

const ChannelAttributes = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [modifiedPimRecord, setModifiedPimRecord] = useState([]);
  const [channel, setChannel] = useState("Shopify");
  const [checkedData, setCheckedData] = useState([]);
  const [updatedPimAttributes, setUpdatedPimAttributes] = useState();
  const [finalData, setFinalData] = useState()
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [unselectedAttributes, setUnselectedAttributes] = useState([]);
  const [dropdownValue, setDropdownValue] = useState('')
  const [apiCalled, setApiCalled] = useState(false);


  const { channelAttribute, channelGet } = useSelector((state) => {
    return state.channelReducer;
  });
  const { authorities } = useSelector(state => state.loginReducer)

  const channelOptions = channelGet?.content?.map((item) => ({
    value: item.channelId,
    name: item.channelName,
  }));


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
  const handlePageChange = (value) => {
    setCurrentPage(value);
    dispatch(channelAttributeApiList(selectChannelName, value - 1, 20));
  };

  //<<<<<<<<<<<<<<<<<<<<<PAGINATION>>>>>>>>>>>>>>>>>>>>>>

  const pimAttributes = channelAttribute?.content?.pimAttributes;
  const channelAttributes =
    channelAttribute?.content?.channelAttributes[selectChannelName]?.attributes;
  const mappedAttributes =
    channelAttribute?.content?.channelAttributes[selectChannelName]?.mappedAttributes;

  const handleChange = (event) => {
    setSelectChannelName(event.target.value);
    dispatch(channelAttributeApiList(event.target.value, 0, 20));
  };

  useEffect(() => {
    dispatch(channelAttributeApiList(selectChannelName, 0, 20));
    dispatch(getChannelListApi(0, 1000));
  }, []);

  useEffect(() => {
    if (channelOptions && channelOptions.length > 0 && !apiCalled) {
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

        if (channel) {
          array.push({ ...item, isChecked: true, channel: channel, selectedChannelAttributeId: '' });
        } else {
          array.push({ ...item, isChecked: false, channel: {}, selectedChannelAttributeId: '' });
        }
      });
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
      const attributeUnchecked = {
        pimAttributesId: pim,
        channelAttributeId: filteredDataUnChecked?.[0]?.channel?.attributeId,
      };
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

  const onSubmit = () => {
    const array = [];
    const result = checkedData?.map((item) => {
      if (item.isChecked) {
        array = [...array, item.checkedAttributes.map((item) => item)];
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

  const getChannelAttributesOptions = () => {
    const channelAttributes = channelAttribute?.content?.channelAttributes;
    const attributes = channelAttributes?.[channel]?.attributes;

    return attributes?.map((attr) => ({
      value: attr.id,
      label: attr.aliasKeyName,
    }));
  };

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

              <Button
                variant="outlined"
                color="success"
                component="label"
                onClick={() => onSubmit()}
                disabled={authorities?.ATTRIBUTE_MAPPING == 'r' ? true : false}
              >
                Submit
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
                </Table>
              </TableContainer>
              <TableContainer component={Paper} sx={{ width: "100%" }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
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
                </Table>
              </TableContainer>
            </CardContent>
            <div className={styles.category_pagination}>

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
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ChannelAttributes;
