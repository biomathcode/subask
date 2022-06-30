import { useEffect, useState } from "react";

import Select from "react-select";
import { useSession, signIn } from "next-auth/react";
import axiosInstance from "../axios";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

function AskComponent() {
  const [value, setValue] = useState("");

  const [tags, setTags] = useState();

  const [select, setSelect] = useState();

  const { data: session } = useSession();

  useEffect(() => {
    const fetchTags = async () => {
      const result = await axiosInstance.get("/api/tags");

      const newData = await result.data.data.map((el) => {
        return {
          value: String(el.id),
          label: el.name,
        };
      });

      setTags(newData);
    };

    fetchTags();
  }, []);

  const handleAsk = async () => {
    if (value === "") {
      return alert("input is empty...");
    }

    if (select === null || select === undefined || select === []) {
      return alert("Please choose a Tag ");
    }

    console.log(select);

    console.log(value);

    const askResponse = await axiosInstance.post("/api/ask", {
      content: value,
      email: session.user.email,
      tags: {
        id: Number(select.value),
      },
    });

    if (askResponse) {
      alert("Successfully submitted your Ask.");
      setValue("");
      setSelect("");
    }
  };

  return (
    <div className="flex jc column center main">
      {session ? (
        <>
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
                minWidth: "250px",

                width: "70vw",
                maxWidth: "650px",
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
                  onChange={(v) => setSelect(v)}
                  options={tags}
                />
              </div>

              <div className="flex jc center mt-10">
                <button
                  onClick={() => handleAsk()}
                  className="btn round"
                  style={{
                    minWidth: "100px",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  Ask
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <button
          onClick={() => signIn("github")}
          className="btn round"
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "space-between",
            width: "150px",
            // fontSize: "16px",
          }}
        >
          <GitHubLogoIcon />
          Login with github
        </button>
      )}
    </div>
  );
}

export default AskComponent;
