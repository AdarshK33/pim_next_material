import React from "react";

function ButtonComponent({
  className,
  type,
  onClick,
  ButtonName,
  dataBsDismiss,
  ariaLabel,
}) {
  return (
    <>
      <button
        className={className}
        type={type}
        onClick={onClick}
        data-bs-dismiss={dataBsDismiss}
        aria-label={ariaLabel}
      >
        {ButtonName}
      </button>
    </>
  );
}

export default ButtonComponent;
