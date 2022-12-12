import React, { forwardRef, Fragment, useImperativeHandle, useState } from "react";
import { Alert } from "react-bootstrap";

const AlertUtility = forwardRef((props, ref) => {

    const [toast, setToast] = useState({});

    const changeToast = (data) => {
        setToast(data);
        setTimeout(() => setToast({}), 2000);
    }

    useImperativeHandle(ref, () => ({
        suc: () => changeToast({ msg: "Success", variant: "success", classProps: "text-success apiAlert" }),
        err: () => changeToast({ msg: "Error", variant: "danger", classProps: "text-danger apiAlert" }),
    }));

    return (
        <Fragment>
            {Object.keys(toast).length > 0 && <Alert className={toast.classProps} variant={toast.variant}>{toast.msg}</Alert>}
        </Fragment>
    )

});

export default React.memo(AlertUtility)