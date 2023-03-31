import { Row, Col, Form, Button } from "react-bootstrap";

import React, {
  Fragment,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { ToastContainer, toast } from "react-toastify";
import FormikControl from "../../public/formik/formikControl";
import SubmitButton from "../../public/formik/submitButton";
// import { createChannelApi } from "../../utility/apiUtility";
import * as Yup from "yup";
import { updateChannelApi } from "../../../redux/actions/channel";
import { useDispatch, useSelector } from "react-redux";

import { getCountryApi ,getBrandDropdownApi,getMarketplaceApi} from "../../../redux/actions/onboardQuery";

import styles from "./channel.module.css"
function UpdateChannelForm({ classModal, onSuccess, notifySucess }) {
  const [itemData, setItemData] = useState();
  const [brandSelect, setBrandDropdown] = useState();
  const [marketplaceSelect, setMarketplaceData] = useState();
  const [countrySelect, setCountryData] = useState();
  const [countryName, setCountryName] = useState();
  const [brandName, setBrandName] = useState();
  const [marketplaceName, setMarketplaceName] = useState();

  const [countryNameError, setCountryNameError] = useState(false);
  const [brandNameError, setBrandNameError] = useState(false);
  const [marketplaceNameError , setMarketplaceNameError] = useState(false);
  const [channelNameError, setChannelNameError] = useState(false);
  const [channelDescriptionError, setChannelDescriptionError] = useState(false);
  const [state, setState] = useState({
    channelName: "",
    channelDescription: ""
  });



  const toastId = React.useRef(null);
  const dispatch = useDispatch();

  


  const { countryData,brandDropdownGet,MarketplaceData,channelByIdData,loading } = useSelector(state => {
    // console.log("hello",state)
		return state.onBoardQueryReducer;
	});


  // /.log("channelByIdData",channelByIdData.country.country)
  // useEffect(() => {
  //   console.log("itemData",itemData);
  //   if(itemData){
  //   dispatch(createChannelApi(itemData));
  //   }
  //   // dispatch(getChannelApi()); 
  // }, [itemData]);

  const notify = (type) => {
    if (!toast.isActive(toastId.current)) {
      if (type !== "err") {
        toastId.current = toast.success("Channel added Successfully !!!");
      } else {
        toastId.current = toast.error("Channel fields cannot be empty !!!");
      }
    }
  };


  useEffect(() => {
    setState({
      ...state,
      channelName: channelByIdData?.channel,
      channelDescription: channelByIdData.description
    });
    if ( countryData &&brandDropdownGet && MarketplaceData && channelByIdData  ) {
     
      // console.log("hello sss",state);
      countryData?.map((item, i) => {
        if (item.label === channelByIdData?.country?.country) {
          setCountryName(item.label);
        }
      });
      brandDropdownGet?.map((item, i) => {
        if (item.label === channelByIdData?.brand?.brandName) {
          setBrandName(item.label);
        }
      MarketplaceData?.map((item, i) => {
        if (item.label === channelByIdData?.marketPlace?.marketPlace) {
          setMarketplaceName(item.label);
          }
        });
      });

    } else {
      setCountryName("");
      setBrandName("");
      setMarketplaceName("");
    }

    
  },[channelByIdData])

 
  const countryHandler = (e) => {
    // console.log("hello called ccccc",e.target.value)
    setCountryName(e.target.value);
  };
  const brandHandler = (e) => {
    // console.log("hello called bbbb",e.target.value)
    setBrandName(e.target.value);
  };
  // const  marketplaceHandler = (e) => {
  //   // console.log("hello called mmmmm",e.target.value)
  //   setMarketplaceName(e.target.value);
  // };

  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    // console.log("hello input",state);
  };

  const channelNameValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (
      state.channelName !== "" &&
      state.channelName !== null &&
      state.channelName !== undefined
    ) {
      setChannelNameError(false);
      // console.log("channelNameSuccess");
      return true;
    } else {
      setChannelNameError(true);
      // console.log("channelNameError");
      return false;
    }
  };
  const countryValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (
      countryName !== "" &&
      countryName !== null &&
      countryName !== undefined
    ) {
      setCountryNameError(false);
      // console.log("countryNameSuccess");
      return true;
    } else {
      setCountryNameErrorr(true);
      // console.log("countryNameError");
      return false;
    }
  };
  const brandValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (
      brandName !== "" &&
      brandName !== null &&
      brandName !== undefined
    ) {
      setBrandNameError(false);
      // console.log("setBrandNameSuccess");
      return true;
    } else {
      setBrandNameError(true);
      // console.log("setBrandNameError");
      return false;
    }
  };
  // const marketValidations = () => {
  //   const nameValid = /^[a-zA-Z\b]+$/;
  //   if (
  //     marketplaceName !== "" &&
  //     marketplaceName !== null &&
  //     marketplaceName !== undefined
  //   ) {
  //     setMarketplaceNameError(false);
  //     // console.log("marketplaceName Success");
  //     return true;
  //   } else {
  //     setMarketplaceNameError(true);
  //     // console.log("marketplaceName Error");
  //     return false;
  //   }
  // };


  const channelDescriptionValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (
      state.channelDescription !== "" &&
      state.channelDescription !== null &&
      state.channelDescription !== undefined
    ) {
      setChannelDescriptionError(false);
      // console.log("channelNameSuccess");
      return true;
    } else {
      setChannelDescriptionError(true);
      // console.log("channelNameError");
      return false;
    }
  };

  const checkValidations = () => {
        // console.log("isChecked");
        if (
          (channelNameValidations() == true)  &
          (channelDescriptionValidations() == true)  &
          (countryValidations() == true)  &
          (brandValidations() == true) 
          //  &
          // (marketValidations() == true)  

        ) {
          return true;
        } else {
          return false;
        }
 
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const value = checkValidations();

    if (value === true) {
      // console.log("Inside the channel submit");
      // setSaveclick(true);

      const UpdateInfo = {
        // updateData: {
          channelId:channelByIdData?.id,
          channelName: state.channelName,
          channelDescription : state.channelDescription,
          countryName:countryName,
          brandName : brandName,
          // marketplaceName: marketplaceName
        // },
    }
    // console.log("hello update info", UpdateInfo);
    //apis(UpdateInfo)
   
    dispatch( updateChannelApi(UpdateInfo));
    
  };
}





  return (
<>
    <div className="bg-white p-3 br3">
    {loading ? <p>Loading...</p>:null}
    {!loading  && channelByIdData?.channel  ?( 
      <>
      <div className={styles.update_main}>

         <Form>
         <Row style={{ marginBottom: ".2rem" }}>
         <div className="col-sm-12 ">
              <Form.Group>
                <Form.Label>
                  <span className=".font12">Channel Name</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="channelName"
                  value={state.channelName}
                  onChange={changeHandler}
                  required
                  maxLength="250"
                  style={channelNameError ? { borderColor: "red" } : {}}
                  placeholder="Channel"
                  // disabled={disabled}
                />
                {channelNameError ? (
                  <p style={{ color: "red" }}> ** Please enter channel Name </p>
                ) :state.channelName && state.channelName.length === 100 ? (
                  <p style={{ color: "red" }}> Max 100 Characters</p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </div>
            </Row>
        <Row style={{ marginBottom: ".2rem" }}>
        <div className="col-sm-12">
          <Form.Group>
            <Form.Label>
              <span> Country </span>
            </Form.Label>
            <Form.Control
              as="select"
              name="countryId"
              value={countryName}
              onChange={(e) => countryHandler(e)}
              required
              style={countryNameError ? { borderColor: "red" } : {}}
              // disabled={disabled}
            >
              <option value="">Select Country</option>
              {
                countryData &&
                countryData?.map((item, i) => {
                  return (
                    <option key={item.value}>{item.label}</option>
                  );
                })
                }
            </Form.Control>
            {countryNameError ? (
                  <p style={{ color: "red" }}>** Please choose country</p>
                ) : (
                  <p></p>
                )}
           
          </Form.Group>
        </div>
        </Row>
        <Row style={{ marginBottom: ".2rem" }}>
        <div className="col-sm-12">
          <Form.Group>
            <Form.Label>
              <span> Brand </span>
            </Form.Label>
            <Form.Control
              as="select"
              name="brandNameId"
              value={brandName}
              onChange={(e) => brandHandler(e)}
              required
              style={brandNameError ? { borderColor: "red" } : {}}
              // disabled={disabled}
            >
              <option value="">Select Brand</option>
              {
                brandDropdownGet &&
                brandDropdownGet.map((item, i) => {
                  return (
                    <option key={item.value}>{item.label}</option>
                  );
                })
                }
            </Form.Control>
            {brandNameError ? (
                  <p style={{ color: "red" }}>** Please choose brand</p>
                ) : (
                  <p></p>
                )}
          </Form.Group>
        </div>
        </Row>
        {/* <Row style={{ marginBottom: ".2rem" }}>
        <div className="col-sm-12">
          <Form.Group>
            <Form.Label>
              <span> Market place </span>
            </Form.Label>
            <Form.Control
              as="select"
              name="marketplaceId"
              value={marketplaceName}
              onChange={(e) => marketplaceHandler(e)}
              required
              style={marketplaceNameError ? { borderColor: "red" } : {}}
              // disabled={disabled}
            >
              <option value="">Select Marketplace</option>
              {
                MarketplaceData &&
                MarketplaceData.map((item, i) => {
                  return (
                    <option key={item.value}>{item.label}</option>
                  );
                })
                }
            </Form.Control>
            {marketplaceNameError ? (
                  <p style={{ color: "red" }}>** Please choose market place.</p>
                ) : (
                  <p></p>
                )}
          </Form.Group>
        </div>
        </Row> */}
        <Row style={{ marginBottom: ".2rem" }}>
         <div className="col-sm-12">
              <Form.Group>
                <Form.Label>
                  <span>Channel Description</span>
                </Form.Label>
                <Form.Control
                  as="textarea" rows={3}
                  name="channelDescription"
                  value={state.channelDescription}
                  onChange={changeHandler}
                  required
                  maxLength="250"
                  style={channelDescriptionError ? { borderColor: "red" } : {}}
                  placeholder="Description"
                  // disabled={disabled}
                />
                {channelDescriptionError ? (
                  <p style={{ color: "red" }}>** Please enter channel description</p>
                ) :state.channelDescription && state.channelDescription.length === 250 ? (
                  <p style={{ color: "red" }}> Max 250 Characters</p>
                ) : (
                  <p></p>
                )}
              </Form.Group>
            </div>
            </Row>
            <div className="col-12 text-center pt-5">
                  <SubmitButton
                    onClick={classModal}
                    type="button"
                    name="CANCEL"
                    className="btn btn-sm save_btn_secondary py-1 px-5 br3"
                  />
                  <SubmitButton
                   onClick={submitHandler}
                    type="submit"
                    name="UPDATE"
                    className="btn btn-sm save_btn_secondary py-1 px-5 br3 mx-2"
                  />
                </div>
         </Form>
         </div>
      </>
   
   ):null}
   
  </div>
  <ToastContainer />
</>

  );
}

export default React.memo(UpdateChannelForm);
