import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  ArrowLeftOnRectangleIcon,
  BellIcon,
  CalendarDaysIcon,
  Cog6ToothIcon,
  FolderPlusIcon,
  HomeIcon,
  InboxIcon,
  NewspaperIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { Popover } from "@headlessui/react";
import { Jost } from "next/font/google";

const jost = Jost({ subsets: ["latin"], weight: "500" });

const ActiveLink = ({ children, href }) => {
  const router = useRouter();
  return (
    <Link href={href}>
      <p
        className={`${
          router.pathname === href ? "bg-main-500 rounded-xl text-white" : ""
        } flex items-center gap-2  font-semibold text-sm py-3 px-4`}
      >
        {children}
      </p>
    </Link>
  );
};

const LayoutAdmin = ({ children }) => {
  const router = useRouter();
  return (
    <section className="admin w-full max-w-7xl py-4">
      {/* HEADER */}
      <div className="flex justify-between  items-center">
        <div className="cursor-pointer">
          <h2 className={` ${jost.className} text-main-400 text-lg`}>
            Welcome !
          </h2>
          <h4 className={`uppercase  ${jost.className} text-xl `}>
            Independent R.
          </h4>
        </div>
        <div className="flex gap-8 items-center">
          <Popover className="relative">
            <Popover.Button>
              <div className="flex items-center gap-2">
                <div className="leading-3 ">
                  <p className="text-xl font-semibold tracking-wide">
                    Govina A.
                  </p>
                  <span className="font-thin text-sm text-[#898997]">
                    Administrator
                  </span>
                </div>
                <ChevronDownIcon
                  className={`ui-open:rotate-180 ui-open:transform h-5 text-main-500 `}
                />
              </div>
            </Popover.Button>
            <Popover.Panel className="absolute bg-white">
              <ul className="flex flex-col border-[1px] rounded-2xl p-4 mt-2 shadow-md">
                <li className="flex gap-3 items-center px-3 py-2 rounded-3xl hover:bg-gray-100 cursor-pointer">
                  <HomeIcon className="h-5" />
                  <Link href="#">Home</Link>
                </li>
                <li className="flex gap-3 items-center px-3 py-2 rounded-3xl hover:bg-gray-100 cursor-pointer">
                  <Cog6ToothIcon className="h-5" />
                  <Link href="#">Settings</Link>
                </li>
                <li className="flex gap-3 items-center px-3 py-2 rounded-3xl hover:bg-gray-100 cursor-pointer">
                  <ArrowLeftOnRectangleIcon className="h-5" />
                  <a href="#">Logout</a>
                </li>
              </ul>
            </Popover.Panel>
          </Popover>
        </div>
      </div>

      {/* ADMIN PANEL */}
      <div className="flex mt-10">
        <div className=" flex flex-col gap-4 p-4 border-2 border-gray-200 rounded-xl bg-[#F5F5F5]/40 h-[85vh] 2xl:h-[70vh] ">
          <ActiveLink href="/admin/listes-article">
            <NewspaperIcon className="h-5" />
            <span className="whitespace-nowrap">Listes article</span>
          </ActiveLink>
          <ActiveLink href="/admin/ajout-article">
            <FolderPlusIcon className="h-5" />
            <span className="whitespace-nowrap">Ajout article</span>
          </ActiveLink>
          <ActiveLink href="/admin/listes-ads">
            <CalendarDaysIcon className="h-5" />
            <span className="whitespace-nowrap">Listes ADS</span>
          </ActiveLink>
          <ActiveLink href="/admin/ajout-ads">
            <CalendarDaysIcon className="h-5" />
            <span className="whitespace-nowrap">Ajout Ads</span>
          </ActiveLink>
          <ActiveLink href="/admin/listes-utilisateur">
            <Cog6ToothIcon className="h-5" />
            <span className="whitespace-nowrap">Listes utilisateur</span>
          </ActiveLink>
          <ActiveLink href="/admin/ajout-utilisateur">
            <Cog6ToothIcon className="h-5" />
            <span className="whitespace-nowrap">Ajout utilisateur</span>
          </ActiveLink>

          <button className="bg-secondary-500 text-white py-2 rounded active:scale-95 transition mt-8">
            Logout
          </button>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </section>
  );
};

export default LayoutAdmin;
