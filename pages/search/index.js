import React, { useState } from "react";
import HeaderCategory from "@/components/HeaderCategory";
import {
  ArrowDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import AsideRecentPopular from "@/components/pageIndiv/AsideRecentPopular";
import { ArrowUpIcon } from "@heroicons/react/20/solid";
import DateAuteur from "@/components/DateAuteur";
import Title from "@/components/Title";
import Image from "next/image";
import { PolitiqueArticleOne } from "@/public/assets/img";

const search = ({ articleRecent, articlePopular }) => {
  const [order, setOrder] = useState(false);
  return (
    <section className="mt-10 mx-2">
      {/* TOP */}
      <div className="flex justify-between items-center gap-1 lg:items-start">
        <div>
          <HeaderCategory title="Search Result" style />
          <p className="text-xs lg:text-sm font-thin tracking-wide">
            Search - Page
          </p>
        </div>
        <div className="z-10 absolute right-5 md:static">
          <form className="relative mx-auto w-max bg-secondary-100 rounded-full">
            <input
              type="index"
              className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12
              outline-none focus:w-full focus:cursor-text focus:border-secondary-400 focus:pl-16 focus:pr-4"
            />
            <MagnifyingGlassIcon className="absolute inset-y-0 my-auto h-8 w-12 border-r  border-transparent stroke-secondary-500 px-3.5 peer-focus:border-secondary-400 peer-focus:stroke-secondary-500" />
          </form>
        </div>
      </div>

      <div className="mt-4 lg:flex gap-8 justify-between">
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h6 className="font-semibold">"Best Indoor" Results</h6>
            <button onClick={() => setOrder(!order)}>
              {order ? (
                <p className="flex items-center font-semibold gap-1">
                  Newest <ArrowDownIcon className="h-3 w-3" />
                </p>
              ) : (
                <p className="flex items-center font-semibold gap-1">
                  Older <ArrowUpIcon className="h-3 w-3" />
                </p>
              )}
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            {[1, 2, 3, 4, 5, 6, 8].map((item) => (
              <div className="group cursor-pointer flex flex-col bg-[#EFF2FB]  mb-2 rounded overflow-hidden lg:flex-row">
                <Image
                  src={PolitiqueArticleOne}
                  className="h-[150px] object-cover md:w-full/2 md:h-full/2 lg:w-[250px] lg:h-full"
                  alt="Article image blog"
                />
                <div className="mx-2 lg:pt-5">
                  <Title style="text-base tracking-wide lg:text-xl ">
                    The best indoor plants to create comfort at home
                  </Title>
                  <DateAuteur
                    date="JUL 06"
                    auteur="Vinago"
                    style="text-secondary-500 py-1 "
                  />
                  <p className="text-sm text-secondary-700">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
                    ad assumenda aut commodi consequatur distinctio est facere
                    iste laborum magnam nisi officia omnis perspiciatis ratione,
                    repellendus, sapiente soluta vero voluptatibus?
                  </p>
                </div>
              </div>
            ))}
          </div>

          <h7 className="text-xl font-semibold text-center w-full">
            PAGINATION
          </h7>
        </div>
        <AsideRecentPopular
          articleRecent={articleRecent}
          articlePopular={articlePopular}
        />
      </div>
    </section>
  );
};

export default search;

export async function getStaticProps() {
  const dataAside = await import(`/data/thumbnail.json`);
  const articleRecent = dataAside.ArticleRecentMain;
  const articlePopular = dataAside.ArticlePopular;

  return {
    props: {
      articleRecent,
      articlePopular,
    },
  };
}
