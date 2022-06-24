import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

import { Loader } from "../components/Icons";
import axios from "axios";

import { formatDistance } from "date-fns";
import DialogDemo from "../components/UI/Dialogs";

export default function Home() {
  const [newdata, setData] = useState();

  const [tags, setTags] = useState();

  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/api/ask");

      setData(result.data.data);
    };
    const fetchTags = async () => {
      const result = await axios.get("/api/tags");

      setTags(result.data.data);
    };
    fetchData();
    fetchTags();
  }, []);

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

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
          <div className="flex gap-10 h-scroll ">
            {tags &&
              tags.map((el) => {
                return (
                  <>
                    <div className="tag" key={el.id}>
                      {el.name}
                    </div>
                  </>
                );
              })}
          </div>
        </div>
        {newdata ? (
          newdata.map((el) => {
            console.log(el);
            return (
              <>
                <div
                  className="flex column"
                  style={{
                    width: "400px",
                    borderBottom: "1px solid #eee",
                    padding: "5px 10px",
                  }}
                  key={el.id}
                >
                  <p
                    style={{
                      fontSize: "1.30769231rem",
                      color: "var(--text-color)",
                    }}
                  >
                    {el.content}
                  </p>

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
                  <div className="flex js">
                    <div className="flex center">
                      <DialogDemo askid={el.id} authorId={session.user.id} />
                      {/* <button className="btn rosund">Answer </button> */}
                    </div>
                    <div className="flex center">
                      <p>
                        {formatDistance(new Date(el.createdAt), new Date(), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
