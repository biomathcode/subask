import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
function Profile() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="container flex jc ">
        <div className="main ">
          <div className="flex column center">
            <p>
              Signed in as {session.user.email} <br />
            </p>
            <button className="btn round" onClick={() => signOut()}>
              Sign out
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container flex jc ">
      <div className="main">
        <div className="flex column center">
          <p>
            Not signed in <br />
          </p>
          <button className="btn round  center" onClick={() => signIn()}>
            <div>
              <GitHubLogoIcon />
            </div>
            <p>Sign in with github</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
