import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Gist from "react-gist";
import { Loader } from "../../components/Icons";
import Head from "next/head";
import { useSession } from "next-auth/react";

function AskWithId() {
  const [ask, setAsk] = useState();

  const { data: session } = useSession();

  const router = useRouter();

  const { askid } = router.query;

  useEffect(() => {
    const fetchAsk = async () => {
      const result = await axios.get("https://subask.in/api/ask/" + askid);

      setAsk(result.data.data);
    };

    fetchAsk();
  }, [askid]);

  const handleDelete = async (id) => {
    const data = await axios.delete(`https://subask.in/api/answer/${id}`);

    return data;
  };
  return (
    <>
      <Head>
        <title>{ask?.content}</title>
        <meta name="description" content={"answer to " + ask?.content} />
      </Head>
      <div className="container  flex jc ">
        <div className="main jc flux  ">
          {ask ? (
            <div className="flex column">
              <h1>{ask.content}</h1>
              <p>posted by {ask.author.name}</p>

              <div>
                {ask.answers !== [] &&
                  ask.answers.map((ans) => {
                    return (
                      <div key={ans.id}>
                        <Gist
                          key={ans.gistId}
                          id={ans.gistId}
                          file={ans.gistFile}
                        />

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
