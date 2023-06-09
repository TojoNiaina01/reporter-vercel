import React, { useCallback, useState, useEffect } from "react";
import Input from "@/components/Input";
import UploadFile from "@/components/admin/UploadFile";
import {v4 as uuidV4} from 'uuid'

import {
  BoltIcon,
  CheckIcon,
  FireIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { MenuFR } from "@/constant/constant";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ConfirmAdd from "@/components/ConfirmAdd";
import RichText from "@/components/RichText";
import { ROOT_URL } from "@/env";
import toast, { Toaster } from "react-hot-toast";

const FormArticle = ({
  header,
  submitBtn,
  setModalShow,
  uploadFile,
  pushBtn,
  listCategories,
  articleData,
  dispatchArticle
}) => {
  const lang = [
    {tag: "fr", langue: "français"},
    {tag: "en", langue: "Anglais"},
  ];
  const [selectedMenu, setSelectedMenu] = useState(listCategories[0]);
  const [selectedLang, setSelectedLang] = useState(lang[0]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [value, setValue] = useState('');
  const [title, setTitle] = useState(articleData.title);
  const [author, setAuthor] = useState("");
  const [descript, setDescript] = useState(articleData.description);
  const [hastag, setHastag] = useState()
  const [files, setFiles] = useState();
  const [flash, setFlash] = useState(false)
  const [hot, setHot] = useState(false)
  const [slide, setSlide] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState(false)
  const newArticleData = articleData
  var richtextVal = ""
  const richTextHandler = (val) => {
    console.log("tap = ", val)
  }

  const getTitle = (val) => {
    setTitle(val)
  }
  const getAuthor = (val) => {
    setAuthor(val)
  }
  const getDescript = (val) => {
    setDescript(val)
  }

  const getHastag = (val) => {
    setHastag(val)
  }


  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true)
    const data = {}
    // console.log("selectedMenu == ", selectedMenu)
    // console.log("selectedLang == ", selectedLang)
    // console.log("RichText Value == ", value)
    // console.log("Titre === ", title)
    // console.log("Description === ", descript)

    let formData1 = new FormData()
    let formData2 = new FormData()
    let formData3 = new FormData()
    let isEmpty = 0

    /* -------------------------------------------------------------------------- */
    /*                       REHEFA AO AMIN'NY AJOUT ARTICLE                      */
    /* -------------------------------------------------------------------------- */
    if(!pushBtn){  //condition oe reef ao amin'ny ajout article
     
      if(files){
        if(files[0]){
          formData1.append('file', files[0])
        }
        if(files[1]){
          formData2.append('file', files[1])
        }
        if(files[2]){
          formData3.append('file', files[2])
        }
      }

    

        data.title = title
        data.description = descript
        data.author = author
        data.body = value
        data.category_id = selectedMenu.id
        data.lang = selectedLang.tag

        for (const prop in data) {
          if(!data[prop]) isEmpty++
        }
        
        if(!isEmpty && value.length !== 11){ // 11 satria io no valeur reef tsis soratra "<p><br></p>"

          if(files){
            setStatus(false)
            const param = {query: 'addArticle', param: [data]}
              fetch(`${ROOT_URL}/api/knexApi`, {
                method: "POST",
                body: JSON.stringify(param),
                headers: {
                  "Content-type" : "application/json"
                }
              }).then((res) => res.json())
                .then(article => {

                    /* -------------------------------------------------------------------------- */
                    /*                                HASTAG SYSTEM                               */
                    /* -------------------------------------------------------------------------- */

                    const hastag_articles = []

                    if(hastag){
                      const tabHastag = hastag.trim().split(",")
                      const listHastag = tabHastag.map((hastag) => {
                        return hastag.trim()
                      })
                      console.log("hastag liste == ", listHastag)
                      const paramHastag = {query: 'addHastag', param: [listHastag, selectedLang.tag]}
                            fetch(`${ROOT_URL}/api/knexApi`, {
                              method: "POST",
                              body: JSON.stringify(paramHastag),
                              headers: {
                                "Content-type" : "application/json"
                              }
                            }).then((res) => res.json())
                            .then(data => {
                              console.log("les id de hastag == ", data)
                              data.result.forEach((hastagID) => {
                                hastag_articles.push({article_id: article.result[0].id, hastag_id: hastagID})
                              })


                              /* -------------------------------------------------------------------------- */
                              /*                            AJOUT HASTAG ARTICLE                            */
                              /* -------------------------------------------------------------------------- */

                              const paramHastagArticle = {query: 'addHastagArticle', param: [hastag_articles]}
                              fetch(`${ROOT_URL}/api/knexApi`, {
                                method: "POST",
                                body: JSON.stringify(paramHastagArticle),
                                headers: {
                                  "Content-type" : "application/json"
                                }
                              }).then((res) => res.json())
                              .then(data => {
                                alert("ajout hastag ok ok")
                              })

                            })


                    }

                    /* ------- *********************************************************** ------ */

                    /* -------------------------------------------------------------------------- */
                    /*                        mi-upload ny image voalohany                        */
                    /* -------------------------------------------------------------------------- */
                     if(files[0]){
                      fetch(`${ROOT_URL}/api/upload`, {   ///mi-ajout ny image 1 
                        method: "POST",
                        body: formData1,
                        "content-type": "multipart/form-data"
                      }).then(res => res.json())
                      .then(data => {

                              const image1 = {article_id: article.result[0].id, ...data.result}
                            /* ----------------------------- ajout ao am DBB ndray ---------------------------- */
                              const param1 = {query: 'addImage', param: [image1]}
                              fetch(`${ROOT_URL}/api/knexApi`, {
                                method: "POST",
                                body: JSON.stringify(param1),
                                headers: {
                                  "Content-type" : "application/json"
                                }
                              }).then((res) => res.json())
                                .then(data => {

                                  /* -------------------------------------------------------------------------- */
                                  /*                   mi-upload ny image 2 indray ra mi-exist                  */
                                  /* -------------------------------------------------------------------------- */
                                  if(files[1]){
                                    fetch(`${ROOT_URL}/api/upload`, {   ///mi-ajout ny image 2
                                      method: "POST",
                                      body: formData2,
                                      "content-type": "multipart/form-data"
                                    }).then(res => res.json())
                                    .then(data2 => {

                                      const image2 = {article_id: article.result[0].id, ...data2.result}
                                      /* ----------------------------- ajout ao am DBB ndray ---------------------------- */
                                        const param2 = {query: 'addImage', param: [image2]}
                                        fetch(`${ROOT_URL}/api/knexApi`, {
                                          method: "POST",
                                          body: JSON.stringify(param2),
                                          headers: {
                                            "Content-type" : "application/json"
                                          }
                                        }).then((res) => res.json())
                                          .then(data => {


                                            /* -------------------------------------------------------------------------- */
                                            /*                             mi-ajout ny image 3                            */
                                            /* -------------------------------------------------------------------------- */
                                            if(files[2]){
                                              fetch(`${ROOT_URL}/api/upload`, {  ///mi-ajout ny image 3
                                                method: "POST",
                                                body: formData3,
                                                "content-type": "multipart/form-data"
                                              }).then(res => res.json())
                                              .then(data3 => {

                                                const image3 = {article_id: article.result[0].id, ...data3.result}
                                                /* ----------------------------- ajout ao am DBB ndray ---------------------------- */
                                                  const param3 = {query: 'addImage', param: [image3]}
                                                  fetch(`${ROOT_URL}/api/knexApi`, {
                                                    method: "POST",
                                                    body: JSON.stringify(param3),
                                                    headers: {
                                                      "Content-type" : "application/json"
                                                    }
                                                  }).then((res) => res.json())
                                                    .then(result => {
                                                     setIsLoading(false)
                                                     window.location = ROOT_URL

                                                    })
                                              
                                              })
                                            }else{
                                              setIsLoading(false)
                                            }
                                          })



                                    
                                    })
                                  }else{
                                    setIsLoading(false)
                                  }
                                })
                              
                      })
                     }

                })
            }else{
              toast.error("Image obligatoire")
              setIsLoading(false)
            }
          }else{
            toast.error("Tous les champs sont obligatoire")
            setIsLoading(false)
          }
      }else{
        /* -------------------------------------------------------------------------- */
        /*                   REHEFA AO AMIN'NY MODIFICATION ARTICLE                   */
        /* -------------------------------------------------------------------------- */

        console.log('articleData.title == ', articleData.title)
        console.log('title == ', title)
        console.log('articleData.description == ', articleData.description)
        console.log('Description == ', descript)
        console.log('articleData.body == ', articleData.body)
        console.log('body == ', value)

        if(title && descript && value){
          const modifData = {
            id: articleData.id,
            title: title,
            description: descript,
            body: value,
            category_id: selectedMenu.id,
            lang: selectedLang.tag
          }

          const paramModif = {query: 'updateArticle', param: [modifData]}
          fetch(`${ROOT_URL}/api/knexApi`, {
            method: "POST",
            body: JSON.stringify(paramModif),
            headers: {
              "Content-type" : "application/json"
            }
          }).then((res) => res.json())
            .then((data) => {
              newArticleData.title = title
              newArticleData.description = descript
              newArticleData.body = value
              newArticleData.lang = selectedLang.tag
              newArticleData.category_en = selectedMenu.en
              newArticleData.category_fr = selectedMenu.fr
              dispatchArticle({type: 'ONECHANGE', result: newArticleData}) // pour changer instantanément la liste article

              setIsLoading(false)
              setModalShow(false)
            })

        }else{
          setIsLoading(false)
        }

      }
   
    

    // await fetch("/api/upload", {
    //   method: "POST",
    //   body: formData,
    //   "content-type": "multipart/form-data"
    // }).then(res => res.json())
    // .then(data => console.log("ajout test data file réussi"))
  };

  const toggleConfirmModal = useCallback(() => {
    setConfirmModal(!confirmModal);
  }, [confirmModal]);


  useEffect(() => {
    setValue(articleData.body)
    setFlash(articleData.flash)
    setHot(articleData.hot)
    setSlide(articleData.slide)

    if(articleData.category_en){
      setSelectedMenu(listCategories.find(item => item.en === articleData.category_en))
    }

    // if(articleData.lang){
    //   setSelectedMenu(lang.find(item => item.tag === articleData.lang))
    // }
  }, [])

  const flashStyle = flash ? "bg-red-600" : "bg-main-500"
  const hotStyle = hot ? "bg-orange-600" : "bg-main-500"
  const slideStyle = slide ? "bg-blue-600" : "bg-main-500"

  const flashHandler = () => {
    const param = {query: 'checkFlash', param: [true, 'fr']}
    fetch(`${ROOT_URL}/api/knexApi`, {
      method: "POST",
      body: JSON.stringify(param),
      headers: {
        "Content-type" : "application/json"
      } 
    }).then((res) => res.json())
    .then(data => {
      const numberOfFlash = data.result[0].flash
      if(numberOfFlash > 3 && !flash){
        toast.error('Nombre maximal atteint!')
      }else{
        const flashParam = {query: 'updateFlash', param: [articleData.id,!flash]}
        fetch(`${ROOT_URL}/api/knexApi`, {
          method: "POST",
          body: JSON.stringify(flashParam),
          headers: {
            "Content-type" : "application/json"
          }
        }).then((res) => res.json())
          .then(data => {
            toast.success("mise à jour réussi avec succès!")
            newArticleData.flash = !flash
           dispatchArticle({type: 'ONECHANGE', result: newArticleData})
            setFlash(!flash)
          })
      }
    })
  }


  const slideHandler = () => {
    const param = {query: 'checkSlide', param: [true, 'fr']}
    fetch(`${ROOT_URL}/api/knexApi`, {
      method: "POST",
      body: JSON.stringify(param),
      headers: {
        "Content-type" : "application/json"
      }
    }).then((res) => res.json())
    .then(data => {
      const numberOfSlide = data.result[0].slide
      if(numberOfSlide >= 4 && slide){
        toast.error('Nombre maximal atteint!')
      }else{
        const slideParam = {query: 'updateSlide', param: [articleData.id,!slide]}
        fetch(`${ROOT_URL}/api/knexApi`, {
          method: "POST",
          body: JSON.stringify(slideParam),
          headers: {
            "Content-type" : "application/json"
          }
        }).then((res) => res.json())
          .then(data => {
            toast.success("mise à jour réussi avec succès!")
            newArticleData.slide = !slide
            dispatchArticle({type: 'ONECHANGE', result: newArticleData})
            setSlide(!slide)
          })
      }
    })
  }
  const hotHandler = () => {
    const param = {query: 'checkHot', param: [true, 'fr']}
    fetch(`${ROOT_URL}/api/knexApi`, {
      method: "POST",
      body: JSON.stringify(param),
      headers: {
        "Content-type" : "application/json"
      }
    }).then((res) => res.json())
    .then(data => {
      const numberOfHot = data.result[0].hot
      if(numberOfHot >= 1 && !hot){
        toast.error('Nombre maximal atteint!')
      }else{
        const hotParam = {query: 'updateHot', param: [articleData.id,!hot]}
        fetch(`${ROOT_URL}/api/knexApi`, {
          method: "POST",
          body: JSON.stringify(hotParam),
          headers: {
            "Content-type" : "application/json"
          }
        }).then((res) => res.json())
          .then(data => {
            toast.success("mise à jour réussi avec succès!")
            newArticleData.hot = !hot
            dispatchArticle({type: 'ONECHANGE', result: newArticleData})
            setHot(!hot)
          })
      }
    })
  }


  return (
    <>
      <section className={`w-[90%] mx-auto`}>
        <h3 className=" text-xl font-semibold tracking-wide mb-4">{header}</h3>
        <Toaster toastOptions={{
          className: 'text-sm'
        }}/>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex gap-6 ">
            <div
              className={`flex flex-col gap-4 ${
                uploadFile ? "w-1/2" : "w-full"
              } h-fit`}
            >
              <Input id="titre" label="Titre" required type="text" onChange={getTitle} defaultValue={articleData.title} status={status}/>
              <Input
                id="description"
                required
                type="text"
                name="description"
                textarea
                placeholder="Description"
                onChange={getDescript}
                defaultValue={articleData.description}
              />
              {!pushBtn && <Input id="auteur" label="Auteur" required type="text" onChange={getAuthor} defaultValue={""} />}

              <div className="flex gap-4 w-full">
                <Listbox value={selectedMenu} onChange={setSelectedMenu}>
                  <div className="flex flex-col relative w-full">
                    <Listbox.Button className="text-main-500 flex justify-between items-center border rounded-full p-4 border-main-500">
                      <p className="">{selectedMenu.fr}</p>
                      <ChevronDownIcon className="block h-4" />
                    </Listbox.Button>
                    <Listbox.Options className="absolute top-16 border border-main-500 p-2 z-40  rounded-md shadow-md bg-white">
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
                <Listbox value={selectedLang} onChange={setSelectedLang}>
                  <div className="flex flex-col relative w-full">
                    <Listbox.Button className="text-main-500 flex justify-between items-center border rounded-full p-4 border-main-500">
                      <p className="">{selectedLang.langue}</p>
                      <ChevronDownIcon className="block h-4" />
                    </Listbox.Button>
                    <Listbox.Options className="absolute top-16 border border-main-500 p-2 z-40  rounded-md shadow-md bg-white">
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
              </div>
              <div>
                <Input
                  id="tags"
                  label="#Hashtag séparé par virgule(,)"
                  name="tags"
                  required
                  type="text"
                  onChange={getHastag}
                  defaultValue={""}
                />
              </div>
              {pushBtn && (
                <div className="flex gap-3">
                  <button type="button" className={`flex items-center ${flashStyle} gap-2 text-white p-2 rounded-lg active:scale-95 transition`} onClick={flashHandler}>
                    <BoltIcon className="h-5" />
                    <span>Flash info</span>
                  </button>
                  <button type="button" className={`flex items-center ${slideStyle} gap-2 text-white p-2 rounded-lg active:scale-95 transition`} onClick={slideHandler}>
                    <HomeIcon className="h-5" />
                    <span>Slider</span>
                  </button>
                  <button type="button" className={`flex items-center ${hotStyle} gap-2 text-white p-2 rounded-lg active:scale-95 transition`} onClick={hotHandler}>
                    <FireIcon className="h-5" />
                    <span>Hot staff</span>
                  </button>
                </div>
              )}
            </div>

            {uploadFile && (
              <div className="flex-1">
                <UploadFile onChangeFile={setFiles}/>
              </div>
            )}
          </div>

          {/* rich text content */}
          <RichText theme="snow" value={value} setValue={setValue}/>

          <div className="flex gap-12 mt-8">
            <button
              type="button"
              className="flex items-center bg-[#555555] text-white font-semibold gap-2 px-4 py-2 rounded-full active:scale-95 shadow-md"
              onClick={() => setModalShow(false)}
              disabled={isLoading}
            >
              <XMarkIcon className="h-5" />
              <span>Annuler</span>
            </button>
            <button
              type="submit"
              className={`flex items-center ${isLoading ? 'bg-gray-400' : 'bg-main-500'} text-white font-semibold gap-2 px-4 py-2 rounded-full active:scale-95 shadow-md`}
              disabled={isLoading}
           >
              
              {isLoading ? (<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>) : <CheckIcon className="h-5" />}

              <span>{submitBtn}</span>
            </button>
          </div>
        </form>

        {confirmModal && <ConfirmAdd setConfirmModal={setConfirmModal} />}
      </section>
    </>
  );
};

export default FormArticle;

