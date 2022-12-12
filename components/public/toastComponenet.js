import React, { Fragment, useImperativeHandle, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

function ToastComponent(props, ref) {
    const [toastObj, setToastObj] = useState({});

    const toastHandler = (toaster) => {
        switch (toaster.response) {
            case 'suc': return toastObj1 = setToastObj({ bg: "success", msg: toaster.msg ? toaster.msg : "Success", position: toaster.position });
            case 'err': return toastObj1 = setToastObj({ bg: "danger", msg: toaster.msg ? toaster.msg : "Error", position: toaster.position });
            case 'info': return toastObj1 = setToastObj({ bg: "info", msg: toaster.msg ? toaster.msg : "Message Empty", position: toaster.position });
        }
    }

    const toastClose = () => setToastObj({});

    useImperativeHandle(ref, () => ({
        toastHandler: toastHandler,
        toastClose: toastClose
    }));

    return (
        <Fragment>
            {Object.entries(toastObj).length > 0 && <ToastContainer className="p-3" position={toastObj.position ? toastObj.position : "top-end"}>
                <Toast onClose={toastClose} bg={toastObj.bg}>
                    <Toast.Header className="py-3">{toastObj.header}</Toast.Header>
                    {toastObj.msg && <Toast.Body className='text-white text-center'>{toastObj.msg}</Toast.Body>}
                </Toast>
            </ToastContainer>}
        </Fragment>
    )

}

export default React.forwardRef(ToastComponent);