import { useState, useContext, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import { MenuFR } from "@/constant/constant";
import {
  BoltIcon,
  ChevronDownIcon,
  FireIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import ModalArticle from "@/components/ModalArticle";
import ConfirmDelete from "@/components/ConfirmDelete";
import moment from "moment";
import {v4 as uuidV4} from 'uuid';
import { ROOT_URL } from "@/env";


const Article = ({ header, tabhead, data, user, listArticles, listCategories, dispatchArticle }) => {
  const lang = [
    {tag: "fr", langue: "français"},
    {tag: "en", langue: "Anglais"},
  ];
  const [selectedMenu, setSelectedMenu] = useState(listCategories[0]);
  const [selectedLang, setSelectedLang] = useState(lang[0]);
  const [modalShow, setModalShow] = useState(false);
  const [articleData, setArticleData] = useState()
  const [modalDeleteConfirm, setModalDeleteConfirm] = useState(false);


const modifHandler = (val) => {
  setModalShow(!modalShow)
  setArticleData(val)
}

const categoryHandler = (val) => {
  setSelectedMenu(val)
  const param = {query: 'getArticleByCategoryLang', param: [val.id, selectedLang.tag]}

  fetch(`${ROOT_URL}/api/knexApi`, {
    method: "POST",
    body: JSON.stringify(param),
    headers: {
      "Content-type": "application/json"
    }
  }).then((res) => res.json())
    .then((data) => {
      console.log("new list filtrer == ", data.result)
      dispatchArticle({type: 'ALLCHANGE', result: data.result})
    })

}

const langHandler = (val) => {
  setSelectedLang(val)
  const param = {query: 'getArticleByCategoryLang', param: [selectedMenu.id, val.tag]}

  fetch(`${ROOT_URL}/api/knexApi`, {
    method: "POST",
    body: JSON.stringify(param),
    headers: {
      "Content-type": "application/json"
    }
  }).then((res) => res.json())
    .then((data) => {
      console.log("new list filtrer == ", data.result)
      dispatchArticle({type: 'ALLCHANGE', result: data.result})
    })

}
  return (
    <div className="w-[90%] mx-auto">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold tracking-wide">{header}</h3>
        <div className="flex gap-4">
          {!user && (
            <>
            <Listbox value={selectedMenu} onChange={categoryHandler}>
              <div className="flex flex-col relative">
                <Listbox.Button className="text-main-500 flex gap-4 items-center border rounded-full px-4 py-2 border-main-500">
                  <p className="">{selectedMenu.fr}</p>
                  <ChevronDownIcon className="block h-4" />
                </Listbox.Button>
                <Listbox.Options className=" absolute top-12 border border-main-500 p-2 rounded-md shadow-md bg-white">
                  {listCategories.map((category) => (
                    <Listbox.Option
                      key={uuidV4()}
                      value={category}
                      className="ui-active:bg-main-500 rounded-lg px-2 py-1 cursor-pointer ui-active:text-white"
                    >
                      {category.fr}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
            <Listbox value={selectedLang} onChange={langHandler}>
              <div className="flex flex-col relative">
                <Listbox.Button className="text-main-500 flex gap-4  items-center border rounded-full  px-6 py-2 border-main-500">
                  <p className="">{selectedLang.langue}</p>
                  <ChevronDownIcon className="block h-4" />
                </Listbox.Button>
                <Listbox.Options className="absolute top-12 border border-main-500 p-2  rounded-md shadow-md bg-white">
                  {lang.map((item) => (
                    <Listbox.Option
                      key={uuidV4()}
                      value={item}
                      className="ui-active:bg-main-500 rounded-lg px-2 py-1 cursor-pointer ui-active:text-white"
                    >
                      {item.langue}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
          </Listbox>
          </>
          )}
          {/*  Recherche*/}
          <div className="border border-main-500 py-2 px-4 rounded-full flex items-center w-[200px] h-fit">
            <input
              type="text"
              className="focus:outline-none w-full mx-2 placeholder:text-xs"
              placeholder="SEARCH"
            />
            <MagnifyingGlassIcon className="h-5" color="#3e817d" />
          </div>
        </div>
      </div>
      {/*  tableau */}

      <div className="overflow-x-auto shadow-md rounded-lg mt-4">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs uppercase bg-main-500 text-white">
            <tr>
              {tabhead?.map((tab) => (
                <th key={uuidV4()} scope="col" className="px-6 py-3">
                  {tab}
                </th>
              ))}
            </tr>
          </thead>
          {!user && (
            <tbody>
              {listArticles?.map((article, i) => (
                <tr key={uuidV4()} className="bg-white border-b ">
                  <td className="px-6 py-4">{i}</td>
                  <td className="relative w-[100px] h-[100px]">
                    <Image
                      fill
                      src={`/uploads/images/${article.image[0].image_name}.${article.image[0].image_extension}`}
                      className=" object-contain"
                      alt="Article image blog"
                    />
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {(article.title.length > 40) ? `${article.title.substring(0,40)}...`: article.title}
                  </th>
                  <td className="px-6 py-4">{article.category_fr}</td>

                  {/* eto hoe slide sa hot staff sa flash info */}
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      <BoltIcon className={`h-5 ${article.flash && 'text-red-600'}`} />
                      <HomeIcon className={`h-5 ${article.slide && 'text-blue-600'}`} />
                      <FireIcon className={`h-5 ${article.hot && 'text-orange-600'}`} />
                    </div>
                  </td>

                  <td className="px-6 py-4">{moment(article.created_at).format('DD/MM/YYYY')}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <PencilSquareIcon
                        className="h-5 text-main-500 cursor-pointer"
                        onClick={() => modifHandler(article)}
                      />
                      <TrashIcon
                        className="h-5 text-red-500 cursor-pointer"
                        onClick={() =>
                          setModalDeleteConfirm(!modalDeleteConfirm)
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}

          {user && (
            <tbody>
              {data?.map((item, i) => (
                <tr key={uuidV4()} className="bg-white border-b ">
                  <td className="px-6 py-4">{i}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {item.name}
                  </th>
                  <td className="px-6 py-4">{item.role}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <PencilSquareIcon
                        className="h-5 text-main-500 cursor-pointer"
                        onClick={() => setModalShow(!modalShow)}
                      />
                      <TrashIcon
                        className="h-5 text-red-500 cursor-pointer"
                        onClick={() =>
                          setModalDeleteConfirm(!modalDeleteConfirm)
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <div className="flex justify-between items-center mt-5">
        <div />
        <div>PAGINATION</div>
      </div>

      {modalShow && <ModalArticle setModalShow={setModalShow} articleData={articleData}/>}
      {modalDeleteConfirm && (
        <ConfirmDelete setModalDeleteConfirm={setModalDeleteConfirm} />
      )}
    </div>
  );
};

export default Article;
