import React, { useMemo, useState } from "react";
import Input from "@/components/Input";
import UploadFile from "@/components/admin/UploadFile";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {v4 as uuidv4} from "uuid"
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";
import { ROOT_URL } from "@/env";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import { useRouter } from "next/navigation";


const adsFilter = (data, format) => {
  return data.filter(ads => ads.format === format)
}
const FormAds = ({ submitBtn, setModalShow, header, listAds }) => {
  const router = useRouter()
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [files, setFiles] = useState()
  const [title, setTitle] = useState()
  const [link, setLink] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [listAdsPerFormat, setListAdsPerFormat] = useState(adsFilter(listAds, "horizontale"))



  const disableDates = useMemo(() => {
      let dates = []

      listAdsPerFormat.forEach((ads) => {
        const range = eachDayOfInterval({
          start: new Date(ads.date_start),
          end: new Date(ads.date_end)

        })

        dates = [...dates, ...range]
      })
      console.log("date == ", dates)
      return dates
  },[listAdsPerFormat])

  const getTitle = (val) => {
    setTitle(val)
  }

  const getLink = (val) => {
    setLink(val)
  }
  const menu = [
    { k: 1, name: "horizontale" },
    { k: 2, name: "verticale" },
  ];
  const [selectedMenu, setSelectedMenu] = useState(menu[0]);
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const formatHandler = (val) => {
    setSelectedMenu(val)
    setListAdsPerFormat(adsFilter(listAds, val.name))
  }

  const addAdsHandler = async(e) => {
      e.preventDefault()
      const image = new Image()
      let isEmpty = 0
      let widthImg 
      let heightImg
    setIsLoading(true)
      const data = {}
      data.title = title
      data.link = link

      for (const prop in data) {
        if(!data[prop]) isEmpty++
      }

      if(!isEmpty){

         if(files){

          if(startDate !== endDate){
            
          let formData1 = new FormData()
          formData1.append('file', files[0])

              image.src = URL.createObjectURL(files[0])
             image.addEventListener('load', () => {
                widthImg = image.naturalWidth;
                heightImg = image.naturalHeight;

                if(selectedMenu.name === "horizontale"){

                  console.log("width == ",widthImg)
                  console.log("height == ", heightImg)
                          if(widthImg >= 1000 && widthImg <= 1402 && heightImg >=300 && heightImg <= 400){
      
                            if(startDate !== endDate){
      
                              const dataAds = {
                                title: title,
                                link: link,
                                format: selectedMenu.name,
                                date_start: moment(startDate).format("YYYY-MM-DD hh:mm:ss"),
                                date_end: moment(endDate).format("YYYY-MM-DD hh:mm:ss")
                              }
      
                                const paramAds = {query: 'addAds', param: [dataAds]}
                                fetch(`${ROOT_URL}/api/knexApi`, {
                                  method: "POST",
                                  body: JSON.stringify(paramAds),
                                  headers: {
                                    "Content-type" : "application/json"
                                  }
                                }).then((res) => res.json())
                                  .then(ads => {
      
                                        fetch(`${ROOT_URL}/api/upload`, {   ///mi-ajout ny image 1 
                                          method: "POST",
                                          body: formData1,
                                          "content-type": "multipart/form-data"
                                        }).then(res => res.json())
                                        .then((data) => {
      
                                          const image1 = {ads_id: ads.result[0].id, ...data.result}
                                          /* ----------------------------- ajout ao am DBB ndray ---------------------------- */
                                            const param1 = {query: 'addImageAds', param: [image1]}
                                            fetch(`${ROOT_URL}/api/knexApi`, {
                                              method: "POST",
                                              body: JSON.stringify(param1),
                                              headers: {
                                                "Content-type" : "application/json"
                                              }
                                            }).then((res) => res.json())
                                            .then(data => {
                                              toast.success("Ajout Ads réussi")
                                              setIsLoading(false)
                                              router.refresh()
                                            })
                                        })
                                  })
                            }else{
                              toast.error("Deux jours minimum")
                            }
      
                        }else{
                          setIsLoading(false)
                          toast.error("La taille de l'image ne correspond pas aux spécifications requises")
                        }
                }else{
                      if(widthImg >= 300 && widthImg <= 400 && heightImg >=600 && heightImg <= 650){
      
                        if(startDate !== endDate){
      
                          const dataAds = {
                            title: title,
                            link: link,
                            format: selectedMenu.name,
                            date_start: moment(startDate).format("YYYY-MM-DD hh:mm:ss"),
                            date_end: moment(endDate).format("YYYY-MM-DD hh:mm:ss")
                          }
      
                            const paramAds = {query: 'addAds', param: [dataAds]}
                            fetch(`${ROOT_URL}/api/knexApi`, {
                              method: "POST",
                              body: JSON.stringify(paramAds),
                              headers: {
                                "Content-type" : "application/json"
                              }
                            }).then((res) => res.json())
                              .then(ads => {
      
                                    fetch(`${ROOT_URL}/api/upload`, {   ///mi-ajout ny image 1 
                                      method: "POST",
                                      body: formData1,
                                      "content-type": "multipart/form-data"
                                    }).then(res => res.json())
                                    .then((data) => {
      
                                      const image1 = {ads_id: ads.result[0].id, ...data.result}
                                      /* ----------------------------- ajout ao am DBB ndray ---------------------------- */
                                        const param1 = {query: 'addImageAds', param: [image1]}
                                        fetch(`${ROOT_URL}/api/knexApi`, {
                                          method: "POST",
                                          body: JSON.stringify(param1),
                                          headers: {
                                            "Content-type" : "application/json"
                                          }
                                        }).then((res) => res.json())
                                        .then(data => {
                                          toast.success("Ajout Ads réussi")
                                          setIsLoading(false)
                                          router.refresh()
                                        })
                                    })
                              })
                        }else{
                          toast.error("Deux jours minimum")
                        }
      
                    }else{
                      setIsLoading(false)
                      toast.error("La taille de l'image ne correspond pas aux spécifications requises")
                    }
                }

            })

          }else{
            toast.error("Deux jours minimum")
          setIsLoading(false)
          }
          

         }else{
          toast.error("Image obligatoire")
          setIsLoading(false)
         }

      }else{
        toast.error("Tous les champs sont obligatoire")
        setIsLoading(false)
      }

  }

  return (
    <section className="w-[90%] mx-auto">
      <Toaster toastOptions={{
          className: 'text-sm'
        }}/>
      <h3 className="text-xl font-semibold tracking-wide py-2">{header}</h3>
      <form onSubmit={addAdsHandler}>
        <div className="flex gap-6">
          <div className="flex flex-col gap-4 w-1/2 h-fit">
            <Input id="titre" label="Titre CPM" required type="text" onChange={getTitle}/>
            <Input id="lien" label="Lien de redirection" required type="text" onChange={getLink}/>
            <div className="mx-auto">
              <DateRange
                ranges={[selectionRange]}
                minDate={new Date()}
                rangeColors={["#659a97"]}
                onChange={handleSelect}
                showMonthAndYearPickers={false}
                showDateDisplay={false}
                disabledDates={disableDates}
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 flex-1">
            <Listbox value={selectedMenu} onChange={formatHandler}>
              <div className="flex flex-col  relative">
                <Listbox.Button className="text-main-500 flex justify-between gap-4 items-center border rounded-full px-4 py-2 border-main-500">
                  <p className="">{selectedMenu.name}</p>
                  <ChevronDownIcon className="block h-4" />
                </Listbox.Button>
                <Listbox.Options className=" absolute top-12 border border-main-500 p-2 rounded-md shadow-md bg-white">
                  {menu.map((person) => (
                    <Listbox.Option
                      key={uuidv4()}
                      value={person}
                      className="ui-active:bg-main-500 rounded-lg px-2 py-1 cursor-pointer ui-active:text-white"
                    >
                      {person.name}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
            {/* Upload file */}
            <UploadFile onChangeFile={setFiles} isMultiple={false} ads selectedMenu={selectedMenu.name}/>
          </div>
        </div>
        <div className="flex gap-12 mt-8">
          <button
            className="flex items-center bg-[#555555] text-white font-semibold gap-2 px-4 py-2 rounded-full active:scale-95 shadow-md"
            onClick={() => setModalShow(false)}
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
    </section>
  );
};

export default FormAds;
