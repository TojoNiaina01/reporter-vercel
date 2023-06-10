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
import useMediaQuery from "@/hook/useMediaQuery";
import Errors from "@/pages/404";
import { ROOT_URL } from "@/env";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/config/redux/auth/authAction";

const jost = Jost({ subsets: ["latin"], weight: "500" });

const ActiveLink = ({ children, href }) => {
  const router = useRouter();
  return (
    <Link href={href}>
      <p
        className={`${
          router.pathname === href ? "rounded-xl bg-main-500 text-white" : ""
        } flex items-center gap-2  px-4 py-3 text-sm font-semibold`}
      >
        {children}
      </p>
    </Link>
  );
};

const LayoutAdmin = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const isAboveScreen = useMediaQuery("(min-width: 1024px)");

  if (!isAboveScreen)
    return (
      <Errors
        alert="Page Not Supported"
        message="this page is only supported on desktop screen!"
        backHome
      />
    );

    const logoutHandler = () => {
      dispatch(logoutUser())
      router.reload()
    }


  return (
    <section className="admin w-full max-w-7xl py-4">
      {/* HEADER */}
      <div className="flex items-center  justify-between">
        <div className="cursor-pointer">
          <h2 className={` ${jost.className} text-lg text-main-400`}>
            Welcome !
          </h2>
          <h4 className={`uppercase  ${jost.className} text-xl `}>
            Independent R.
          </h4>
        </div>
        <div className="flex items-center gap-8">
          <Popover className="relative">
            <Popover.Button>
              <div className="flex items-center gap-2">
                <div className="leading-3 ">
                  <p className="text-xl font-semibold tracking-wide">
                    Govina A.
                  </p>
                  <span className="text-sm font-thin text-[#898997]">
                    Administrator
                  </span>
                </div>
                <ChevronDownIcon
                  className={`h-5 text-main-500 ui-open:rotate-180 ui-open:transform `}
                />
              </div>
            </Popover.Button>
            <Popover.Panel className="absolute bg-white">
              <ul className="mt-2 flex flex-col rounded-2xl border-[1px] p-4 shadow-md">
                <li className="flex cursor-pointer items-center gap-3 rounded-3xl px-3 py-2 hover:bg-gray-100">
                  <HomeIcon className="h-5" />
                  <Link href={ROOT_URL}>Home</Link>
                </li>
                <li className="flex cursor-pointer items-center gap-3 rounded-3xl px-3 py-2 hover:bg-gray-100">
                  <ArrowLeftOnRectangleIcon className="h-5" />
                  <button onClick={logoutHandler}>Logout</button>
                </li>
              </ul>
            </Popover.Panel>
          </Popover>
        </div>
      </div>

      {/* ADMIN PANEL */}
      <div className="mt-10 flex">
        <div className=" flex h-[85vh] flex-col gap-4 rounded-xl border-2 border-gray-200 bg-[#F5F5F5]/40 p-4 2xl:h-[70vh] ">
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

          <button onClick={logoutHandler} className="mt-8 rounded bg-secondary-500 py-2 text-white transition active:scale-95">
            Logout
          </button>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </section>
  );
};

export default LayoutAdmin;
