import { useEffect, useState } from "react";

import Select from "react-select";
import axios from "axios";
import { useSession } from "next-auth/react";
import Gist from "react-gist";

function AskComponent() {
  const [value, setValue] = useState("");

  const [tags, setTags] = useState();

  const [select, setSelect] = useState();

  const [gists, setGists] = useState();

  const [files, setFiles] = useState();

  const { data: session } = useSession();

  useEffect(() => {
    const fetchGists = async () => {
      const result = await axios.get("/api/gists");

      const newData = await result.data.data.data.flatMap((el) => {
        const files = Object.values(el.files);

        console.log(files);

        return files.map((data, i) => {
          return {
            value: el.id + " " + i,
            label: data.filename,
          };
        });
      });

      console.log(newData);

      setGists(newData);
    };
    const fetchTags = async () => {
      const result = await axios.get("/api/tags");

      const newData = await result.data.data.map((el) => {
        return {
          value: String(el.id),
          label: el.name,
        };
      });

      setTags(newData);
    };
    fetchGists();
    fetchTags();
  }, []);

  useEffect(() => {}, [files]);

  return (
    <div className="flex jc column center main">
      <div className="flex container jc center">
        <img
          src={session?.user.image}
          alt={session?.user.name}
          width="40px"
          height="40px"
          style={{
            borderRadius: "50%",
          }}
        />

        <textarea
          style={{
            height: "60px",
            width: "500px",
            margin: "15px",
            borderRight: "none",
            borderLeft: "none",
            borderTop: "none",
            borderBottom: "2px solid #4b4b4b ",
            outline: "none",
            padding: "10px",
            fontSize: "16px",
            fontWeight: 400,
            letterSpacing: 0.8,
            resize: "none",
          }}
          value={value}
          placeholder="Ask your questions"
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      {tags && (
        <div>
          <div className="flex column jc mt-10">
            <Select
              styles={{
                container: (provided, state) => ({
                  ...provided,
                }),
                control: (base) => ({
                  ...base,
                  border: "none",
                }),
              }}
              placeholder="Choose a tag"
              value={select}
              name="tags"
              onChange={(v) => (v.length <= 2 ? setSelect(v) : null)}
              options={tags}
            />
          </div>
          <Select
            styles={{
              container: (provided, state) => ({
                ...provided,
              }),
              control: (base) => ({
                ...base,
                border: "none",
              }),
            }}
            name="gists"
            value={files}
            placeholder="Choose a gists"
            onChange={(v) => {
              const id = v.value.split(" ")[0];
              setFiles({
                value: id,
                label: v.label,
              });
            }}
            options={gists}
          />
          <div
            style={{
              height: "50vh",
              overflow: "scroll",
            }}
          >
            {files && <Gist id={files?.value} file={files?.label} />}
          </div>

          <div className="flex jc center mt-10">
            <button className="btn round">Ask</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AskComponent;
