import Head from "next/head";

import styles from "../styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import Gist from "react-gist";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  const [lib, setLib] = useState();

  console.log(lib);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3 className={styles.title}>Linode hackathon boilerplate</h3>

        {session ? (
          <>
            <p>
              Signed in as {session.user.email} <br />
              {/* <Gist id="5995ea726914f280afb3" file="Chef-Dockerfile" />, */}
            </p>
            <img
              width="50px"
              height="50px"
              src={session.user.image}
              alt="profile pic"
            />
            <button onClick={() => signOut()}>Sign out</button>
            <Link href="/ask">
              <p>Ask</p>
            </Link>
          </>
        ) : (
          <>
            <p>
              Not signed in <br />
            </p>
            {/* <Gist id="5995ea726914f280afb3" />, */}
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
      </main>
    </div>
  );
}
