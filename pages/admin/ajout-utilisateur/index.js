import React, { useState } from "react";
import { Logo } from "@/public/assets/img";
import Input from "@/components/Input";
import Image from "next/image";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { v4 as uuidv4 } from "uuid";
import { getCookie } from "cookies-next";
import Jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ROOT_URL } from "@/env";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

const AddUser = () => {
  const router = useRouter()
  const roles = ["admin", "editeur"];
  const [selectedMenu, setSelectedMenu] = useState(roles[0]);
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [pass, setPass] = useState()
  const [confirmPass, setConfirmPass] = useState()
  const [err, setErr] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const checkEmail = new RegExp(/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/);

  const getName = (val) => {
    setName(val)
  }
  const getEmail = (val) => {
    setEmail(val)
  }
  const getPass = (val) => {
    setPass(val)
  }
  const getConfirmPass = (val) => {
    setConfirmPass(val)
  }

const addUserHandler = async(e) => {
  e.preventDefault()
  setIsLoading(true)
  const data = {}
  let isEmpty = 0

  data.name = name
  data.email = email
  data.pass = pass
  data.confirmPass = confirmPass

  for (const prop in data) {
    if(!data[prop]) isEmpty++
  }

  if(!isEmpty){
    if(checkEmail.test(email)){
      if(pass === confirmPass){
        const saltPassword = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(pass, saltPassword)

        /* ---------------- recherche-na ra efa mi-existe ilay email ---------------- */
        const paramFind = {query: 'checkMail', param: [email]}
        fetch(`${ROOT_URL}/api/knexApi`, {
          method: "POST",
          body: JSON.stringify(paramFind),
          headers: {
            "Content-type" : "application/json"
          }
        }).then((res) => res.json())
        .then(user => {

          if(!user.result[0].email){

            const payload = {
              type: selectedMenu,
              name: name,
              email: email
            }

            const token = Jwt.sign(payload, "GOvina@@123")

            const user = {
              name: name,
              email: email,
              password: passwordHash,
              type: selectedMenu,
              token: token
            }

            /* -------------------------------------------------------------------------- */
            /*                          AJOUT USER AVEC SON TOKEN                         */
            /* -------------------------------------------------------------------------- */
            const paramUser = {query: 'addUser', param: [user]}
            fetch(`${ROOT_URL}/api/knexApi`, {
              method: "POST",
              body: JSON.stringify(paramUser),
              headers: {
                "Content-type" : "application/json"
              }
            }).then((res) => res.json())
              .then(data => {
                toast.success("Ajout utilisateur avec succès!")
                router.push("/admin/listes-utilisateur")
                
              })

           
          }else{
            setIsLoading(false)
            setErr("Cette Email est déjà utilisé")
          }
          console.log("user === ", user)
        })

      }else{
        setIsLoading(false)
        setErr("Confirmation password erreur")
      }

    }else{
      setIsLoading(false)
      setErr("Email non valide")
    }

  }else{
    setIsLoading(false)
    setErr("Tous les champs sont obligatoire")
  }
}
  return (
    <div className="w-full ">
       <Toaster toastOptions={{
          className: 'text-sm'
        }}/>
      <div className="relative mx-auto w-[450px] rounded-lg bg-white">
        <Image src={Logo} className="mb-4 object-cover" alt="Logo" />

        <p className="text-red-700 text-center mb-2">{err}</p>
        <form className="space-y-4" onSubmit={addUserHandler}>
          <Input id="username" label="Nom d'utilisateur" required type="text" onChange={getName} />
          <Input id="email" label="Email" required type="email" onChange={getEmail}/>
          <Input id="password" label="Password" required type="password" onChange={getPass}/>
          <Input id="password" label="Confirm password" required type="password" onChange={getConfirmPass}/>
          <Listbox value={selectedMenu} onChange={setSelectedMenu}>
            <div className="relative flex flex-col">
              <Listbox.Button className="flex items-center justify-between gap-4 rounded-full border border-main-500 p-4 text-main-500">
                <p className="">{selectedMenu}</p>
                <ChevronDownIcon className="block h-4" />
              </Listbox.Button>
              <Listbox.Options className=" absolute top-12 rounded-md border border-main-500 bg-white p-2 shadow-md">
                {roles?.map((person) => (
                  <Listbox.Option
                    key={uuidv4()}
                    value={person}
                    className="cursor-pointer rounded-lg px-2 py-1 ui-active:bg-main-500 ui-active:text-white"
                  >
                    {person}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
          <button className={`flex justify-center items-start w-full rounded  ${isLoading ? 'bg-gray-400' : 'bg-main-500'} p-4 font-semibold text-white`} disabled={isLoading}>
          {isLoading && (<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>)}
            Ajout Editeur
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;

export async function getServerSideProps({req, res}){

  if(!getCookie('token_', {req, res})){
    return {
      redirect: {
        destination: "/admin/login"
      }
    }
  }
 
      return {
        props: {
          listCategories: "listCategories.result"
        }
      }
  }