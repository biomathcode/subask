import axios from "axios";
import Gist from "react-gist";

function AskWithId({ data }) {
  return (
    <div className="container  flex jc ">
      <div className="main jc flux  ">
        <div className="flex column">
          <h1>{data?.content}</h1>
          <p>posted by {data?.author?.name}</p>

          <div>
            {data?.answers?.map((ans) => {
              return (
                <Gist key={ans.gistId} id={ans.gistId} file={ans.gistFile} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AskWithId;

export async function getServerSideProps({ req, res, query }) {
  const { askid } = query;

  const response = await fetch(`https:subask.in/api/ask/${askid}`);

  const jsonData = await response?.json();

  return { props: jsonData };
}
