import ScollButton from "components/scoll-btt/ScollBtt";
import React, { Fragment } from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header></Header>
      {children}
      <Footer></Footer>
      <ScollButton />
    </Fragment>
  );
};

export default Layout;
