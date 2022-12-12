import React from "react";
import Checkbox from "./checkbox";
import DropZoneField from "./dropZoneField";
import Input from "./input";
import ReactSelect from "./reactSelect"

function FormikControl(props) {
    const { control, ...rest } = props;

    switch (control) {
        case 'input': return <Input {...rest} />;
        case 'checkbox': return <Checkbox {...rest} />;
        case 'reactSelect': return <ReactSelect {...rest} />;
        case 'dropZone': return <DropZoneField {...rest} />;
    }

}

export default React.memo(FormikControl);