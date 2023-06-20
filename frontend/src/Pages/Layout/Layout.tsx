import Navbar from "../../Components/Navbar/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";
import {FooterComponent} from "../../Components/Footer/FooterComponent";

const Layout = () => {
  return (
    <>
      <Navbar />
      <FooterComponent/>
        <Outlet />
    </>
  );
};

export default Layout;
