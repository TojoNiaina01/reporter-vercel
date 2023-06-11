import React, {useState, useEffect} from "react";
import { Jost } from "next/font/google";
import useMediaQuery from "@/hook/useMediaQuery";
import Image from "next/image";
import { NewsletterImg } from "@/public/assets/img";
import { useRouter } from "next/navigation";
import localStorage from "localStorage";
import toast, { Toaster } from "react-hot-toast";
import { ROOT_URL } from "@/env";

const jost = Jost({ subsets: ["latin"], weight: "500" });

const NewLetter = () => {
  const router = useRouter()
  const [followers, setFollowers] = useState()
  const [tag, setTag] = useState("subscribe")
  const [titleTag, setTitleTag] = useState("Stay Up To Date!")
  const storage = JSON.parse(localStorage.getItem("token"))
  const isAboveScreen = useMediaQuery("(min-width: 1024px)");

  const subscribeHandler = () => {
    const checkEmailReg = new RegExp(/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/)
    if(followers){
      if(checkEmailReg.test(followers)){
        const param = {query: 'addFollowers', param: [followers]}
        fetch(`${ROOT_URL}/api/knexApi`, {
          method: "POST",
          body: JSON.stringify(param),
          headers: {
            "Content-type" : "application/json"
          }
        }).then((res) => res.json())
        .then(data => {
          router.refresh()
        })
      }else{
        if(storage.lang === "fr"){
          toast.error("Email non valide")
        }else{
          toast.error("Email not valid")
        }
        
      }
    }
  }

  useEffect(() => {
    if(storage.lang === "fr"){
      setTag("s'abonner")
      setTitleTag("Nous suivre!")
    }
  })

  return (
    <section className="mt-10 mx-4 lg:w-full lg:mx-0 lg:relative">
        <Toaster toastOptions={{
          className: 'text-sm'
        }}/>
      {isAboveScreen && <Image src={NewsletterImg} alt="Newletter graphics" />}
      <div className="lg:absolute top-4 left-10 w-full xl:top-12">
        <h6 className={` text-2xl leading-7 ${jost.className} lg:text-4xl`}>
          {titleTag} <br /> {tag}!
        </h6>
        <div className="w-full flex gap-4 lg:w-[40%]">
        <input
            type="text"
            placeholder="Your Email"
            className=" w-72 border-b-2 border-black text-sm outline-none focus:border-main-500 text-main-700 bg-transparent md:w-[50%] lg:w-full lg:text-base 2xl:text-base"
            value={followers}
            onChange={(e) => setFollowers(e.target.value)}
          />
          <button onClick={subscribeHandler} className="bg-black text-sm text-white uppercase px-5 py-4 rounded-full shadow-md active:scale-95 transition duration-150 ease-in-out">
           {tag}
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewLetter;
