import React, {useContext} from "react";
import { Cross } from "@/public/assets/svg";
import Image from "next/image";
import FormArticle from "@/components/admin/FormArticle";
import { listCategories, listArticlesContext } from "@/context/allContext";

const ModalArticle = ({ setModalShow, articleData, listFollowers }) => {

  const categories = useContext(listCategories)
  const {state, dispatch} = useContext(listArticlesContext)
  return (
    <section className="fixed inset-0  bg-black/30 z-20 backdrop-blur-sm flex  justify-center items-center">
      <button
        className="fixed top-5 right-5 border-white lg:top-10 lg:right-20 border-2 lg:border-main-500 p-2 rounded-md"
        onClick={() => setModalShow(false)}
      >
        <Image src={Cross} alt="close" />
      </button>
      <div className="bg-white w-2/5 px-6 py-5 h-[90vh] overflow-y-scroll 2xl:overflow-y-auto ">
        {/*  Add Articles */}
        <FormArticle
          header="Edition d'une Article"
          submitBtn="Editer"
          setModalShow={setModalShow}
          listCategories={categories}
          articleData={state.find(item => item.id === articleData.id)}
          dispatchArticle={dispatch}
          listFollowers={listFollowers}
          pushBtn
        />
      </div>
    </section>
  );
};

export default ModalArticle;
