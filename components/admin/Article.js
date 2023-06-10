import { useState, useRef, useEffect } from "react";
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
import Paginate from "@/components/Paginate";


const Article = ({ header, tabhead, data, user, listArticles, listCategories, dispatchArticle, listUsers }) => {
  const lang = [
    {tag: "fr", langue: "français"},
    {tag: "en", langue: "Anglais"},
  ];
  const [selectedMenu, setSelectedMenu] = useState(listCategories[0]);
  const [selectedLang, setSelectedLang] = useState(lang[0]);
  const [modalShow, setModalShow] = useState(false);
  const [articleData, setArticleData] = useState()
  const [modalDeleteConfirm, setModalDeleteConfirm] = useState(false);

  /* -------------------------------- list user ------------------------------- */
  const [listNewUsers, setListNewUsers] = useState(listUsers)

   /* ------------------------------- pagination ------------------------------- */
   const [itemOffset, setItemOffset] = useState(null)
   const [currentArticles, setCurrentArticles] = useState()
   const itemsPerPage = 6
   const handlerPageClick = (e) => {
     const newOffset = (e.selected * itemsPerPage) % listArticles.length;
     setItemOffset(newOffset)
   }

   useEffect(() => {
    const endOffset = itemOffset + itemsPerPage
    setCurrentArticles(listArticles.slice(itemOffset, endOffset))
   },[itemOffset, itemsPerPage, listArticles])


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

const supprArticles = async (article) => {
  const image = article.image
 if(image[0].image_id){
  console.log("image == ", image)
  for(const key in image){
    const paramDelImage = {query: 'deleteImage', param: [image[key].image_id]}
    await fetch(`${ROOT_URL}/api/knexApi`, {
      method: "POST",
      body: JSON.stringify(paramDelImage),
      headers: {
        "Content-type" : "application/json"
      }
    }).then((res) => res.json())
      .then(data => {
        const dataImg = {
          name: image[key].image_name,
          extension: image[key].image_extension
        }


          fetch(`${ROOT_URL}/api/deleteFile`, {
            method: "POST",
            body: JSON.stringify(dataImg),
            headers: {
              "Content-type" : "application/json"
            }
          }).then((res) => res.json())
            .then(data => {
              console.log(`suppression image ${image[key].image_id}`)
            })
        
        
      })
  }
 }

  const paramDelArticle = {query: 'deleteArticle', param: [article.id]}
  await fetch(`${ROOT_URL}/api/knexApi`, {
    method: "POST",
    body: JSON.stringify(paramDelArticle),
    headers: {
      "Content-type" : "application/json"
    }
  }).then((res) => res.json()) 
   .then(data => {
      console.log("article id == ", article.id)
        console.log("selectedMenu.id == ", selectedMenu.id)
        console.log("selectedLang.tag == ", selectedLang.tag)
        const paramNewListArticles = {query: 'getArticleByCategoryLang', param: [selectedMenu.id, selectedLang.tag]}
        fetch(`${ROOT_URL}/api/knexApi`, {
          method: "POST",
          body: JSON.stringify(paramNewListArticles),
          headers: {
            "Content-type" : "application/json"
          }
        }).then((res) => res.json())
        .then(newListUsers => {
          console.log("suppression article")
          dispatchArticle({type: 'ALLCHANGE', result: newListUsers.result})
        })
   })
}



const deleteUserHandler = (userID) => {
  const userElement = document.getElementById(`user${userID}`)
  userElement.classList.add("opacity-30")

          const paramUser = {query: 'deleteUser', param: [userID]}
          fetch(`${ROOT_URL}/api/knexApi`, {
            method: "POST",
            body: JSON.stringify(paramUser),
            headers: {
              "Content-type" : "application/json"
            }
          }).then((res) => res.json())
          .then(user => {
            const paramNewList = {query: 'getUsers', param: false}
            fetch(`${ROOT_URL}/api/knexApi`, {
              method: "POST",
              body: JSON.stringify(paramNewList),
              headers: {
                "Content-type" : "application/json"
              }
            }).then((res) => res.json())
            .then(newListUsers => {
              setListNewUsers(newListUsers.result)
            })
          })
    }

    const deleteArticleHandler = (articleID) => {
      const articleElement = document.getElementById(`article${articleID}`)
      articleElement.classList.add("opacity-30")

      const paramArticle = {query: 'getArticle', param: [articleID]}
      fetch(`${ROOT_URL}/api/knexApi`, {
        method: "POST",
        body: JSON.stringify(paramArticle),
        headers: {
          "Content-type" : "application/json"
        }
      }).then((res) => res.json())
        .then(article => {
            supprArticles(article.result[0])
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
              {currentArticles?.map((article) => (
                <tr id={`article${article.id}`} key={uuidV4()} className="bg-white border-b ">
                  <td className="px-6 py-4">{article.id}</td>
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
                          deleteArticleHandler(article.id)
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
              {listNewUsers?.map((user) => (
                <tr id={`user${user.id}`} key={uuidV4()} className="bg-white border-b ">
                  <td className="px-6 py-4">{user.id}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {user.name}
                  </th>
                  <td className="px-6 py-4">{user.type.toUpperCase()}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <TrashIcon
                        className="h-5 text-red-500 cursor-pointer"
                        onClick={() => deleteUserHandler(user.id)}
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
        <div>
        {
              listArticles.length > 6 && <Paginate itemsPerPage={itemsPerPage} handlerPage={handlerPageClick} items={listArticles}/>
          }
        </div>
      </div>

      {modalShow && <ModalArticle setModalShow={setModalShow} articleData={articleData}/>}
      {modalDeleteConfirm && (
        <ConfirmDelete setModalDeleteConfirm={setModalDeleteConfirm} />
      )}
    </div>
  );
};

export default Article;
