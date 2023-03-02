import React from "react";
import Logo from "../Images/wavescan.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div style={{ marginTop: "2em", marginBottom: "2em" }}>
      <Link to="/">
        <img src={Logo} width="30%" alt="logo" />
      </Link>
    </div>
  );
}

export default Header;
