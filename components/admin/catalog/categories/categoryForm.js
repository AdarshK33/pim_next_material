import { Form, Formik } from "formik";
import React, { useRef,useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import FormikControl from "../../../public/formik/formikControl";
import SubmitButton from "../../../public/formik/submitButton";
import { createBrandApi } from "../../../utility/apiUtility";
import formcss from '../../../../styles/form.module.css'


function CategoryForm({ classModal, onSuccess, notifySucess }) {
  const toastId = React.useRef(null);
  const notify = (type) => {
    if (!toast.isActive(toastId.current)) {
      if (type !== "err") {
        toastId.current = toast.success("Brand added Successfully !!!");
      } else {
        toastId.current = toast.error("Brand fields cannot be empty !!!");
      }
    }
  };
  const [formValues, setFormValues] = useState([{ name: "" }]);
  const [count, setCountValue] = useState(1);

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    console.log("check", count);
    setCountValue(count + 1);
    setFormValues([...formValues, { name: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit", formValues);

    alert(JSON.stringify(formValues));
  };


  const onSubmit = async (values, formik) => {
    let brndName = {
      name: values.name.trim(),
    };
    let brndDiscription = {
      name: values.discription.trim(),
    };
    console.log("val", brndName);
    if (brndName.name === "" || brndDiscription.name === "" ) {
      notify("err");
    } else {
      const apiRes = await createBrandApi(brndName);
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
      <form onSubmit={handleSubmit}>
      
      <h5 className="text-center">Create category</h5>
      {count < 10 ? (
        <div className={formcss.addButton}>
       <span>Add Category</span><button
        className="btn btn-sm btn-secondary py-1 px-2 br3 mx-1"
          type="button"
          onClick={() => addFormFields()}
        >
          +
        </button>
        </div>
      ) : (
        <span>Max sub catogory is 10</span>
      )}
      {formValues.map((element, index) => (
        <div className="form-inline" key={index}>   
          <label className="mb-1 col-md-12"> Category Name</label>
          <input
            type="text"
            name="name"
            className="form-control form-control-sm bb_only px-0 py-2 mb-3"
            value={element.name || ""}
            onChange={(e) => handleChange(index, e)}
          />
        </div>
      ))}
      <div className={`${formcss.submitButton} button-section`}>
        <button className="btn btn-sm btn-secondary py-1 px-5 br3 mx-2 submitButton" type="submit">
          Submit
        </button>
      </div>
    </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default React.memo(CategoryForm);
