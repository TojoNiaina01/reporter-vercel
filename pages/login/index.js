import React from "react";
import Image from "next/image";
import { Logo } from "@/public/assets/img";
import Input from "@/components/Input";
import Link from "next/link";
import { Jost } from "next/font/google";

const jost = Jost({ subsets: ["latin"], weight: "500" });
const Login = () => {
  return (
    <div className="fixed inset-0  bg-main-400 flex  justify-center items-center">
      <div className="w-[450px] bg-white p-14 md:p-10 rounded-lg">
        <Image src={Logo} className="object-cover " alt="Logo" />

        <form className="space-y-4">
          <Input id="email" label="Email" required type="email" />
          <Input
            id="password"
            label="Password"
            required
            type="password"
            password
          />
          <button className="w-full p-4 bg-main-500 rounded text-white font-semibold">
            Connexion
          </button>
        </form>

        <div className={`${jost.className} pt-2 text-gray-600`}>
          Vous n’avez pas de compte ?{" "}
          <Link href="/register" className="text-main-500 underline">
            S'inscrire.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
