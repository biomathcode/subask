import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Gist from "react-gist";
import { Loader } from "../../components/Icons";
import Head from "next/head";
import { useSession } from "next-auth/react";
import axiosInstance from "../../components/axios";

function AskWithId() {
  const [ask, setAsk] = useState();

  const { data: session } = useSession();

  const router = useRouter();

  const { askid } = router.query;

  useEffect(() => {
    const fetchAsk = async () => {
      const result = await axiosInstance("api/ask/" + askid, {
        baseURL: "/",
      });

      setAsk(result.data.data);
    };

    fetchAsk();
  }, [askid]);

  const handleDelete = async (id) => {
    const data = await axiosInstance.delete(`api/answer/${id}`, {
      baseURL: "/",
    });

    return data;
  };
  return (
    <>
      <Head>
        <title>{ask?.content}</title>
        <meta name="description" content={"answer to " + ask?.content} />
      </Head>
      <div className="container  flex jc ">
        <div className="main jc   " style={{ marginBottom: "100px" }}>
          {ask ? (
            <div
              className="flex column center jc"
              style={{
                textAlign: "center",
              }}
            >
              <h1
                style={{
                  fontWeight: 500,
                  wordSpacing: 1,
                  fontSize: "1.8rem",
                  color: "#111",
                  fontFamily: "sans-serif",
                }}
              >
                {ask.content}
              </h1>
              <div className="flex center">
                <p>posted by</p>

                <div className="center flex">
                  <img
                    src={ask.author?.image}
                    width="20px"
                    height="20px"
                    style={{
                      borderRadius: "50%",
                    }}
                  />
                  <p>{ask.author.name}</p>
                </div>
              </div>

              <div style={{ marginBottom: "100px" }}>
                {ask.answers !== [] &&
                  ask.answers.map((ans) => {
                    return (
                      <div
                        key={ans.id}
                        style={{
                          minWidth: "350px",
                          width: "50vw",
                          maxWidth: "750px",
                        }}
                      >
                        <p>{console.log(ans)}</p>
                        <Gist id={ans?.gistId} file={ans?.gistFile} />

                        {session.user.id === ans.authorId ? (
                          <button
                            onClick={() => handleDelete(ans.id)}
                            className="btn round"
                          >
                            delete
                          </button>
                        ) : null}
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </>
  );
}

export default AskWithId;
