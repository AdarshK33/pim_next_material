import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";
import Logo from "../../../assets/icons/logo_2.svg";

const LogoIcon = () => {
  return (
    <Link href="#">
      <Image src={Logo} alt={Logo} width={80} height={80} />
    </Link>
  );
};

export default LogoIcon;
