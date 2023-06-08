import React from "react";
import Image from "next/image";
import { Border, Logo } from "@/public/assets/img";
import { Jost } from "next/font/google";
import { SocialIcon } from "react-social-icons";
import { MenuFR } from "@/constant/constant";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

const jost = Jost({ subsets: ["latin"], weight: "600" });

const Footer = () => {
  return (
    <footer className="mx-4 my-10 md:mx-0">
      <Image src={Border} alt="Graphics" />
      <div className="grid grid-cols-1 pt-10 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
        <div>
          <h6 className={` ${jost.className} py-1 text-2xl lg:text-xl`}>
            About
          </h6>
          <hr className="py-2" />
          <p className="text-sm tracking-wide text-[#555555]">
            We have much planned for the future, working with great clients and
            continued software development. If you'd like to join our team, then
            we'd also love to hear from you.
          </p>
          <Image src={Logo} width={175} className="-ml-4 py-2" alt="Logo" />
        </div>
        <div className="pt-4 lg:pt-0">
          <h6 className={` ${jost.className} py-1 text-2xl lg:text-xl`}>
            Categories
          </h6>
          <hr className="py-2" />
          <ul className="grid grid-cols-2 gap-[4px]">
            {MenuFR?.map((menu) => (
              <li key={uuidv4()} className="footerCateg">
                <Link href={menu.href}>{menu.k}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="pt-4 lg:pt-0">
          <h6 className={` ${jost.className} py-1 text-2xl lg:text-xl`}>
            Support
          </h6>
          <hr className="py-2" />
          <ul>
            <li className="footerCateg">aide (faq)</li>
            <li className="footerCateg">contact</li>
          </ul>
        </div>
        <div className="pt-4 lg:pt-0">
          <h6 className={` ${jost.className} py-1 text-2xl lg:text-xl`}>
            Follow Us
          </h6>
          <ul className="flex flex-wrap  gap-3">
            <li>
              <SocialIcon
                url="https://facebook.com"
                style={{ height: 35, width: 35 }}
                className="hover:scale-105"
              />
            </li>
            <li>
              <SocialIcon
                url="https://twitter.com"
                style={{ height: 35, width: 35 }}
                className="hover:scale-105"
              />
            </li>
            <li>
              <SocialIcon
                url="https://youtube.com"
                style={{ height: 35, width: 35 }}
                className="hover:scale-105"
              />
            </li>
            <li>
              <SocialIcon
                url="https://instagram.com"
                style={{ height: 35, width: 35 }}
                className="hover:scale-105"
              />
            </li>
            <li>
              <SocialIcon
                url="https://linkedin.com"
                style={{ height: 35, width: 35 }}
                className="hover:scale-105"
              />
            </li>
            <li>
              <SocialIcon
                network="rss"
                style={{ height: 35, width: 35 }}
                className="cursor-pointer hover:scale-105"
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="border-b-[2px] border-black pt-5" />
      <div className="pt-5  text-center text-sm text-[#555555] lg:flex lg:items-center lg:justify-between">
        <p className="cursor-pointer lg:order-2">
          Privacy Policy <span> - </span> Terms & Conditions
        </p>
        <p className="cursor-pointer lg:order-1">
          © Independent Reporter All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
