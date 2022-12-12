import React from "react";
import { FastField, ErrorMessage } from "formik";
import FormErrorText from "./formErrorText";

function textArea(props) {

    const { name, label, id, classprops, ...rest } = props;

    return (
        <div className={classprops}>
            <label htmlFor={id}>{label}</label>
            <FastField name={name} id={id} {...rest} />
            <ErrorMessage name={name} component={FormErrorText} />
        </div>
    )
};

export default React.memo(textArea);
