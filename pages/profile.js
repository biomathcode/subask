import { useSession, signIn, signOut } from "next-auth/react";
function Profile() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="container">
        <div className="main">
          <p>
            Signed in as {session.user.email} <br />
          </p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="main">
        <p>
          Not signed in <br />
        </p>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    </div>
  );
}

export default Profile;
