import React from "react";
import Head from "next/head";
import Image from "next/image";
import MenuButton from "../components/MenuButton";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Jeopardy!! - YEAH -</title>
      </Head>
      <div className="w-full h-full flex">
        <div className="max-w-[500px] max-h-[400px] w-full h-full m-auto  bg-white">
          <h1 className="text-3xl">What a whimsical game</h1>
          <div>
            <MenuButton text={"Begin"} navigate={"/newGame"} />
          </div>
        </div>
      </div>
    </>
  );
}

//<MenuButton text={"🗣️ Start 💰"} navigate={"/newGame"} />
