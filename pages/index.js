import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

import { Loader } from "../components/Icons";
import axios from "axios";

import { formatDistance } from "date-fns";
import DialogDemo from "../components/UI/Dialogs";
import Link from "next/link";
import useSWR from "swr";

const fetchData = async () => {
  const result = await axios.get("/api/ask");

  return result.data.data;
};
const fetchTags = async () => {
  const result = await axios.get("/api/tags");

  return result.data.data;
};

const Tags = () => {
  const { data, error } = useSWR("api/tags", fetchTags);
  if (error) {
    return (
      <div className="container flex jc center">
        <div className="main">something went wrong!!</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container flex jc center">
        <div className="main">Loading..!!</div>
      </div>
    );
  }

  return (
    <div className="flex gap-10 h-scroll ">
      {data.map((el, i) => {
        return (
          <>
            <div className="tag" key={i}>
              {el.name}
            </div>
          </>
        );
      })}
    </div>
  );
};

export default function Home() {
  const { data: session } = useSession();

  const { data, error } = useSWR("/api/ask", fetchData);

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      console.log(session.error);
      signIn();
    }
  }, [session]);

  if (error) {
    return (
      <div className="container flex jc center">
        <div className="main">
          <Loader />
        </div>
      </div>
    );
  }

  if (!data)
    return (
      <div className="container flex jc center">
        <div className="main">
          <Loader />
        </div>
      </div>
    );

  return (
    <div className="container flex jc  center ">
      <Head>
        <title>Subask: Where Developers Ask and Answer</title>
        <meta name="description" content="ask and answer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="main ">
        <div
          className="scroll-container mt-main"
          style={{
            position: "sticky",
            top: "60px",
            background: "white",
          }}
        >
          <Tags />
        </div>

        {data.map((el) => {
          return (
            <div
              className="flex column"
              style={{
                width: "400px",
                borderBottom: "1px solid #eee",
                padding: "5px 10px",
              }}
              key={el.id}
            >
              <Link href={"/ask/" + el.id}>
                <p
                  style={{
                    cursor: "pointer",
                    fontSize: "1.30769231rem",
                    color: "var(--text-color)",
                  }}
                >
                  {el.content}
                </p>
              </Link>

              <div className="flex center">
                <img
                  src={el.author.image}
                  width="30px"
                  height="30px"
                  style={{
                    borderRadius: "50%",
                  }}
                />
                <p>{el.author.name}</p>
              </div>
              <p>{el?.answers?.length} answers</p>
              <div className="flex js">
                <div className="flex center">
                  <DialogDemo askid={el.id} />
                  {/* <button className="btn rosund">Answer </button> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
