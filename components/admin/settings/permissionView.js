import React from "react";
import { Fragment } from "react";
import FormikControl from "../../public/formik/formikControl";
import List from "./list";
import SubmitButton from "../../public/formik/submitButton";

function Permission() {
  const selectOpts = [
    { value: "Brand 1", label: "xyz" },
    { value: "Brand 2", label: "Brand 2" },
    { value: "Brand 3", label: "Brand 3  " },
  ];

  const listValues = [
    { name: "Person 1", email: "person@emial.com" },
    { name: "Person 2", email: "person@emial.com" },
    { name: "Person 3", email: "person@emial.com" },
    { name: "Person 4", email: "person@emial.com" },
  ];
  return (
    <Fragment>
      <div className="col-10 p-0">
        <div className="catelog-search font12 txt_gray">Search</div>
      </div>
      <div className="parent-list font14">
        <div className="parent-list__heading">
          <div className="col-3">
            <span>Brand</span>
          </div>
          <div className="col-3">
            <span>Name</span>
          </div>
          <div className="col-3">
            <span>Access</span>
          </div>
          <div className="col-3">
            <span>Role</span>
          </div>
        </div>
        <div className="row parent-list__asign">
          <div className="col-3">
            <FormikControl
              control="reactSelect"
              selectOpts={selectOpts}
              placeholder="Select Brand"
              isMulti={false}
            />
          </div>
          <div className="col-3">
            <FormikControl
              control="reactSelect"
              selectOpts={selectOpts}
              placeholder="Select Name"
              isMulti={false}
            />
          </div>
          <div className="col-3">
            <FormikControl
              control="reactSelect"
              selectOpts={selectOpts}
              placeholder="Select Access"
              isMulti={true}
            />
          </div>
          <div className="col-3">
            <FormikControl
              control="reactSelect"
              selectOpts={selectOpts}
              placeholder="Select Role"
              isMulti={false}
            />
          </div>
        </div>
        {/* <List listValues={listValues} /> */}
        <div className="buttons-sec pt-4">
          <SubmitButton
            className="btn btn-cancel"
            type="button"
            isLoading={false}
            name="CANCEL"
          />
          <SubmitButton
            className="btn btn-sub"
            type="submit"
            isLoading={false}
            name="SAVE"
          />
        </div>
      </div>
    </Fragment>
  );
}

export default React.memo(Permission);
