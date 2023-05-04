import React from "react";
import AddAds from "@/components/admin/AddAds";

const EditAds = () => {
  return (
    <section className="fixed inset-0  bg-black/40 z-20 backdrop-blur-sm flex  justify-center items-center">
      <div className="w-[70%] bg-white p-4 rounded-lg">
        <AddAds submitBtn="Editer" />
      </div>
    </section>
  );
};

export default EditAds;
