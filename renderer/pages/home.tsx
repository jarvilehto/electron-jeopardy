import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import MenuButton from "../components/MenuButton";

export default function HomePage() {
  return (
    <React.Fragment>
      <Head>
        <title>Jeopardy andy</title>
      </Head>
      <div className="grid grid-col-1 text-2xl w-full text-center text-white">
        <div>
          <Image
            className="ml-auto mr-auto"
            src="/images/logo.png"
            alt="Logo image"
            width={256}
            height={256}
          />
        </div>
        <div className="mb-4">
          <h1>Jeopardy</h1>
        </div>
        <MenuButton text={"🗣️ Start 💰"} navigate={"/newGame"} />
      </div>
    </React.Fragment>
  );
}
