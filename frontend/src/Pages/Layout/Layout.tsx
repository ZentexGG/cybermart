import Navbar from "../../Components/Navbar/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="Layout">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
