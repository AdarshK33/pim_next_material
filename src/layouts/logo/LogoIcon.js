import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";
import Logo from "../../../assets/icons/logo_2.svg";

const LogoIcon = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "-1px",
        left: 10,

        zIndex: 2,
      }}
    >
      <Link href="#">
        <Image src={Logo} alt={Logo} width={70} height={70} />
      </Link>
    </div>
  );
};

export default LogoIcon;
