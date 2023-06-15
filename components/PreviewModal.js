import React, { useRef, useState } from "react";
import { Cross } from "@/public/assets/svg";
import HeaderCategory from "@/components/HeaderCategory";
import DateAuteur from "@/components/DateAuteur";
import Title from "@/components/Title";
import {
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  DeviceTabletIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import { ArticleMostTwo, ArticleOne } from "@/public/assets/img";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { Jost } from "next/font/google";

const jost = Jost({ subsets: ["latin"] });
const PreviewModal = ({ setPreviewModal }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlayed, setIsPlayed] = useState(true);
  const [parentWidth, setParentWidth] = useState(1000);
  const [imageWidth, setImageWidth] = useState(966);
  const [imageHeight, setImageHeight] = useState(500);
  const videoRef = useRef();

  const play = () => {
    setIsPlayed((value) => !value);
    videoRef.current.play();
  };
  const pause = () => {
    setIsPlayed((value) => !value);
    videoRef.current.pause();
  };
  const handleResponsive = (text) => {
    if (text === "desktop") {
      setParentWidth(1000);
      setImageWidth(966);
      setImageHeight(500);
    }
    if (text === "tab") {
      setParentWidth(820);
      setImageWidth(692);
      setImageHeight(350);
    }

    if (text === "mobile") {
      setParentWidth(390);
      setImageWidth(358);
      setImageHeight(250);
    }
  };

  return (
    <>
      <button
        className="fixed right-5 top-5 z-30 rounded-md border-2 border-white p-2 lg:right-20 lg:top-10 lg:border-main-500"
        onClick={() => setPreviewModal(false)}
      >
        <Image src={Cross} alt="close" />
      </button>
      <div className="fixed right-1/2 top-0 z-30 space-x-2">
        <button
          className="rounded-lg bg-black/40 p-2"
          onClick={() => handleResponsive("mobile")}
        >
          <DevicePhoneMobileIcon className="h-5 text-white" />
        </button>
        <button
          className="rounded-lg bg-black/40 p-2"
          onClick={() => handleResponsive("tab")}
        >
          <DeviceTabletIcon className="h-5 text-white" />
        </button>
        <button
          className="rounded-lg bg-black/40 p-2"
          onClick={() => handleResponsive("desktop")}
        >
          <ComputerDesktopIcon className="h-5 text-white" />
        </button>
      </div>
      <section className="fixed inset-0  z-20  flex  justify-center overflow-y-auto bg-black/40 backdrop-blur-[2px]">
        <div
          className={`my-10 h-fit  bg-white`}
          style={{ width: `${parentWidth}px` }}
        >
          <div
            className={`mx-auto my-4 w-[${imageWidth}px]`}
            style={{ width: `${imageWidth}px` }}
          >
            <div className="space-y-4">
              <div
                key={uuidv4()}
                className="relative lg:rounded"
                style={{ height: `${imageHeight}px` }}
              >
                <Image
                  // src={`/uploads/images/${image.image_name}.${image.image_extension}`}
                  src={ArticleMostTwo}
                  className="object-cover"
                  fill
                  alt="Image article blog"
                />
              </div>

              <div className="group relative ">
                <video
                  src="/assets/video/video1.mp4"
                  type="video/mp4"
                  play
                  muted={isMuted}
                  loop
                  ref={videoRef}
                />
                <div className="absolute bottom-5 right-5 text-main-500">
                  {isMuted ? (
                    <SpeakerXMarkIcon
                      className="h-5 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                      onClick={() => setIsMuted((value) => !value)}
                    />
                  ) : (
                    <SpeakerWaveIcon
                      className="h-5 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                      onClick={() => setIsMuted((value) => !value)}
                    />
                  )}
                </div>
                <div className="absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-main-500">
                  {isPlayed ? (
                    <PlayCircleIcon
                      className="h-14 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                      onClick={play}
                    />
                  ) : (
                    <PauseCircleIcon
                      className="h-14 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                      onClick={pause}
                    />
                  )}
                </div>
              </div>
            </div>
            {/*<DateAuteur date={articleData.created_at} auteur={articleData.author} />*/}
            <DateAuteur date="05.12.2024" auteur="Mandreshy" />
            <hr className="my-2" />
            <Title style="text-xl tracking-wide my-2 leading-6 lg:text-2xl lg:leading-5">
              {/*{articleData.title}*/}
              Peut-on allier lutte climatique et développement économique ?
            </Title>

            <p className="text-sm tracking-wide text-gray-600">
              {/*{articleData.description}*/}
              C’est l’une des questions qui a taraudé les participants de
              l’Africa CEO Forum, qui s’est déroulé les 5 et 6 juin à Abidjan.
              Voici quelques-unes de leurs réponses.
            </p>
            <div className={`${jost.className} mt-10`}>
              {/*{body}*/}
              C’est l’une des questions qui a taraudé les participants de
              l’Africa CEO Forum, qui s’est déroulé les 5 et 6 juin à Abidjan.
              Voici quelques-unes de leurs réponses.
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PreviewModal;
