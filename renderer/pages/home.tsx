import React from "react";
import Head from "next/head";
import Image from "next/image";
import MenuButton from "../components/MenuButton";
import Noja from "../components/makaras/Noja";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Jeopardy!! - YEAH -</title>
      </Head>
      <div className="w-full h-full flex relative">
        <div className="absolute bottom-0 right-0 z-2">
          <Noja />
        </div>
        <div className="max-w-[500px] max-h-[400px] w-full h-full m-auto flex justify-start flex-col items-center">
          <div>
            <h1 id="main-title" className="text-3xl underline">
              Jeopardy by Anteliaat Pojat
            </h1>
            <div className="mt-14">
              <MenuButton
                text={"Begin."}
                navigate={"/newGame"}
                style={"text-3xl"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

//<MenuButton text={"🗣️ Start 💰"} navigate={"/newGame"} />
