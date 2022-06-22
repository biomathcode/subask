import { useEffect, useState } from "react";
import axios from "axios";

function Ask() {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/api/ask/123");

      setData(result.data.data);
    };

    fetchData();
  }, []);
  return <div>{data}</div>;
}

export default Ask;
