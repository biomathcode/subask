import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import AskComponent from "../components/Forms/Ask";
import { Loader } from "../components/Icons";

function Ask() {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/api/ask");

      setData(result.data.data);
    };

    fetchData();
  }, []);
  return (
    <div className="container flex jc">
      <Head>
        <title>Ask questions</title>
      </Head>
      <main className="main  center">
        <AskComponent />

        {data ? (
          data.map((el) => {
            return (
              <div key={el.id}>
                <p>{el.content}</p>
                <p>
                  <img
                    width="40px"
                    height="40px"
                    style={{ borderRadius: "50%" }}
                    src={el.author.image}
                    alt={el.author.name}
                  />
                  Posted by {el.author.name}
                </p>

                {el.tags.map((tag) => {
                  return <div key={tag.id}>{tag.name}</div>;
                })}
              </div>
            );
          })
        ) : (
          <Loader />
        )}
      </main>
    </div>
  );
}

export default Ask;
