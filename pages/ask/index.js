import Head from "next/head";
import AskComponent from "../../components/Forms/Ask";

function Ask() {
  return (
    <div className="container flex jc">
      <Head>
        <title>Ask questions</title>
      </Head>
      <main className="main  center">
        <AskComponent />
      </main>
    </div>
  );
}

export default Ask;
