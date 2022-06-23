import { styled } from "@stitches/react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

const Container = styled("nav", {
  display: "flex",
  fontFamily: "sans-serif",
  flexDirection: "row",
  borderBottom: "1px solid #eee",
  justifyContent: "space-around",
  alignItems: "center",
  alignContent: "center",
  height: "50px",
  maxWidth: "100vw",
});

const Item = styled("div", {
  fontWeight: "bold",
  color: "#040404",
  cursor: "pointer",
});

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <Container>
      <Link href="/">
        <Item>subask.in</Item>
      </Link>
      {session ? (
        <div className="flex center ">
          <img
            width="40px"
            height="40px"
            style={{ borderRadius: "50%" }}
            src={session.user.image}
            alt={session.user.email}
          />
          <p>{session.user.name}</p>
        </div>
      ) : (
        <Item onClick={() => signIn("github")}>Login </Item>
      )}
    </Container>
  );
};

export default Navbar;
