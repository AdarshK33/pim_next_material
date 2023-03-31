import { Form, Formik } from "formik";
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
import { createChannelApi,getChannelApi } from "../../../redux/actions/channel";
import { useDispatch, useSelector } from "react-redux";

import { getCountryApi ,getBrandDropdownApi,getMarketplaceApi} from "../../../redux/actions/onboardQuery";

import styles from "./channel.module.css"
function ChannelForm({ classModal, onSuccess, notifySucess }) {
  const [itemData, setItemData] = useState();
  const [brandSelect, setBrandDropdown] = useState();
  // const [marketplaceSelect, setMarketplaceData] = useState();
  const [countrySelect, setCountryData] = useState();

// console.log("hello marketplaceSelect ",marketplaceSelect)
  
  const toastId = React.useRef(null);
  const dispatch = useDispatch();


  
  // useEffect(() => {
  //   dispatch(getCountryApi());
  //   dispatch(getBrandDropdownApi());
  //   dispatch(getMarketplaceApi());
    
  // }, []);

  const { countryData,brandDropdownGet,MarketplaceData } = useSelector(state => {
    // console.log("hello",state)
		return state.onBoardQueryReducer;
	});

  useEffect(() => {
    // console.log("itemData",itemData);
    if(itemData){
    dispatch(createChannelApi(itemData));
    }
    // dispatch(getChannelApi()); 
  }, [itemData]);

  const notify = (type) => {
    if (!toast.isActive(toastId.current)) {
      if (type !== "err") {
        toastId.current = toast.success("Channel added Successfully !!!");
      } else {
        toastId.current = toast.error("Channel fields cannot be empty !!!");
      }
    }
  };
  const initialValues = {
    channelName: "",
    brandId:"",
    // marketPlaceId: "",
    countryId: "",
    description: ""
  };

  const onSubmit = async (values, formik) => {
    // console.log("values",values);
    let channelName = {
      name: values.channelName.trim(),
    };
    let channelBrandId = {
      id: values.brandId,
    };
    // let channelMarketPlaceId = {
    //   id: values.marketPlaceId,
    // };
    let channelCountryId = {
      id: values.countryId,
    };
    let channelDescription = {
      name: values.description.trim(),
    };
  
    // console.log("val", channelName);
    if (channelName.name === "" || channelDescription.name === "" || channelBrandId.id===""||channelCountryId.id==="") {
      notify("err");
    } else {
      let infoData={
        channelName  : channelName.name,
        // marketPlaceId: channelMarketPlaceId.id,
        brandId      :channelBrandId.id,
        countryId    :channelCountryId.id,
        description  :channelDescription.name
      }

      // console.log("ssssssssssss",infoData)
      setItemData(infoData)
      const apiRes = await createChannelApi(infoData);
      if (apiRes === "err") {
        formik.setSubmitting(false);
      } else {    
        notifySucess(true);
        classModal();
      }
    }
  };

  return (
    <>
      <div className="bg-white p-3 br3">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting ,setFieldValue}) => {
            return (
              <Form className="row mx-0 font12">
                <FormikControl
                  control="input"
                  type="text"
                  classprops="form-group mb-3 col-md-12 boldtxt"
                  className="form-control form-control-sm bb_only px-0 py-2"
                  label="Channel Name"
                  name="channelName"
                  id="ChannelName"
                />

                  <div className={`${styles.channel_dropdown}`}>
                                 <FormikControl
                                    control="reactSelect"
                                    selectOpts={brandDropdownGet}
                                    placeholder="Brand"
                                    name="brandId"
                                    isMulti={false}
                                   setFieldValue={setFieldValue}
                                  />
                  </div>
                  {/* <div className={`${styles.channel_dropdown}`}>
                                <FormikControl
                                    control="reactSelect"
                                    selectOpts={MarketplaceData}
                                    placeholder="Market Place"
                                    isMulti={false}
                                    name="marketPlaceId"
                                    setFieldValue={setFieldValue}
                                  />
                  </div>
            */}
                  <div className={`${styles.channel_dropdown}`}>
                                <FormikControl
                                    control="reactSelect"
                                    selectOpts={countryData}
                                    placeholder="Country"
                                    isMulti={false}
                                    name="countryId"
                                    setFieldValue={setFieldValue}
                                  />
                  </div>
           

                <FormikControl
                  control="text-area"
                  type="text"
                  classprops="form-group mb-3 col-md-12 boldtxt"
                  className="form-control form-control-sm bb_only px-0 py-2"
                  label="Channel Description"
                  name="description"
                  id="ChannelDescription"
                />

           

                <div className="col-12 text-center pt-5">
                  <SubmitButton
                    onClick={classModal}
                    type="button"
                    name="CANCEL"
                    className="btn btn-sm save_btn_secondary py-1 px-5 br3"
                  />
                  <SubmitButton
                    isLoading={isSubmitting}
                    type="submit"
                    name="ADD"
                    className="btn btn-sm save_btn_secondary py-1 px-5 br3 mx-2"
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <ToastContainer />
    </>
  );
}

export default React.memo(ChannelForm);
