import React from "react";
import Navbar from "@/components/headers/Navbar";
import Flash from "@/components/headers/Flash";
import Menu from "@/components/headers/Menu";
import Banner from "@/components/headers/Banner";
import Footer from "@/components/Footer";

const Layout = ({ children, clickHandler }) => {
  return (
    <>
      <header>
        <Navbar />
        <Flash />
        <Menu />
        <Banner />
      </header>
      <main className="mx-2">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
