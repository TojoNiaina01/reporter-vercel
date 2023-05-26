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

const FormArticle = ({
  header,
  submitBtn,
  setModalShow,
  uploadFile,
  pushBtn,
  listCategories,
  articleData
}) => {
  const lang = [
    {tag: "fr", langue: "français"},
    {tag: "en", langue: "Anglais"},
  ];
  const [selectedMenu, setSelectedMenu] = useState(listCategories[0]);
  const [selectedLang, setSelectedLang] = useState(lang[0]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [descript, setDescript] = useState('');
  const [files, setFiles] = useState();
  var richtextVal = ""
  const richTextHandler = (val) => {
    console.log("tap = ", val)
  }

  const getTitle = (val) => {
    setTitle(val)
  }
  const getDescript = (val) => {
    setDescript(val)
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
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
     
        if(files[0]){
          formData1.append('file', files[0])
        }
        if(files[1]){
          formData2.append('file', files[1])
        }
        if(files[2]){
          formData3.append('file', files[2])
        }

        data.title = title
        data.description = descript
        data.body = value
        data.author = "Mandreshi"
        data.category_id = selectedMenu.id
        data.lang = selectedLang.tag

        for (const prop in data) {
          if(!data[prop]) isEmpty++
        }
        
        if(!isEmpty && value.length !== 11){ // 11 satria io no valeur reef tsis soratra "<p><br></p>"

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
                                                      alert("ok ok ok")
                                                    })
                                              
                                              })
                                            }
                                          })



                                    
                                    })
                                  }
                                })
                              
                      })
                     }

                })
        }
      }else{
        /* -------------------------------------------------------------------------- */
        /*                   REHEFA AO AMIN'NY MODIFICATION ARTICLE                   */
        /* -------------------------------------------------------------------------- */

        
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
  }, [])
  return (
    <>
      <section className={`w-[90%] mx-auto`}>
        <h3 className="text-xl font-semibold tracking-wide mb-4">{header}</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex gap-6 ">
            <div
              className={`flex flex-col gap-4 ${
                uploadFile ? "w-1/2" : "w-full"
              } h-fit`}
            >
              <Input id="titre" label="Titre" required type="text" onChange={getTitle} defaultValue={articleData.title}/>
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
                  label="Enter all of the choices divided by a comma (',')."
                  name="tags"
                  required
                  type="text"
                  defaultValue={""}
                />
              </div>
              {pushBtn && (
                <div className="flex gap-3">
                  <button className="flex items-center bg-main-500 gap-2 text-white p-2 rounded-lg active:scale-95 transition">
                    <BoltIcon className="h-5 text-red-500" />
                    <span>Flash info</span>
                  </button>
                  <button className="flex items-center bg-main-500 gap-2 text-white p-2 rounded-lg active:scale-95 transition">
                    <HomeIcon className="h-5" />
                    <span>Slider</span>
                  </button>
                  <button className="flex items-center bg-main-500 gap-2 text-white p-2 rounded-lg active:scale-95 transition">
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
              className="flex items-center bg-[#555555] text-white font-semibold gap-2 px-4 py-2 rounded-full active:scale-95 shadow-md"
              onClick={() => setModalShow(false)}
            >
              <XMarkIcon className="h-5" />
              <span>Annuler</span>
            </button>
            <button
              className="flex items-center bg-main-500 text-white font-semibold gap-2 px-4 py-2 rounded-full active:scale-95 shadow-md"
            >
              <CheckIcon className="h-5" />
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

