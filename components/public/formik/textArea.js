import React from "react";
import { FastField, ErrorMessage } from "formik";
import FormErrorText from "./formErrorText";
import { Formik, Form, useField } from "formik";

function TextArea(props) {

    const { control,name, label, id, classprops, ...rest } = props;
    const [field, meta] = useField(props);
    return (
        <div className={classprops}>
            <label htmlFor={id}>{label}</label>
            <textarea className="text-area"  control ={control} name={name} id={id} {...field}  {...rest} />
            {/* <FastField  control ={control} name={name} id={id} {...rest} /> */}
            <ErrorMessage name={name} component={FormErrorText} />
        </div>
    )
};

export default React.memo(TextArea);