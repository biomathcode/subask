import { useEffect, useState } from "react";

import Select from "react-select";
import axios from "axios";

function AskComponent() {
  const [value, setValue] = useState("");

  const [tags, setTags] = useState();

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
        <input
          value={value}
          placeholder="Ask your questions"
          onChange={(e) => setValue(e.target.value)}
        />
        <Select onChange={(e) => console.log(e)} isMulti options={tags} />
      </div>
    )
  );
}

export default AskComponent;
