// import { Form, Formik } from "formik";
import { Row, Col, Form, Button } from "react-bootstrap";

import React, { useRef,useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import FormikControl from "../../../public/formik/formikControl";
import SubmitButton from "../../../public/formik/submitButton";
import { createBrandApi } from "../../../utility/apiUtility";
import formcss from '../../../../styles/form.module.css'
import { useDispatch, useSelector } from "react-redux";

import { createCategoryApi } from "../../../../redux/actions/catalog";

function CategoryForm({ classModal, onSuccess, notifySucess,type }) {
  const [itemData, setItemData] = useState();
  const [brandActive, setBrandActive]= useState();
  const [checkValidation, setcheckValidation]= useState(false);
  const toastId = React.useRef(null);
  const dispatch = useDispatch();

  
  const [formValues, setFormValues] = useState([{ name: "" }]);
  const [count, setCountValue] = useState(1);

  const [parentCategoryName , setParentCategoryName ] = useState();


  const [categoryNameError, setCategoryNameError] = useState();

  
  const [categoryDescriptionError, setCategoryDescriptionError] = useState();
  const [parentCategoryNameError, setParentCategoryNameError] = useState();



  const [newparentCategoryName , setnewParentCategoryName ] = useState();
  const [newcategoryNameError, setnewCategoryNameError] = useState();
  const [newcategoryDescriptionError, setnewCategoryDescriptionError] = useState();
  const [newparentCategoryNameError, setnewParentCategoryNameError] = useState();

  

const { categoryCreate,loading } = useSelector(state => {
  // console.log("hello",state)
  return state.catalogReducer;
});

// console.log("type.title",type.title)

  const [state, setState] = useState({
    categoryName: "",
    categoryDescription: "",
    slug:""
  });


  
  const [newstate, setNewState] = useState({
    categoryName: "",
    categoryDescription: "",
    slug:""
  });
  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });

    setNewState({
      ...newstate,
      [e.target.name]: e.target.value,
    });
    // console.log("hello input",state);
  };

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

  const notify = (type) => {
    if (!toast.isActive(toastId.current)) {
      if (type !== "err") {
        toastId.current = toast.success("Brand added Successfully !!!");
      } else {
        toastId.current = toast.error("Brand fields cannot be empty !!!");
      }
    }
  };

  const categoryNameValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (
      state.categoryName !== "" &&
      state.categoryName !== null &&
      state.categoryName !== undefined
    ) {
      setCategoryNameError(false);
      // console.log("channelNameSuccess");
      return true;
    } else {
      setCategoryNameError(true);
      // console.log("channelNameError");
      return false;
    }
  };


  const categoryDescriptionValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (
      state.categoryDescription !== "" &&
      state.categoryDescription !== null &&
      state.categoryDescription !== undefined
    ) {
      setCategoryDescriptionError(false);
      // console.log("channelNameSuccess");
      return true;
    } else {
      setCategoryDescriptionError(true);
      // console.log("channelNameError");
      return false;
    }
  };


  // const categoryParentValidations = () => {
  //   const nameValid = /^[a-zA-Z\b]+$/;
  //   if (
  //     parentCategoryName == "" &&
  //     parentCategoryName == null &&
  //     parentCategoryName == undefined
  //   ) {
  //     setParentCategoryNameError(false);
  //     // console.log("channelNameSuccess");
  //     return true;
  //   } else {
  //     setParentCategoryNameError(true);
  //     // console.log("channelNameError");
  //     return false;
  //   }
  // };

  const newCategoryNameValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (
      newstate.categoryName !== "" &&
      newstate.categoryName !== null &&
      newstate.categoryName !== undefined
    ) {
      setnewCategoryNameError(false);
      // console.log("channelNameSuccess");
      return true;
    } else {
      setnewCategoryNameError(true);
      // console.log("channelNameError");
      return false;
    }
  };


  const newCategoryDescriptionValidations = () => {
    const nameValid = /^[a-zA-Z\b]+$/;
    if (
      newstate.categoryDescription !== "" &&
      newstate.categoryDescription !== null &&
      newstate.categoryDescription !== undefined
    ) {
      setnewCategoryDescriptionError(false);
      // console.log("channelNameSuccess");
      return true;
    } else {
      setnewCategoryDescriptionError(true);
      // console.log("channelNameError");
      return false;
    }
  };



  const checkValidations = () => {
    // console.log("isChecked");
    if (
      (categoryNameValidations() == true)    &
      // (categoryParentValidations() == true)   &

      (categoryDescriptionValidations() == true)

    ) {
      return true;
    } else {
      return false;
    }

};

const checkNewCategoryValidation = () => {
  // console.log("isChecked");
  if (
    (newCategoryNameValidations() == true)   &
    (newCategoryDescriptionValidations() == true)

  ) {
    return true;
  } else {
    return false;
  }

};





const submitHandler = async(e) => {
  e.preventDefault();

  const value = checkValidations();
 


  if (value === true) {
    console.log("Inside the category submit");
    // setSaveclick(true);

    const UpdateInfo = {
        name: state.categoryName,
        description : state.categoryDescription,
        parentCategoryId : type.key,
        brands : [type.brandName],
        precedence: 0
      
  }
  console.log("hello update info", UpdateInfo);
  //apis(UpdateInfo)
 dispatch( createCategoryApi(UpdateInfo));

 const apiRes = await createCategoryApi(UpdateInfo);
 if (apiRes === "err") {
  //  formik.setSubmitting(false);
 } else {    
   notifySucess(true);
   classModal();
 }
};


}

const submitNewHandler = async(e) => {
  e.preventDefault();

 
  const newValue = checkNewCategoryValidation();

if (newValue === true) {
  console.log("Inside the category submit");
  // setSaveclick(true);

  const UpdateInfo = {
      name: newstate.categoryName,
      description : newstate.categoryDescription,
      brands : ['Puma'],
      precedence: 0
    
}
console.log("hello new category info", UpdateInfo);
//apis(UpdateInfo)
dispatch( createCategoryApi(UpdateInfo));

const apiRes = await createCategoryApi(UpdateInfo);
if (apiRes === "err") {
//  formik.setSubmitting(false);
} else {    
 notifySucess(true);
 classModal();
}
};



}


  return (
    <>
      <div className="bg-white p-3 br3">
      {/* parentCategoryId */}
         {!type?(
          <>
         <Form>
           <Row style={{ marginBottom: ".2rem" }}>
           <div className="col-sm-12 ">
                <Form.Group>
                  <Form.Label>
                    <span className=".font12">Add New Catergory</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="categoryName"
                    value={newstate.categoryName}
                    onChange={changeHandler}
                    required
                    maxLength="250"
                    style={newcategoryNameError ? { borderColor: "red" } : {}}
                    placeholder="Name"
                    // disabled={disabled}
                  />
                  {newcategoryNameError ? (
                    <p style={{ color: "red" }}> ** Please enter channel Name </p>
                  ) :newstate.categoryName && newstate.categoryName.length === 100 ? (
                    <p style={{ color: "red" }}> Max 100 Characters</p>
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
             
                <span> selected Category </span>
              </Form.Label>
              <Form.Control
                as="select"
                name="parentId"
                // value={type.title}
                // onChange={(e) => countryHandler(e)}
                required
                style={parentCategoryNameError ? { borderColor: "red" } : {}}
                // disabled={disabled}
              >
                {/* <option value="">Select Parent Catergory</option> */}
                {/* <option value="">{type.title}</option> */}

                {/* {
                  countryData &&
                  countryData?.map((item, i) => {
                    return (
                      <option key={item.value}>{item.label}</option>
                    );
                  })
                  } */}
              {/* </Form.Control>
              {parentCategoryNameError ? (
                    <p style={{ color: "red" }}>** Please choose parent category</p>
                  ) : (
                    <p></p>
                  )}
             
            </Form.Group>
          </div>
            // </Row> */}
          {/* <Row style={{ marginBottom: ".2rem" }}> */}
          {/* <div className="col-sm-12">
            <Form.Group>
              <Form.Label>
                <span> Sub Category </span>
              </Form.Label>
              <Form.Control
                as="select"
                name="subCategoryNameId"
                value={subCategoryName}
                // onChange={(e) => brandHandler(e)}
                required
                style={subCategoryNameError ? { borderColor: "red" } : {}}
                // disabled={disabled}
              >
                <option value="">Select Sub Category Name</option>
                {/* {
                  brandDropdownGet &&
                  brandDropdownGet.map((item, i) => {
                    return (
                      <option key={item.value}>{item.label}</option>
                    );
                  })
                  } */}
              {/* </Form.Control>
              {subCategoryNameError ? (
                    <p style={{ color: "red" }}>** Please choose sub Category Name</p>
                  ) : (
                    <p></p>
                  )}
            </Form.Group>
          </div> */}
          {/* </Row> */}
          {/* <Row style={{ marginBottom: ".2rem" }}>
          <div className="col-sm-12">
            <Form.Group>
              <Form.Label>
                <span> Brand </span>
              </Form.Label>
              <Form.Control
                as="select"
                name="parentId"
                value={parentCategoryName}
                // onChange={(e) => brandHandler(e)}
                required
                style={brandNameError ? { borderColor: "red" } : {}}
                // disabled={disabled}
              >
                <option value="">Select Brand </option>
                {/* {
                  countryData &&
                  countryData?.map((item, i) => {
                    return (
                      <option key={item.value}>{item.label}</option>
                    );
                  })
                  } */}
              {/* </Form.Control>
              {brandNameError ? (
                    <p style={{ color: "red" }}>** Please choose brand</p>
                  ) : (
                    <p></p>
                  )} */}
             
            {/* </Form.Group>
          </div>
          // </Row> */} 



          {/* <Row style={{ marginBottom: ".2rem" }}>
           <div className="col-sm-12 ">
                <Form.Group>
                  <Form.Label>
                    <span className=".font12">Slug</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="Slug"
                    value={state.slug}
                    onChange={changeHandler}
                    required
                    maxLength="250"
                    style={slugError ? { borderColor: "red" } : {}}
                    placeholder="slug"
                    // disabled={disabled}
                  />
                  {slugError ? (
                    <p style={{ color: "red" }}> ** Please enter slug </p>
                  ) :state.slug && state.slug.length === 100 ? (
                    <p style={{ color: "red" }}> Max 100 Characters</p>
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
                    <span>Category Description</span>
                  </Form.Label>
                  <Form.Control
                    as="textarea" rows={3}
                    name="categoryDescription"
                    value={newstate.categoryDescription}
                    onChange={changeHandler}
                    required
                    maxLength="250"
                    style={newcategoryDescriptionError ? { borderColor: "red" } : {}}
                    placeholder="Description"
                    // disabled={disabled}
                  />
                  {newcategoryDescriptionError ? (
                    <p style={{ color: "red" }}>** Please enter Category description</p>
                  ) :newstate.categoryDescription && newstate.categoryDescription.length === 250 ? (
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
                     onClick={submitNewHandler}
                      type="submit"
                      name="ADD"
                      className="btn btn-sm save_btn_secondary py-1 px-5 br3 mx-2"
                    />
              </div>
           </Form>
          </>
         ):(<>
           <Form>
           <Row style={{ marginBottom: ".2rem" }}>
           <div className="col-sm-12 ">
                <Form.Group>
                  <Form.Label>
                    <span className=".font12">Add New Catergory</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="categoryName"
                    value={state.categoryName}
                    onChange={changeHandler}
                    required
                    maxLength="250"
                    style={categoryNameError ? { borderColor: "red" } : {}}
                    placeholder="Name"
                    // disabled={disabled}
                  />
                  {categoryNameError ? (
                    <p style={{ color: "red" }}> ** Please enter Category Name </p>
                  ) :state.categoryName && state.categoryName.length === 100 ? (
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
             
                <span> selected Category </span>
              </Form.Label>
              <Form.Control
                as="select"
                name="parentId"
                // value={type.title}
                // onChange={(e) => countryHandler(e)}
                required
                // style={parentCategoryNameError ? { borderColor: "red" } : {}}
                // disabled={disabled}
              >
                {/* <option value="">Select Parent Catergory</option> */}
                <option value="">{type.title}</option>

                {/* {
                  countryData &&
                  countryData?.map((item, i) => {
                    return (
                      <option key={item.value}>{item.label}</option>
                    );
                  })
                  } */}
              </Form.Control>
              {/* {parentCategoryNameError ? (
                    <p style={{ color: "red" }}>** Please choose parent category</p>
                  ) : (
                    <p></p>
                  )} */}
             
            </Form.Group>
          </div>
            </Row>
          {/* <Row style={{ marginBottom: ".2rem" }}> */}
          {/* <div className="col-sm-12">
            <Form.Group>
              <Form.Label>
                <span> Sub Category </span>
              </Form.Label>
              <Form.Control
                as="select"
                name="subCategoryNameId"
                value={subCategoryName}
                // onChange={(e) => brandHandler(e)}
                required
                style={subCategoryNameError ? { borderColor: "red" } : {}}
                // disabled={disabled}
              >
                <option value="">Select Sub Category Name</option>
                {/* {
                  brandDropdownGet &&
                  brandDropdownGet.map((item, i) => {
                    return (
                      <option key={item.value}>{item.label}</option>
                    );
                  })
                  } */}
              {/* </Form.Control>
              {subCategoryNameError ? (
                    <p style={{ color: "red" }}>** Please choose sub Category Name</p>
                  ) : (
                    <p></p>
                  )}
            </Form.Group>
          </div> */}
          {/* </Row> */}
          {/* <Row style={{ marginBottom: ".2rem" }}>
          <div className="col-sm-12">
            <Form.Group>
              <Form.Label>
                <span> Brand </span>
              </Form.Label>
              <Form.Control
                as="select"
                name="parentId"
                value={parentCategoryName}
                // onChange={(e) => brandHandler(e)}
                required
                style={brandNameError ? { borderColor: "red" } : {}}
                // disabled={disabled}
              >
                <option value="">Select Brand </option>
                {/* {
                  countryData &&
                  countryData?.map((item, i) => {
                    return (
                      <option key={item.value}>{item.label}</option>
                    );
                  })
                  } */}
              {/* </Form.Control>
              {brandNameError ? (
                    <p style={{ color: "red" }}>** Please choose brand</p>
                  ) : (
                    <p></p>
                  )} */}
             
            {/* </Form.Group>
          </div>
          // </Row> */} 



          {/* <Row style={{ marginBottom: ".2rem" }}>
           <div className="col-sm-12 ">
                <Form.Group>
                  <Form.Label>
                    <span className=".font12">Slug</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="Slug"
                    value={state.slug}
                    onChange={changeHandler}
                    required
                    maxLength="250"
                    style={slugError ? { borderColor: "red" } : {}}
                    placeholder="slug"
                    // disabled={disabled}
                  />
                  {slugError ? (
                    <p style={{ color: "red" }}> ** Please enter slug </p>
                  ) :state.slug && state.slug.length === 100 ? (
                    <p style={{ color: "red" }}> Max 100 Characters</p>
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
                    <span>Category Description</span>
                  </Form.Label>
                  <Form.Control
                    as="textarea" rows={3}
                    name="categoryDescription"
                    value={state.categoryDescription}
                    onChange={changeHandler}
                    required
                    maxLength="250"
                    style={categoryDescriptionError ? { borderColor: "red" } : {}}
                    placeholder="Description"
                    // disabled={disabled}
                  />
                  {categoryDescriptionError ? (
                    <p style={{ color: "red" }}>** Please enter Category description</p>
                  ) :state.categoryDescription && state.categoryDescription.length === 250 ? (
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
                      name="ADD"
                      className="btn btn-sm save_btn_secondary py-1 px-5 br3 mx-2"
                    />
              </div>
           </Form>
         </>)
          
         }
    
      </div>
      <ToastContainer />
    </>
  );
}

export default React.memo(CategoryForm);
