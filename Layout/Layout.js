import React, { useState } from "react";
import Navbar from "@/components/headers/Navbar";
import Flash from "@/components/headers/Flash";
import Menu from "@/components/headers/Menu";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";

export const ModalContext = React.createContext(undefined, undefined);

const Layout = ({ children, listCategories, listFlash }) => {
  const [newsLetterModal, setNewsLetterModal] = useState(false);
  return (
    <div className="app">
      <ModalContext.Provider value={{ newsLetterModal, setNewsLetterModal }}>
        {newsLetterModal && <Modal />}
        <header>
          <Navbar />
          <Flash listFlash={listFlash}/>
          <Menu listCategories={listCategories}/>
        </header>

        {children}
        <Footer listCategories={listCategories}/>
      </ModalContext.Provider>
    </div>
  );
};

export default Layout;
