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

import { getCountryApi } from "../../../redux/actions/onboardQuery";

function ChannelForm({ classModal, onSuccess, notifySucess }) {
  const [itemData, setItemData] = useState();
  const toastId = React.useRef(null);
  const dispatch = useDispatch();



  const selectOpts = [
    { id: "20", name: "Active" },
    { id: "inactive", name: "InActive" },
    { label: "Albania", value: 355 },
    { label: "Argentina", value: 54 },
    { label: "Austria", value: 43 },
    { label: "Cocos Islands", value: 61 },
    { label: "Kuwait", value: 965 },
    { label: "Sweden", value: 46 },
    { label: "Venezuela", value: 58 }
  ];


  
  useEffect(() => {
    dispatch(getCountryApi());
  }, []);

  const { countryData } = useSelector(state => {
    console.log("hello",state)
		return state.onBoardQueryReducer;
	});

console.log("cccccccccc",countryData)
  useEffect(() => {
    console.log("itemData",itemData);
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
    name: "",
    discription: "",
    email:""
  };

  const onSubmit = async (values, formik) => {
    console.log("values",values);
    let channelName = {
      name: values.name.trim(),
    };
    let channelDiscription = {
      name: values.discription.trim(),
    };
  
    console.log("val", channelName);
    if (channelName.name === "" || channelDiscription.name === "" ) {
      notify("err");
    } else {
      let infoData={
        ChannelId: 0,
        ChannelName: channelName.name,
        description:channelDiscription.name,
        
      }
      setItemData(infoData)
      // const apiRes = await createChannelApi(channelName);
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
          {({ isSubmitting }) => {
            return (
              <Form className="row mx-0 font12">
                <FormikControl
                  control="input"
                  type="text"
                  classprops="form-group mb-3 col-md-12 boldtxt"
                  className="form-control form-control-sm bb_only px-0 py-2"
                  label="Channel Name"
                  name="name"
                  id="ChannelName"
                />

                <FormikControl
                  control="reactSelect"
                  selectOpts={selectOpts}
                  placeholder="Select"
                  isMulti={false}
                />

              
{/* 
                <FormikControl
                  control="input"
                  type="text"
                  classprops="form-group mb-3 col-md-12 boldtxt"
                  className="form-control form-control-sm bb_only px-0 py-2"
                  label="Email Id"
                  name="email"
                  id="email"
                /> */}
{/* 
                <FormikControl
                  control="input"
                  type="text"
                  classprops="form-group mb-3 col-md-12 boldtxt"
                  className="form-control form-control-sm bb_only px-0 py-2"
                  label="Contact Info"
                  name="contact"
                  id="contact"
                /> */}

                <FormikControl
                  control="text-area"
                  type="text"
                  classprops="form-group mb-3 col-md-12 boldtxt"
                  className="form-control form-control-sm bb_only px-0 py-2"
                  label="Channel Discription"
                  name="discription"
                  id="ChannelDiscription"
                />

              <p className="boldtxt">Status</p>
                <FormikControl
                  control="reactSelect"
                  selectOpts={selectOpts}
                  placeholder="Select"
                  isMulti={false}
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
