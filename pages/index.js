import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

import { Loader } from "../components/Icons";
import axios from "axios";

import { format, formatDistance, parseISO } from "date-fns";
import DialogDemo from "../components/UI/Dialogs";
import Link from "next/link";
import useSWR from "swr";
import { styled } from "@stitches/react";

const Card = styled("div", {
  width: "400px",
  zIndex: 2,
  marginBottom: "10px",
  padding: "20px 20px",
  display: "flex",
  flexDirection: "column",
  borderRadius: "10px",
  gap: "2px",
  cursor: "pointer",
  "&:hover": {
    background: "#eee",
  },
});

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
          const timestamp = el.createdAt ? new Date(el.createdAt) : "";
          return (
            <Card key={el.id}>
              <Link href={"/ask/" + el.id}>
                <div>
                  <div
                    style={{
                      cursor: "pointer",
                      fontSize: "1.30769231rem",
                      color: "var(--text-color)",
                    }}
                  >
                    {el.content}
                  </div>
                  <div
                    className="flex js center"
                    style={{ color: "#555", fontSize: "14px" }}
                  >
                    <div>{el?.answers?.length} answers</div>
                    <div className="flex center">
                      <img
                        src={el.author.image}
                        width="20px"
                        height="20px"
                        style={{
                          borderRadius: "50%",
                        }}
                      />
                      <p>
                        {el.author.name} asked {format(timestamp, "dd-MM-yyyy")}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>

              <div className="flex js">
                <div className="flex center">
                  <DialogDemo askid={el.id} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
