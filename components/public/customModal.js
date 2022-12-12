import React, { Fragment } from "react";
import { Modal } from "react-bootstrap";

function CustomModal({ body, closeModal, ...rest }) {

    return (
        <Fragment>
            <Modal
                {...rest}
                onHide={closeModal}
            >
                <Modal.Body>
                    <button type="button" onClick={closeModal} className="btn-close" aria-label="Close">&#x2715;</button>
                    {body}
                </Modal.Body>
            </Modal>
        </Fragment>
    )
};

export default React.memo(CustomModal)