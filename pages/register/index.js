import React from "react";
import Link from "next/link";
import Input from "@/components/Input";
import { Logo } from "@/public/assets/img";
import Image from "next/image";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { Jost } from "next/font/google";

const jost = Jost({ subsets: ["latin"], weight: "500" });
const Register = () => {
  return (
    <div className="fixed inset-0  bg-main-400 flex  justify-center items-center">
      <div className="w-[450px] relative bg-white p-14 md:p-10 rounded-lg">
        {/*<button className="absolute top-2 left-2 inline-flex items-center gap-2">*/}
        {/*  <ArrowLeftCircleIcon className="h-8 text-secondary-500" />*/}
        {/*  <Link href="/" className="text-secondary-500">*/}
        {/*    Accueil*/}
        {/*  </Link>*/}
        {/*</button>*/}
        <Image src={Logo} className="object-cover mb-4" alt="Logo" />
        <form className="space-y-4">
          <Input id="username" label="Nom d'utilisateur" required type="text" />
          <Input id="email" label="Email" required type="email" />
          <Input id="password" label="Password" required type="password" />
          <button className="w-full p-4 bg-main-500 rounded text-white font-semibold">
            Inscription
          </button>
        </form>

        <div className={`${jost.className} pt-2 text-gray-600`}>
          Déjà inscrit ?{" "}
          <Link href="/login" className="text-main-500 underline">
            Connexion.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
