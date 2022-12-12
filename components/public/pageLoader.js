import React, { Fragment } from "react";
import { Spinner } from "react-bootstrap";

function PageLoader({ classProps, size }) {

    return (
        <Fragment>
            <div className={classProps ? classProps : "pageLoader"}>
                <Spinner size={size ? size : "md"} animation="border" />
            </div>
        </Fragment>
    )
};

export default React.memo(PageLoader);