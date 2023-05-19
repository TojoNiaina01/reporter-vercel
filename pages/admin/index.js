import React from "react";
import useMediaQuery from "@/hook/useMediaQuery";
import Errors from "@/pages/404";
const Admin = () => {
  const isAboveScreen = useMediaQuery("(min-width: 1024px)");

  if (!isAboveScreen)
    return (
      <Errors
        alert="Page Not Supported"
        message="this page is only supported on desktop screen!"
        backHome
      />
    );
  return (
    <section className="">
      {/* Main Page admin */}
      <div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
};

export default Admin;
