import React, {
  Fragment,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import styles from "./customModal.module.css";
function CustomModal(props) {
  const { openModal, closeModal, body, ...otherProps } = props;

  return (
    <Dialog onClose={closeModal} open={openModal} {...otherProps}>
      <Button
        onClick={closeModal}
        className={`btn-close ${styles.modalCloseBtn}`}
        aria-label="Close"
      >
        &#x2715;
      </Button>
      <DialogContent>{body}</DialogContent>
    </Dialog>
  );
}

export default React.memo(CustomModal);
