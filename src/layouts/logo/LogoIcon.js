import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";
import LogoDark from "../../../assets/icons/logo_2_2022.svg";

const LogoIcon = () => {
  return (
    <Link href="/">
      <Image 
      src={LogoDark} 
      alt={LogoDark}
      width={100}
      height={90}
       />
    </Link>
  );
};

export default LogoIcon;
