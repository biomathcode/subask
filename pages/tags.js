import { PlusIcon } from "@radix-ui/react-icons";
import { styled } from "@stitches/react";
import Head from "next/head";
import { useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import axiosInstance from "../components/axios";

const Input = styled("input", {
  fontSize: "18px",
  border: "2px solid #eee",
  height: "40px",
  width: "200px",
  padding: "5px 10px",
  borderRadius: "5px",
});

function CreateTag() {
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const handleTags = async () => {
    setLoading(true);
    if (input !== "") {
      const response = await axiosInstance.post("/api/tags", {
        name: input,
      });
      if (response) {
        alert(`input by the name ${response.data?.data.name} is created `);
        console.log(response);

        setInput("");
        setLoading(false);
      } else {
        setLoading(false);
        alert("Something went wrong!!! ");
      }
    } else {
      setLoading(false);

      alert("Input can not be empty...");
    }
  };
  return (
    <div className="container flex jc ">
      <div className="main ">
        <Head>
          <title>Create Tags </title>
        </Head>
        <div className="flex column center">
          <label>Tag value</label>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="tag value"
          />
          <button
            onClick={() => handleTags()}
            className="btn round flex center"
          >
            {loading ? <LoaderIcon /> : <PlusIcon />}
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateTag;
