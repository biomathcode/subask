import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Gist from "react-gist";
import { Loader } from "../../components/Icons";

function AskWithId() {
  const [ask, setAsk] = useState();

  const router = useRouter();

  const { askid } = router.query;

  useEffect(() => {
    const fetchAsk = async () => {
      const result = await axios.get("/api/ask/" + askid);

      setAsk(result.data.data);
    };

    fetchAsk();
  }, [askid]);

  return (
    <div className="container  flex jc ">
      <div className="main jc flux  ">
        {ask ? (
          <div className="flex column">
            <h1>{ask.content}</h1>
            <p>posted by {ask.author.name}</p>

            <div>
              {ask.answers.map((ans) => {
                return (
                  <Gist key={ans.gistId} id={ans.gistId} file={ans.gistFile} />
                );
              })}
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default AskWithId;
