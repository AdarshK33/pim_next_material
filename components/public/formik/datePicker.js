import React from "react";
import { useField } from "formik";
import { DatePicker, Space } from 'antd';
import FormErrorText from "./formErrorText";

export const DatePickerField = ({ control,name,...props }) => {
  const [field, , { setValue }] = useField(props);
  return (
    <>
    <DatePicker
    control={control}
    dateFormat="DD/MM/YYYY"
      {...field}
      {...props}
      selected={field.value }
      onChange={(val) => {
        setValue(val);
      }}
    />
    <ErrorMessage name={name} component={FormErrorText} />
    </>
  );
};

export default React.memo(DatePickerField);
