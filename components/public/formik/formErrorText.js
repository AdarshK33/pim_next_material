import React from "react"

function FormErrorText(props) {

    return(
        <div className="error ">
            {props.children}
        </div>
    )
};

export default React.memo(FormErrorText)