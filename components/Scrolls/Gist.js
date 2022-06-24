import { useEffect, useState } from "react";

import Select from "react-select";
import axios from "axios";
import { useSession } from "next-auth/react";
import Gist from "react-gist";

function GistComponent() {
  const { data: session } = useSession();
  const [gists, setGists] = useState();

  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        const result = await axios.get("/api/gists");

        console.log(result.data.data);

        setGists(result.data.data.data);
      };
      fetchData();
    }
  }, [session]);

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
        {/* <Select onChange={(e) => console.log(e)} isMulti options={tags} /> */}
      </div>
    )
  );
}

export default GistComponent;
