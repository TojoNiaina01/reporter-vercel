import React from "react";
import { Tab } from "@headlessui/react";
import { Popover } from "@headlessui/react";
import { Jost } from "next/font/google";
import Link from "next/link";
import {
  ArrowLeftOnRectangleIcon,
  BellIcon,
  CalendarDaysIcon,
  Cog6ToothIcon,
  FolderPlusIcon,
  HomeIcon,
  InboxIcon,
  NewspaperIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Article from "@/components/admin/Article";
import AddArticle from "@/components/admin/AddArticle";
import useMediaQuery from "@/hook/useMediaQuery";
import Errors from "@/pages/404";

const jost = Jost({ subsets: ["latin"], weight: "500" });

const Admin = () => {
  const isAboveScreen = useMediaQuery("(min-width: 1024px)");

  if (!isAboveScreen)
    return (
      <Errors
        alert="Page Not Supported"
        message="this page is only supported on desktop screen!"
        backHome
      />
    );
  return (
    <section className="admin w-full py-4">
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
          <div className=" relative cursor-pointer">
            <BellIcon className="h-8 text-[#898997]" />
            <span className="absolute -top-2 right-0 text-[9px] bg-main-500 text-white px-2 py-1 rounded-full">
              2
            </span>
          </div>
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

      <Tab.Group>
        <div className="flex pt-6 gap-4">
          <Tab.List className="flex flex-col justify-between p-4 border-2 border-gray-200 rounded-xl bg-[#F5F5F5]/40 h-[85vh] 2xl:h-[70vh]">
            <div className=" flex flex-col gap-4 ">
              <Tab className="tabs mt-10">
                <NewspaperIcon className="h-5" />
                <span>Liste article</span>
              </Tab>
              <Tab className="tabs">
                <FolderPlusIcon className="h-5" />
                <span>Ajout article</span>
              </Tab>
              <Tab className="tabs">
                <CalendarDaysIcon className="h-5" />
                <span>Ads Manager</span>
              </Tab>
              <Tab className="tabs">
                <InboxIcon className="h-5" />
                <span>Newsletter</span>
              </Tab>
              <Tab className="tabs">
                <Cog6ToothIcon className="h-5" />
                <span>Settings</span>
              </Tab>
            </div>

            <div className="text-center">
              <p className="text-main-500 underline cursor-pointer">Logout</p>
            </div>
          </Tab.List>
          <Tab.Panels className="flex-1">
            <Tab.Panel>
              <Article />
            </Tab.Panel>
            <Tab.Panel>
              <AddArticle />
            </Tab.Panel>
            <Tab.Panel>Content 3</Tab.Panel>
          </Tab.Panels>
        </div>
      </Tab.Group>
    </section>
  );
};

export default Admin;
