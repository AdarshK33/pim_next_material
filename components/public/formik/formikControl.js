import React from "react";
import Checkbox from "./checkbox";
import DropZoneField from "./dropZoneField";
import Input from "./input";
import ReactSelect from "./reactSelect"
import DatePickerField from "./datePicker"
import TextArea from "./textArea"

function FormikControl(props) {
    const { control, ...rest } = props;

    switch (control) {
        case 'input': return <Input {...rest} />;
        case 'text-area': return <TextArea {...rest} />;
        case 'checkbox': return <Checkbox {...rest} />;
        case 'reactSelect': return <ReactSelect {...rest} />;
        case 'dropZone': return <DropZoneField {...rest} />;
        case 'datePicker': return <DatePickerField {...rest} />;
    }

}

export default React.memo(FormikControl);