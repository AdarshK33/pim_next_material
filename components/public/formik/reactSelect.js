import React, { useState } from 'react';
import Select from 'react-select';

function ReactSelect(props) {
    const { selectOpts, placeholder, isMulti, setFieldValue, name, ...rest } = props;

    const [selectedOption, setSelectedOption] = useState(null);
    function handleChange(selectedValue) {
        setSelectedOption(selectedValue);
        setFieldValue && setFieldValue(name, selectedValue.value)
        console.log("value Selected", selectedValue);
    }

    return (
        <>
            <Select
                value={selectedOption}
                onChange={handleChange}
                options={selectOpts}
                placeholder={placeholder}
                isMulti={isMulti}
                {...rest}
            />
        </>
    )
}

export default React.memo(ReactSelect)
