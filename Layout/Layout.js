import React, { useState } from "react";
import Navbar from "@/components/headers/Navbar";
import Flash from "@/components/headers/Flash";
import Menu from "@/components/headers/Menu";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";

export const ModalContext = React.createContext(undefined, undefined);

const Layout = ({ children, listCategories }) => {
  const [newsLetterModal, setNewsLetterModal] = useState(false);
  console.log("list categ dans layout = ", listCategories)
  return (
    <div className="app">
      <ModalContext.Provider value={{ newsLetterModal, setNewsLetterModal }}>
        {newsLetterModal && <Modal />}
        <header>
          <Navbar />
          <Flash />
          <Menu listCategories={listCategories}/>
        </header>

        {children}
        <Footer />
      </ModalContext.Provider>
    </div>
  );
};

export default Layout;
