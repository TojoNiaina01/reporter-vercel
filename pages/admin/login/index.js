import React, {useState} from "react";
import Image from "next/image";
import { Logo } from "@/public/assets/img";
import Input from "@/components/Input";
import Link from "next/link";
import { Jost } from "next/font/google";
import { ROOT_URL } from "@/env";
import { useDispatch } from "react-redux";
import { loginUser } from "@/config/redux/auth/authAction";
import bcrypt from "bcryptjs";

const jost = Jost({ subsets: ["latin"], weight: "500" });

const Login = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const checkEmailReg = new RegExp(/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/)
  const [err, setErr] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const getPassword = (val) => {
    setPassword(val)
  }
  const getEmail = (val) => {
    setEmail(val)
  }

  const loginHandler = (e) => {
    e.preventDefault()
    setIsLoading(true)
    let data = {}
    let isEmpty = 0

    data.password = password
    data.email = email

    for (const prop in data) {
      if(!data[prop]) isEmpty++
    }

    if(!isEmpty){
      if(checkEmailReg.test(email)){
        const paramFind = {query: 'findUser', param: [email]}
        fetch(`${ROOT_URL}/api/knexApi`, {
          method: "POST",
          body: JSON.stringify(paramFind),
          headers: {
            "Content-type" : "application/json"
          }
        }).then((res) => res.json())
        .then(user => {
          if(user.result.length){
            bcrypt.compare(password, user.result[0].password, (err, res) => {
              if(res){
                dispatch(loginUser(user.result[0]))
                setIsLoading(false)
                window.location = `${ROOT_URL}/admin/listes-article`
              }else{
                setErr("Mot de passe incorrect")
                setIsLoading(false)
              }
            })
          }else{
            setErr("Cette Email n'a pas de compte")
            setIsLoading(false)
          }
        })
      }else{
        setErr("Email incorrect")
        setIsLoading(false)
      }
    }else{
      setErr("Tous les champs sont obligatoire!")
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0  bg-main-400 flex  justify-center items-center">
      <div className="w-[450px] bg-white p-14 md:p-10 rounded-lg">
        <Image src={Logo} className="object-cover " alt="Logo" />
        <p className="text-red-700 text-sm mb-2 text-center">{err}</p>
        <form className="space-y-4" onSubmit={loginHandler}>
          <Input id="email" label="Email" required type="email" onChange={getEmail}/>
          <Input
            id="password"
            label="Password"
            required
            type="password"
            password
            onChange={getPassword}
          />
          <button className={`flex justify-center items-center w-full p-4 ${isLoading?"bg-gray-400":"bg-main-500"} rounded text-white font-semibold`} disabled={isLoading}>
          {isLoading && (<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>) }
            Connexion
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;
