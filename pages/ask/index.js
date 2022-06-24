import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import AskComponent from "../../components/Forms/Ask";
import { Loader } from "../../components/Icons";

function Ask() {
  return (
    <div className="container flex jc">
      <Head>
        <title>Ask questions</title>
      </Head>
      <main className="main  center">
        <AskComponent />
      </main>
    </div>
  );
}

export default Ask;
