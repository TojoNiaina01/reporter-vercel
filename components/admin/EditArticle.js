import React from "react";
import Input from "@/components/Input";
import UploadFile from "@/components/admin/UploadFile";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

const EditArticle = () => {
  return (
    <section className="">
      <h3 className="text-xl font-semibold tracking-wide mb-4">
        Edition d'article.
      </h3>
      <form>
        <div className="flex gap-6">
          <div className="flex flex-col gap-4 w-1/2 h-fit">
            <Input id="titre" label="Titre" required type="text" />
            <Input id="sous-titre" label="Sous-Titre" required type="text" />
            <Input id="auteur" label="Auteur" required type="text" />
            <Input
              id="contenu"
              label="Contenu"
              required
              textarea
              className="peer w-full p-4 pt-6 border border-gray-400 rounded-md outline-none transition pl-4"
            />
          </div>

          {/* Upload file */}
          <UploadFile />
        </div>

        <div className="flex gap-12 mt-8">
          <button className="flex items-center bg-[#555555] text-white font-semibold gap-2 px-4 py-2 rounded-full active:scale-95 shadow-md">
            <XMarkIcon className="h-5" />
            <span>Annuler</span>
          </button>
          <button className="flex items-center bg-main-500 text-white font-semibold gap-2 px-4 py-2 rounded-full active:scale-95 shadow-md">
            <CheckIcon className="h-5" />
            <span>Modifier</span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditArticle;
