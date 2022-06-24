import { useEffect, useState } from "react";

import Select from "react-select";
import axios from "axios";
import { useSession } from "next-auth/react";

function AskComponent() {
  const [value, setValue] = useState("");

  const [tags, setTags] = useState();

  const [select, setSelect] = useState();

  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/api/tags");

      const newData = await result.data.data.map((el) => {
        return {
          value: String(el.id),
          label: el.name,
        };
      });

      console.log(newData);

      setTags(newData);
    };
    fetchData();
  }, []);

  return (
    tags && (
      <div>
        <div
          className="flex container jc center"
          style={{
            marginTop: "80px",
          }}
        >
          <img
            src={session.user.image}
            alt={session.user.name}
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
          onChange={(v) => (v.length <= 2 ? setSelect(v) : null)}
          isMulti
          options={tags}
        />
        <div className="flex jc mt-10">
          <button>Ask</button>
        </div>
      </div>
    )
  );
}

export default AskComponent;
