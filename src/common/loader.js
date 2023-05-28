import React, {
  Fragment,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useDispatch, useSelector } from "react-redux";

function CustomLoader() {
  const dispatch = useDispatch();

  const {
    catalogQueryReducer,
    channelReducer,
    catalogServiceNewReducer,
    loginReducer,
  } = useSelector((state) => {
    return state;
  });

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (
      catalogQueryReducer?.loading == true ||
      channelReducer?.loading == true ||
      catalogServiceNewReducer?.loading == true ||
      loginReducer?.loading == true
    ) {
      console.log("hello  if loader called");
      setLoader(true);
    } else {
      console.log("hello  else loader called");

      setLoader(false);
    }
  }, [catalogQueryReducer, channelReducer, catalogServiceNewReducer]);

  return (
    <>
      {loader == true && (
        // <Card sx={{ minHeight: "calc(100vh - 170px)" }}>
        //   <CardContent>
        <Box className="loader">
          <Box className="circle"></Box>
          <Box className="circle"></Box>
          <Box className="circle"></Box>
        </Box>
        //   </CardContent>
        // </Card>
      )}
    </>
  );
}

export default React.memo(CustomLoader);

{
  /* <Table style={{ margin: "10px 0" }}>
 
 
    {loader === true && && currentRecords !== null && currentRecords.length > 0 ? (
    
        <TableRow
          key={row.name}
          sx={{
            "&:last-child td, &:last-child th": {
              border: 0,
            },
          }}
        >
          <TableCell>
            <Box className="loader">
              <Box className="circle"></Box>
              <Box className="circle"></Box>
              <Box className="circle"></Box>
            </Box>
          </TableCell>
        </TableRow>
       
      ):()}
    
 
</Table>; */
}
