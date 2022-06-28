import { useEffect, useState } from "react";

import Select from "react-select";
import { useSession } from "next-auth/react";
import Gist from "react-gist";
import axiosInstance from "../axios";

function GistComponent() {
  const { data: session } = useSession();
  const [gists, setGists] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axiosInstance.get("/api/gists");

      setGists(result.data.data.data);
    };
    fetchData();
  }, []);

  return (
    gists && (
      <div className="container flex column center jc">
        <h1>Gists</h1>
        {gists &&
          gists.map((el) => {
            return (
              <div
                key={el.id}
                style={{
                  width: "700px",
                }}
              >
                <Gist key={el.id} id={el.id} />
              </div>
            );
          })}
      </div>
    )
  );
}

export default GistComponent;
