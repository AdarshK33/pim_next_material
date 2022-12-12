import React, { Fragment } from "react";
import { Spinner } from "react-bootstrap";

function SubmitButton({ name, isLoading, ...rest }) {

    return (
        <Fragment>
            <button disabled={isLoading} {...rest}>{isLoading ? <Spinner size="sm" animation="border" /> : name}</button>
        </Fragment>
    )
};

export default React.memo(SubmitButton)