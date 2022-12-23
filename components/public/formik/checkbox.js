import React from "react";
import { FastField, ErrorMessage } from "formik";
import FormErrorText from "./formErrorText";

function Checkbox(props) {

    const { name, label, id, classprops, labelProps, extraLabel, ...rest } = props;

    return (
        <div className={classprops}>
            <FastField type="checkbox" name={name} id={id} {...rest} />
             <label className={labelProps} htmlFor={id}>{label} {extraLabel && extraLabel}</label>
            <ErrorMessage name={name} component={FormErrorText} />
        </div>
    )
};

export default React.memo(Checkbox);

  