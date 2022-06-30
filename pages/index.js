import Head from "next/head";
import { useSession, signIn } from "next-auth/react";
import { memo, useEffect, useMemo, useState } from "react";

import { Loader } from "../components/Icons";

import { format, formatDistance } from "date-fns";
import DialogDemo from "../components/UI/Dialogs";
import Link from "next/link";
import useSWR from "swr";
import { styled } from "@stitches/react";
import axiosInstance from "../components/axios";

const Card = styled("div", {
  width: "400px",
  zIndex: 1,
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

const Tag = styled("div", {
  padding: "4px 14px",
  background: "#eaeade",
  borderRadius: "20px",
  cursor: "pointer",
  whiteSpace: "nowrap",
  marginRight: "5px",
  marginBottom: "7px",
  display: "inline-block",
  color: "#333",
  transition: "all ease-in 100ms",
  fontWeight: "600",

  variants: {
    selected: {
      true: {
        color: "#4b4b4b",
        background: "#f3f3f3",
        boxShadow: "0px 0px 0px 3px #4b4b4b ",
      },
      false: {
        color: "#333",
        background: "#eaeade",
      },
    },
  },
});

const fetchData = async (data) => {
  const result = await axiosInstance.get(data);

  return result.data.data;
};
const fetchTags = async (data) => {
  // console.log(data);
  const result = await axiosInstance.get("api/tags");

  return result.data.data;
};

const Tags = ({ selTag, setTag }) => {
  const { data, error } = useSWR("api/tags", fetchTags);
  const handleSelect = (el) => {
    setTag(el);
  };
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
    <div
      className="flex gap-10 h-scroll "
      style={{
        minWidth: "300px",
        maxWidth: "100vw",
      }}
    >
      {data.map((el) => {
        return (
          <Tag
            onClick={() => handleSelect(el)}
            selected={selTag === el ? "true" : "false"}
            key={el.id}
          >
            {el.name}
          </Tag>
        );
      })}
    </div>
  );
};

export default function Home() {
  const { data: session } = useSession();
  const [selTag, setSelTag] = useState({
    id: 0,
    name: "all",
  });

  const { data, error } = useSWR(
    () => `/api/ask?tag=${selTag.name}`,
    fetchData
  );

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

  console.log(data);

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
          <Tags selTag={selTag} setTag={setSelTag} />
        </div>

        <div className="flex center column jc">
          {data.length === 0 ? (
            <p className="flex center">
              No Ask Found <br /> Create a new ask by click on the bottom left
              button.
            </p>
          ) : (
            data.map((el) => {
              const timestamp = el.createdAt ? new Date(el.createdAt) : null;
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
                        <div>
                          {el.answers && el.answers.length > 1
                            ? el.answers?.length + " answers"
                            : el.answers?.length + " answer"}
                        </div>
                        <div className="flex center">
                          <img
                            src={el.author?.image}
                            width="20px"
                            height="20px"
                            style={{
                              borderRadius: "50%",
                            }}
                          />
                          <p>
                            {el.author?.name} asked{" "}
                            {timestamp &&
                              formatDistance(timestamp, Date.now(), {
                                addSuffix: true,
                              })}
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
            })
          )}
        </div>
      </div>
    </div>
  );
}
