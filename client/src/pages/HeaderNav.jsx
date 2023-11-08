import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

function HeaderNav() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default HeaderNav;
